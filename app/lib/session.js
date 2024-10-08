"use server"
import { cookies } from "next/headers";
import { add, get, redisDelete } from "@/app/lib/db"
import { GenerateCSRFToken, GenerateUUID } from "./utils";

class Session {
    constructor(sessionId, userId, csrfToken)
    {
        this.sessionId = sessionId ? sessionId : GenerateUUID();
        this.userId = userId;
        this.csrfToken = csrfToken;
    }
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

export async function RetrieveSessionId()
{
    const cookieStore = cookies();
    if(!cookieStore.has(process.env.AUTH_COOKIE_NAME))
        return null;

    return cookieStore.get(process.env.AUTH_COOKIE_NAME).value;
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

export async function CreateSession(sessionId, userId)
{
    const csrfToken = GenerateCSRFToken();
    const session = new Session(sessionId, userId, csrfToken);
    add(session.sessionId, JSON.stringify(session));
    return session;
}

export async function GetSession(sessionId) 
{ 
    let session = await get(sessionId);
    if(!session)
        return null;
    
    session = await JSON.parse(session);
    if(!session)
        return null;

    return new Session(session.sessionId, session.userId, session.csrfToken);
}   

export async function GetSessionFromCookies() 
{ 
    const cookieStore = cookies();
    try {
        if(!cookieStore.has(process.env.AUTH_COOKIE_NAME))
            return;
        
        let sessionId = cookieStore.get(process.env.AUTH_COOKIE_NAME).value;
        let session = await GetSession(sessionId);
        return session;
    } catch (error) {
        console.log(error);
        return null;
    }
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

export async function DeleteSessionWithId(sessionId)
{
    try {
        redisDelete(sessionId);
    } catch (error) {
        console.log(error);
    }
}

export async function ValidateCSRFToken(session, token)
{
    if(!token)
    {
        console.log("Token field is empty");
        return false;
    }
        
    if(!session.csrfToken)
    {
        console.log("This session does not have a csrfToken");
        return false;
    } 

    const isValid = token == session.csrfToken ? true : false;
    return isValid;
}