"use server"

import { redirect } from 'next/navigation';
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

export async function SendContactMessage()
{

}