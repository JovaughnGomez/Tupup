
"use server"
import { GetAdminTransactionsDTO } from "@/data/transaction-dto";
import prisma from "@/server/prisma";
import { CalculateFinalPrice } from "../lib/clientUtils";
import { FindCurrentUserInDatabase } from "./userController";
import { UpdateWalletInDatabaseAsTransaction } from "./walletController";
import { AppError } from "../lib/AppError";
import { DeliverProductInTransaction } from "../services/deliveryService";


const TransactionStatus = {
    WAITING: 'waiting',
    PROCESSING: 'processing',
    Completed: 'completed',
    CANCELLED: 'cancelled',
    FAILED: 'failed',
    REFUNDED: 'refunded'
}

export async function CreateWalletTransaction(method, value, notes, userId)
{  
    if(!method || !notes || !userId)
        throw new Error("Missing required fields");

    try {
        const transaction = await prisma.transaction.create({
            data: {
                method,
                value,
                notes,
                userId,
                status:"processing",
                transactionType: "wallet_topup"
            }
        })
        
        return { success: true, transaction};
    } catch (error) {
        console.log(error);
        return { success: false, message: error.simpleMessage || "Unexpected Error", error: error, status: error.status || 500 };
    }
}

// Responsible for creating transactions and validating orders.
export async function CreateProductTransaction(orderIds, userId)
{  
    if(orderIds.length < 1)
        return { success: false, message: "This order does not exist.", status: 400 };
    
    let orders = [];
    let totalPrice = 0;

    try {
        const results = await prisma.$transaction(async (prisma) => {
            
            // Check that orders exist, are owned by a transaction and the user accessing them is correct.
            // Calculate total price for all orders.
            for (let index = 0; index < orderIds.length; index++) {
                const order = await prisma.order.findUnique({
                    where: {
                        id: orderIds[index].id,
                    },
                    include: {
                        product: {
                            select: {
                                price: true,
                                salePrice: true,
                                onSale: true,
                            }
                        }
                    }
                });
                    
                if(!order)
                    throw new AppError("This order does not exist.", 400);
                
                if(order.transactionId)
                    throw new AppError("Order has already been completed.", 400);
                
                if(order.userId != userId)
                    throw new AppError("You are not authorized to perform this transaction.", 401);
                
                totalPrice = CalculateFinalPrice(order.product, order.quantity);
                orders.push(order);
            }

            // Create transaction
            const transaction = await prisma.transaction.create({
                data: {
                    userId,
                    method: "wallet",
                    value: totalPrice,
                    transactionType: "product_purchase",
                }
            });

            // Assign the newly created transaction to orders.
            for (let index = 0; index < orderIds.length; index++) {
                const orderId = orderIds[index].id;
                await prisma.order.update({
                    where: {
                        id: orderId,
                    }, 
                    data: {
                        transactionId: transaction.id
                    }
                });
            }

            return transaction;
        });

        return { success: true, transaction: results };
    } catch (error) {
        console.error("Error creating transaction:", error);
        return { success: false, message: error.simpleMessage || "Unexpected Error", error: error, status: error.status || 500 };
    }

}

// Deducts money from user's wallet and "completes" the transaction
export async function ProcessProductTransaction(transactionId)
{
    // Balance check
    // Make sure they have enough funds
    // Deduct total cost of transaction
    // Change the status of the transaction from pending to processing
    // Log data
    // Deliver product
    try {
        const updatedTransaction = await prisma.$transaction(async (prisma) => {
            const userResults = await FindCurrentUserInDatabase();
            if(!userResults.success)
                throw new AppError(userResults.message, userResults.status);
            
            const currentUser = userResults.user;
            
            const transactionResults = await FindTransactionByIdPrismaTransaction(transactionId, currentUser.id, prisma);
            if(!transactionResults.success)
                throw new AppError(transactionResults.message, transactionResults.status);
            
            const transaction = transactionResults.transaction;
            const productCost = parseFloat(transaction.value);
            const userBalance = parseFloat(currentUser.wallet);
            if(productCost > userBalance)
                throw new AppError("Your wallet does not have enough funds to complete the transaction.", 402);
            
            const newBalance = userBalance - productCost;
            const updateResults = await UpdateWalletInDatabaseAsTransaction(currentUser.id, newBalance, prisma);
            
            if(!updateResults.success)
                throw new AppError(updateResults.message, updateResults.status);
            
            const updatedTransactionResults = await CompleteTransaction(transaction.id, "completed", userBalance, newBalance, prisma);
            if(!updatedTransactionResults.success)
                throw new AppError(updatedTransactionResults.message, updatedTransactionResults.status);
            
            const deliveryResults = await DeliverProductInTransaction(transaction, prisma);
            if(!deliveryResults.success)
                throw new AppError(deliveryResults.message, deliveryResults.status);

            return updatedTransactionResults.updatedTransaction;
        });

        return { success: true, transaction: updatedTransaction }
    } catch (error) {
        console.error(error);
        return { success: false, message: error.simpleMessage || "Unexpected Error", error: error, status: error.status || 500 };
    }        
}

export async function AdminFindTransactionOfUser(id, userId, session)
{
    if(!id)    
        return { success: false, message: "Transaction does not exist", status: 400 };
    
    try {
        const transaction = await prisma.transaction.findUnique({
            where: { id },
            include: {
                orders: true,
            }
        });
        
        if(!transaction)
            return { success: false, message: `There are no transactions with the id of ${id}.`, status: 400 }
        
        if(!transaction.userId !== userId)
            return { success: false, message: `This user does not own this transaction.`, status: 400 }
            
        console.log(2);
        return { success: true, transaction };
    } catch (error) {
        console.error(error);
        return { success: false, message: error.simpleMessage || "Unexpected Error", error: error, status: error.status || 500 };
    }
}

