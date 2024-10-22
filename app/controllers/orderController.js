import { AppError } from "../lib/AppError";
import { GetSessionFromCookies } from "../lib/session";
import { FindActiveProductById } from "./productController";

export async function CreateOrder(productId, quantity, userId)
{
    if(!productId || !quantity || !userId)
        return { success: false, message: `Some fields were empty`, status: 401};
    
    quantity = parseInt(quantity);
    if(!Number.isFinite(quantity) || quantity < 1 || quantity > 10)
        return { success: false, message: `You can only order between 1 and 10 of an item.`, status: 401};

    try {
        const productResults = await FindActiveProductById(productId);
        if(!productResults.success)
            return { success: false, message: productResults.message, status: productResults.status };

        const order = await prisma.order.create({
            data: {
                productId,
                quantity,
                userId,
            }
        });

        return { success: true, order }
    } catch (error) {

        console.error(error);
        return { success: false, message: error.simpleMessage || "Unexpected Error", error: error, status: error.status || 500 };
    }
}

export async function FindCheckoutOrder(id, userId)
{
    if(!id)
        throw new AppError("Order ID is invalid");
    
    if(!userId )
        throw new AppError("Order ID is invalid");
    
    try {
        const order = await prisma.order.findFirst({
            where: {
                id,
                userId,
            },
            include: {
                product: {
                    select: {
                        id: true,
                        icon: true,
                        name: true,
                        price: true,
                        salePrice: true,
                        onSale: true,
                        isActive: true,
                        productCategory: {select: { name: true, displayName: true } },
                    }
                }
            }
        });

        if(order.userId !== userId)
            throw new AppError("You do not own this order", 400);

        if(order.transactionId)
            throw new AppError("Order already belongs to a transaction.", 400);
        
        if(!order)
            throw new AppError(`Order was not found.`, 400);
        
        if(!order.product.isActive)
            throw new AppError(`This product is no longer available.`, 400);
        
        return { success: true, order };
    } catch (error) {
        console.error(error);
        return { success: false, message: error.simpleMessage || "Unexpected Error", error: error, status: error.status || 500 };
    }
}

export async function GetOrderHistory(status)
{
    const session = await GetSessionFromCookies();
    try {
        let transactions = await prisma.transaction.findMany({
            where: {
                userId: session.userId,
                transactionType: "product_purchase",
            },
            select: {
                id: true,
                status: true,
                notes: true,
                createdAt: true,
                value: true,
                orders: {
                    select: {
                        id: true,
                        quantity: true,
                        product: {
                            select: {
                                name: true,
                                icon: true,
                                price: true,
                                productCategory: {
                                    select: {
                                        name: true,
                                    }
                                }
                            }
                        }
                    }
                }
            },
        });
        
        return { success: true, transactions};
    } catch (error) {
        console.log(error);
        return { success: false, message: "Unexpected Error", error};
    }    
}

export async function MarkOrdersAsCompleted(orders, prismaClient)
{
    orders.forEach(async (order) => await MarkSingleOrderAsCompleted(order, prismaClient));
}

export async function MarkSingleOrderAsCompleted(order, prismaClient)
{
    try {
        // Mark orders as completed.
        const updatedOrder = await prismaClient.order.update({
            where: {
                id: order.id,
            },
            data: {
                status: "completed",
                completedAt: new Date(Date.now()),
            }
        });
    } catch (error) {
        console.log(error);
        return { success: false, message: error.simpleMessage || "Unexpected Error", error: error, status: error.status || 500 };
    }
}

export async function CheckIfOrderWasCompleted(orderId)
{
    try {
        const order = await prisma.order.findUnique({
            where: {
                id: orderId,
            }
        });

        if(!order)
            throw new AppError("Order does not exist.", 400);

        if(order.status == "completed")
            throw new AppError("Order has already been completed", 400);

        return { success: true, order }
    } catch (error) {
        console.error(error);
        return { success: false, message: error.simpleMessage || "Unexpected Error", error: error, status: error.status || 500 };
    }


}
