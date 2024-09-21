"use server"

import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { DeleteSession, DeleteCookie } from './session';

export async function Redirect(link)
{
    redirect(link);
}

export async function Calculate()
{
    console.log("calculating");
}

export async function Logout()
{
    await DeleteSession();
    await DeleteCookie(process.env.AUTH_COOKIE_NAME);
}