async function FindTransactionByIdFromUser(id, userId, prismaClient)
{
    if(!id)
        return { success: false, message: "Transaction does not exist", status: 400 };

    try {
        const transaction = await prismaClient.transaction.findUnique({
            where: {
                id,
            }
        });

        if(!transaction)
            throw new AppError("Transaction was not found.", 400);
        
        if(transaction.status !== "waiting")
            throw new AppError("Forbidden", 403);
            
        if(transaction.userId !== userId)
            throw new AppError("Transaction not owned by user.", 400);
            
        const results = await IsTransactionExpired(transaction);
        if(results.isExpired)
            throw new AppError("Transaction is expired.", 410);

        return { success: true, transaction, expiration: results.expirationTime };
    } catch (error) {
        console.log(error);
        return { success: false, message: error.simpleMessage || "Unexpected Error", error: error, status: error.status || 500 };
    } 
}

export async function FindTransactionById(id, userId)
{
    return await FindTransactionByIdFromUser(id, userId, prisma);
}

export async function FindTransactionByIdPrismaTransaction(id, userId, prismaClient)
{
    if(!prismaClient)
        return { success: false, message: "Unexpected Error", error: "Prisma client not found", status: 500 };

    return await FindTransactionByIdFromUser(id, userId, prismaClient);
}

export async function IsTransactionExpired(transaction)
{
    const expirationPeriod = 3600000;
    const expirationTime = transaction.createdAt.getTime() + expirationPeriod;
    const currentTime = Date.now();
    const isExpired = expirationTime <= currentTime;
    return { expirationTime: expirationTime, isExpired }
}

export async function GetTransactionHistory(userId)
{
    try {
        let transactions = await prisma.transaction.findMany({
            where: {
                userId: userId,
                status: "completed",
            },
            take: 10
        });

        return { success: true, transactions};
    } catch (error) {
        console.log(error);
        return { success: false, message: error.simpleMessage || "Unexpected Error", error: error, status: error.status || 500 };
    }
}

export async function GetTransactionForPaymentPage()
{

}

export async function AdminGetPendingTransactions()
{
    try {
        const transactions = await prisma.transaction.findMany({
            where: {
                status:"processing"
            },
            orderBy: {
                createdAt: 'asc'
            },
            take: 10,
        });

        const transactionObjects = await GetAdminTransactionsDTO(transactions);
        return { success: true, transactionObjects}
    } catch (error) {
        console.error(error);
        return { success: false, message: error.simpleMessage || "Unexpected Error", error: error, status: error.status || 500 };
    }
}

export async function GetAllPendingTransactionsFromUser(userId)
{
    try {
        const transactions = await prisma.transaction.findMany({
            where: {
                status:"processing",
                userId,
                transactionType: "wallet_topup",
            },
            orderBy: {
                createdAt: 'desc'
            },
            take: 10,
        });

        return { success: true, transactions};
    } catch (error) {
        return { success: false, message: error.simpleMessage || "Unexpected Error", error: error, status: error.status || 500 };
    }
}

export async function ProcessWalletTopUp(transactionId, topupValue, adminNotes, status, completedAt)
{
    try {
        if(isNaN(topupValue))
            throw new AppError(`The top-up value of ${topupValue} is not a number.`, 400);

        const results = await prisma.$transaction(async (prisma) => {
            const transaction = await prisma.transaction.findUnique({
                where: { id: transactionId }
            });

            const user = await prisma.user.findUnique({
                where: { id: transaction.userId }
            });

            if(!user)
                throw new AppError(`User${transaction.userId} does not exist.`, 400);
            
            const currentBalance = parseFloat(user.wallet);
            const newBalance = currentBalance + topupValue;

            const updatedTransaction = await prisma.transaction.update({
                where: {
                    id: transactionId
                }, 
                data: {
                    value: topupValue,
                    adminNotes,
                    status,
                    completedAt,
                    balanceBefore: currentBalance,
                    balanceAfter: newBalance,
                }
            });
            
            const walletUpdate = await UpdateWalletInDatabaseAsTransaction(updatedTransaction.userId, newBalance, prisma);
            if(!walletUpdate.success)
                throw new AppError(walletUpdate.message, walletUpdate.status);
            
            return updatedTransaction;
        });

        return { success: true, transaction: results }
    } catch (error) {
        // console.log(error);
        console.log(error.message);
        return { success: false, message: error.simpleMessage || "Unexpected Error", error: error, status: error.status || 500 };
    }
}

export async function CompleteTransaction(transactionId, status, balanceBefore, balanceAfter, prismaClient)
{
    if(!transactionId || !status || !balanceAfter || !balanceBefore)
        return { success: false, message: "One or more fields were invalid.", status: 400 };
    
    try {
        if(!Object.values(TransactionStatus).includes(status))
            throw new AppError("", 400, `${status} is not a valid transaction status.`);

        const updatedTransaction = await prismaClient.transaction.update({
            where: {
                id: transactionId,
            },
            data: {
                status,
                completedAt: new Date(Date.now()),
                balanceBefore,
                balanceAfter,
            }
        });

        return { success: true, updatedTransaction };
    } catch (error) {
        console.error(error);
        return { success: false, message: error.simpleMessage || "Unexpected Error", error: error, status: error.status || 500 };
    }
}