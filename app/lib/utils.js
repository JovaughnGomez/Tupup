'use server'
import { cookies } from "next/headers";
import { v4 as uuidv4 } from 'uuid';
import SessionData from "./session";
import { add, get, redisDelete } from "@/app/lib/db"

export async function GenerateUUID()
{   
    return uuidv4();
}

export async function GenerateHash(password)
{
    return await bcrypt.hash(password, 12);
}

export async function CreateCookie(session)
{
    const cookie = cookies();
    cookie.set(`${process.env.AUTH_COOKIE_NAME}`, session.sessionId, {
        maxAge: 60*60*24*365,
        secure: process.env.NODE_ENV === "production",
    });
}

export async function DeleteCookie(cookieName)
{
    const cookieStore = cookies();
    if(cookieStore.has(cookieName))
        cookieStore.delete(cookieName);
}

export async function GetSessionOptions()
{
    const sessionOptions = {
        ttl:60 * 60 * 24,
        cookieOptions: {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        }
    }
    return sessionOptions;
} 

export async function CreateSession(user, sessionId)
{
    const session = new SessionData(sessionId, user);
    add(session.sessionId, JSON.stringify(session));
    return session;
}

export async function DeleteSession()
{
    try {
        const sessionId = await RetrieveSessionId();
        redisDelete(sessionId);
    } catch (error) {
        console.log(error);
    }
}

export async function GetSessionFromCookies() 
{ 
    const cookieStore = cookies();
    try {
        if(!cookieStore.has(process.env.AUTH_COOKIE_NAME))
            return;
        
        let sessionId = cookieStore.get(process.env.AUTH_COOKIE_NAME).value;
        let session = await get(sessionId);
        session = await JSON.parse(session);
        return session;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function DeleteSessionWithId(sessionId)
{
    try {
        redisDelete(sessionId);
    } catch (error) {
        console.log(error);
    }
}

export async function RetrieveSessionId()
{
    const cookieStore = cookies();
    if(!cookieStore.has(process.env.AUTH_COOKIE_NAME))
        return null;

    return cookieStore.get(process.env.AUTH_COOKIE_NAME).value;
}

export async function GetSession(sessionId) 
{ 
    try {
        let session = await get(sessionId);
        session = await JSON.parse(session);
        return session;
    } catch (error) {
        console.log(error);
        return null;
    }
}   
