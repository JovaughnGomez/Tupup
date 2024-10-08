"use server"
import prisma from '@/server/prisma';
import { GetSessionFromCookies } from './session';
import { GetUserFromMap } from '../services/userCache';

export async function CheckIfUserExist(email, username)
{
    const user = await prisma.user.findFirst({
        where: {
            OR: [
                { email },
                { username},
            ],
            AND: [
                {isActive: true}
            ]
        }
    })

    return user;
}

export async function GetCurrentUser() {
    try {
        const session = await GetSessionFromCookies();
        const user = GetUserFromMap(session.userId);
        return user;
    } catch (error) {
        console.log(`Failed to find the current user.${error}`);
        return null;    
    }
};

export async function GetUserFromId(userId) {
    try {
        const user = GetUserFromMap(userId);
        return user;
    } catch (error) {
        console.log(`Failed to find the current user.${error}`);
        return null;    
    }
};