"use server"
import prisma from "@/server/prisma";

export async function IsUserOrAdmin(viewer, user)
{
    return viewer === user || viewer.isAdmin;
}

export async function CreateUser()
{
    try {
        const user = await prisma.user.create({
            data: {
                username,
                email,
                password,
                sessionId,
            }
        })

        return user;
    } catch (error) {
        console.log(error);
        return null;
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
        
        return { success: true, isAdmin: user.isAdmin }
    } catch (error) {
        console.log(`Unexpected Error..Re: IsUserAnAdmin`);
        return { success: false, message: "Unexpected Error." }
    }
}
