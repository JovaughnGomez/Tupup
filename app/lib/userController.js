"use server"
import prisma from "@/server/prisma";

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

export async function UpdateUserSessionId(id, sessionId)
{
    try {
        const updatedUser = await prisma.user.update({
            where: {
                id
            },
            data: {
                sessionId: sessionId
            }
        })

        return true;
        
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function IsUserAnAdmin(session)
{
    try {
        const user = await prisma.user.findFirst({
            where: {
                id: session.userId
            }
        })

        return user.isAdmin;
    } catch (error) {
        console.log(error);
        return false;
    }
}
