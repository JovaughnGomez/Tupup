"use server"
import prisma from '@/server/prisma';
import { GetSession, GetSessionFromCookies } from './session';

class User {
    constructor(session)
    {

    }
}

export async function CheckIfUserExist(email, username)
{
    const user = await prisma.user.findFirst({
        where: {
            OR: [
                { email },
                { username},
            ]
        }
    })

    return user;
}

export async function GetCurrentUser() {
    const session = await GetSessionFromCookies();
    
    try {
        return new User(session);
    } catch (error) {
        console.log(`Failed to find the current user.${error}`);
        return null;    
    }
};