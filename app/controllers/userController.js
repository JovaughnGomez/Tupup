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
            }
        })
        
        if(!user)
            throw new AppError("User does not exist", 400);

        if(!user.isActive)
            throw new AppError("You lack the required permissions to perform this action", 401);

        if(!user.isAdmin)
            throw new AppError("You are not authorized to perform this action", 401);
        
        return { success: true, isAdmin: user.isAdmin }
    } catch (error) {
        console.log(error);
        return { success: false, message: error.simpleMessage || "Unexpected Error", error: error, status: error.status || 500 };
    }
}

export async function FindUserById(id)
{
    try {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        })

        if(!user)
            throw new AppError("User does not exist.", 400, `No users exist with the id ${id}`, 400);

        return { success: true, user }
    } catch (error) {
        console.log(error);
        return { success: false, message: error.simpleMessage || "Unexpected Error", error: error, status: error.status || 500 };
    }
}

export async function FindUserByEmail(email)
{
    try {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if(!user)
            throw new AppError("User does not exist.", 400, `No users exist with the email ${email}`, 400);

        return { success: true, user }
    } catch (error) {
        console.log(error);
        return { success: false, message: error.simpleMessage || "Unexpected Error", error: error, status: error.status || 500 };
    }
}