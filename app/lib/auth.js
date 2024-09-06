"use server"
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import prisma from '@/server/prisma';

export async function GenerateUUID()
{   
    return uuidv4();
}

export async function GenerateHash(password)
{
    return await bcrypt.hash(password, 12);
}

export async function ComparePassword(password, hashedPassword)
{
    return await bcrypt.compare(password, hashedPassword);
}

export async function CheckIfUserExist(email, username)
{
    try {
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { email },
                    { username},
                ]
            }
        })

        return user;
    } catch (error) {
        console.log(error);
        return null;
    }
}