"use server"

import { AddOrderToQueue } from "@/processTopup";
import { AppError } from "../lib/AppError";
import { MarkSingleOrderAsCompleted, MarkSingleOrderAsProcessing } from "../controllers/orderController";

export async function DeliverProductInTransaction(transaction, prismaClient)
{
    try {
        // Find orders belonging to transaction
        const orders = await prismaClient.order.findMany({
            where: {
                transactionId: transaction.id,
            }, 
            select: {
                quantity: true,
                notes: true,
                id: true,
                product: {
                    select: {
                        usdValue: true,
                        name: true,
                        salePrice: true,
                        price: true,
                        productCategory: {
                            select: {
                                name: true,
                                type: true,
                            }
                        }
                    }
                }
            }
        })

        if(orders.length == 0)
            throw new AppError("", 500, `There are no orders for Transaction:${transaction.id}`);

        for (const order of orders) 
        {
            const productType = order.product.productCategory.type;
            if(productType === "giftcard") 
            {
                const orderResults = await MarkSingleOrderAsCompleted(order, prismaClient) // Only completing orders on gift cards.
                if(!orderResults.success)
                {
                    console.log(`Failed to complete order for Transaction:${transaction.id}`);
                    continue;
                }
                
                const deliveryResults = await DeliverGiftcard(order, transaction, prismaClient);
            } else {
                const orderResults = await MarkSingleOrderAsProcessing(order);
                const categoryName = order.product.productCategory.name;
                await DeliverGameTopup(order, categoryName);
            }
        }

        return { success: true }
    } catch (error) {
        console.log(error);
        return { success: false, message: error.simpleMessage || "Unexpected Error", error: error, status: error.status || 500 };
    }
}

async function DeliverGiftcard(order, transaction, prismaClient)
{
    try {
        const name = order.product.productCategory.name;
        const usdPrice = order.product.usdPrice;
    
        // Find giftcards that match denomination, undelivered
        const giftcards = await prismaClient.giftcard.findMany({
            where: {
                name,
                isDelivered: false,
                denomination: usdPrice,
            }, 
            take: order.quantity,
        });
    
        // Attach the giftcard to a User and an Order
        for (const card of giftcards) {
            const updatedCard = await prismaClient.giftcard.update({
                where: {
                    id: card.id,
                },
                data: {
                    user: {
                        connect: { id: transaction.userId }
                    },
                    order: {
                        connect: { id: order.id }
                    },
                    isDelivered: true,
                    deliveredAt: new Date(Date.now()),
                }
            });
        }

        return { success: true }
    } catch (error) {
        console.error(error);
        return { success: false, message: error.simpleMessage || "Unexpected Error", error: error, status: error.status || 500 }; 
    }
}

export async function DeliverGameTopup(order, categoryName)
{
    order.topupName = categoryName;
    const jobResults = await AddOrderToQueue(order);
}