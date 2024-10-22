"use server"

import { AddOrderToQueue } from "@/processTopup";
import { AppError } from "../lib/AppError";
import { MarkOrdersAsCompleted } from "../controllers/orderController";

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
                info: true,
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
            throw new AppError("Orders no longer exist");

        for (const order of orders) {
            const productType = order.product.productCategory.type;
            // Make sure each item is queued.
            if(productType === "giftcard") 
                {
                    await DeliverGiftcard(order, transaction, prismaClient);
                    const completeOrdersTask = await MarkOrdersAsCompleted(orders, prismaClient);
                    if(!completeOrdersTask.success)
                        return completeOrdersTask;
                } else {
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
    const name = order.product.productCategory.name;
    const usdPrice = order.product.usdPrice;

    const giftcards = await prismaClient.giftcard.findMany({
        where: {
            name,
            isDelivered: false,
            denomination: usdPrice,
        }, 
        take: order.quantity,
    });

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
}

export async function DeliverGameTopup(order, categoryName)
{
    order.topupName = categoryName;
    const jobResults = await AddOrderToQueue(order);
}