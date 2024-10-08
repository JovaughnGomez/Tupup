
"use server"
import { GetAdminTransactionsDTO } from "@/data/transaction-dto";
import prisma from "@/server/prisma";

export async function CreateTransaction(method, value, notes, userId)
{  
    if(!method || !notes || !userId)
        throw new Error("Missing required fields");

    try {
        const transaction = await prisma.transaction.create({
            data: {
                method,
                value,
                notes,
                userId
            }
        })
        
        return {success: true, transaction};
    } catch (error) {
        console.error("Error creating transaction:", error);
        return { success: false, message: "Failed to create transaction", error };
    }
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

        return {success: true, transactions};
    } catch (error) {
        console.log(error);
        return {success: false, message: "Unexpected Error", error};
    }
}

export async function AdminGetPendingTransactions()
{
    try {
        const transactions = await prisma.transaction.findMany({
            where: {
                status:"waiting"
            },
            orderBy: {
                dateCreated: 'asc'
            },
            take: 10,
        });

        const transactionObjects = await GetAdminTransactionsDTO(transactions);
        return {success: true, transactionObjects}
    } catch (error) {
        console.error(error);
        return { success: false, message:"Unexpected error" };
    }
}

export async function GetAllPendingTransactionsFromUser(userId)
{
    try {
        const transactions = await prisma.transaction.findMany({
            where: {
                status:"waiting",
                userId
            },
            orderBy: {
                dateCreated: 'desc'
            },
            take: 10,
        });

        return { success: true, transactions};
    } catch (error) {
        return { success: false, message:"Unexpected error" };
    }
}

export async function ProcessWalletTopUp(transactionId, addedBalance, adminNotes, status, dateCompleted)
{
    try {
        const results = await prisma.$transaction(async (prisma) => {
            const transaction = await prisma.transaction.findUnique({
                where: { id: transactionId }
            });
            
            const user = await prisma.user.findUnique({
                where: { id: transaction.userId }
            });

            if(!user)
                return {success: false, message: `User${transaction.userId} does not exist`};

            const currentBalance = parseFloat(user.wallet);
            const newBalance = currentBalance + addedBalance;

            const updatedTransaction = await prisma.transaction.update({
                where: {
                    id: transactionId
                }, 
                data: {
                    value: addedBalance,
                    adminNotes,
                    status,
                    dateCompleted,
                    balanceBefore: currentBalance,
                    balanceAfter: newBalance,
                }
            });

            const updatedUser = await prisma.user.update({
                where: {
                    id: updatedTransaction.userId,
                },
                data: {
                    wallet: newBalance,
                }
            });

            return updatedTransaction;
        });

        return { success: true, transaction: results }
    } catch (error) {
        console.log(error);
        return {success: false, message: "Unexpected Error"};
    }
}