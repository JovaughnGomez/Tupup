"use server"
import prisma from '@/server/prisma';
import { CreateCookie, CreateSession, GetSessionFromCookies } from './session';
import { AddUserToMap, GetUserFromMap } from '../services/userCache';
import { GenerateUUID } from './utils';

const aliasDomains = {
    gmail: ['gmail.com'],                 // Plus addressing
    yahoo: ['yahoo.com', 'ymail.com'],    // Disposable emails
    outlook: ['outlook.com', 'hotmail.com', 'live.com', 'msn.com'], // Traditional aliases
    icloud: ['icloud.com', 'me.com', 'mac.com'], // Alias system
    zoho: ['zoho.com']                    // Plus addressing
};

export async function IsAliasEmail(email) {
    const [localPart, domain] = email.split('@');
    const cleanDomain = domain.toLowerCase();
    let cleanLocalPart = email;
    let returnObject = {};

    // Check for Gmail/Zohomail-style plus addressing
    if (aliasDomains.gmail.includes(cleanDomain) || aliasDomains.zoho.includes(cleanDomain)) {
        returnObject.isAuthorizedProvider = true;
        if(localPart.includes('+'))
            cleanLocalPart = localPart.split('+')[0] + "@" + cleanDomain;
    }
    
    // Check for Yahoo disposable email addresses
    if (aliasDomains.yahoo.includes(cleanDomain)) {
        returnObject.isAuthorizedProvider = true;
        // Yahoo addresses like `base-address-keyword@yahoo.com`
        if (localPart.includes('-'))
            cleanLocalPart = localPart.split('-')[0] + '@' + cleanDomain;
    }
    
    // Outlook, iCloud aliases (assume these emails are managed by user settings)
    if (aliasDomains.outlook.includes(cleanDomain) || aliasDomains.icloud.includes(cleanDomain)) {
        returnObject.isAuthorizedProvider = true;
        const allowTheseEmails = process.env.ALLOW_TRICKY_EMAILS === "true";    
        if(allowTheseEmails)       
            cleanLocalPart = email;
    }
    
    returnObject.baseEmail = cleanLocalPart;
    return returnObject;  // No alias detected
}

export async function GetUsernameFromGmail(email)
{
    return email.split('@')[0];
}

export async function CheckIfBaseEmailExist(baseEmail)
{
    try {
        const user = await prisma.user.findUnique({
            where: {
                baseEmail
            }
        })

        console.log("Returning User");
        return user;
    } catch (error) {
        return null;
    }
}



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

export async function AuthenticateUser(user)
{
    try {
        const sessionId = await GenerateUUID();
        AddUserToMap(user);
        const session = await CreateSession(sessionId, user.id);
        await CreateCookie(session);
        return true;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function GetCurrentUserFromMap() {
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

