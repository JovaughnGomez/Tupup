"use server"
import { AppError } from "../lib/AppError";

async function UpdateWalletInDatabase(userId, newBalance, prismaClient)
{
    try {
        if(!prismaClient)
            throw new AppError("Unexpected Error", 500, "Prisma client is not included");
        
        const updatedUser = await prismaClient.user.update({
            where: {
                id: userId,
            },
            data: {
                wallet: newBalance,
            }
        });

        return { success: true, updatedUser};
    } catch (error) {
        return { success: false, message: error.message || "Unexpected Error", error: error.error, status: error.status || 500 };
    }
}

export async function UpdateWalletInDatabaseNonTransaction(userId, newBalance)
{
    return UpdateWalletInDatabase(userId, newBalance, prisma);
}

export async function UpdateWalletInDatabaseAsTransaction(userId, newBalance, prismaClient)
{
    if(!prismaClient)
        return { success: false, message: "Unexpected Error", error: "Prisma client is invalid", status:500 }
    
    return UpdateWalletInDatabase(userId, newBalance, prismaClient);
}