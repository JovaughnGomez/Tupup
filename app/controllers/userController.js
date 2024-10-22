"use server"
import prisma from "@/server/prisma";
import { GetSessionFromCookies } from "../lib/session";
import { AppError } from "../lib/AppError";

export async function IsUserOrAdmin(viewer, user)
{
    return viewer === user || viewer.isAdmin;
}

export async function FindCurrentUserInDatabase()
{
    const session = await GetSessionFromCookies();
    if(!session)
        return { success: false, message: "User does not exist", status: 401 }

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: session.userId
            }
        })

        if(!user)
            throw new AppError("User does not exist.", 401);

        return { success: true, user };
    } catch (error) {
        console.error(error);
        return { success: false, message: error.simpleMessage || "Unexpected Error", error: error, status: error.status || 500 };
    }
}

export async function IsUserAnAdmin(session)
{
    try {
        const user = await prisma.user.findFirst({
            where: {
                id: session.userId,
                isActive: true,
                isAdmin: true
            }
        })
        
        if(!user)
            throw new AppError("User does not exist", 400);
        
        return { success: true, isAdmin: user.isAdmin }
    } catch (error) {
        console.log(`Unexpected Error..Re: IsUserAnAdmin`);
        return { success: false, message: error.simpleMessage || "Unexpected Error", error: error, status: error.status || 500 };
    }
}
