"use server"

import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { DeleteSession, DeleteCookie } from './utils';

export async function GenerateUUID()
{   
    return uuidv4();
}

export async function GenerateHash(password)
{
    return await bcrypt.hash(password, 12);
}

export async function Redirect(link)
{
    redirect(link);
}

export async function Logout()
{
    await DeleteSession();
    await DeleteCookie(process.env.AUTH_COOKIE_NAME);
}