"use server"

import { IsUserOrAdmin } from "@/app/controllers/userController";
import { GetCurrentUser, GetUserFromId } from "@/app/lib/auth";

function CanSeeUsername() {
    return true;
}

async function CanSeeEmail(viewer, user) {
    return await IsUserOrAdmin(viewer, user);
}

async function CanSeeDateJoined(viewer, user) {
    return await IsUserOrAdmin(viewer, user);
}
   
async function CanSeePhoneNumber(viewer, user) {
    return await IsUserOrAdmin(viewer, user);
}

async function CanSeeWalletValue(viewer, user) {
    return await IsUserOrAdmin(viewer, user);
}

export async function GetNavDTO() {
    const currentUser = await GetCurrentUser();
    if(!currentUser)
        return null;

    return {
        username: currentUser.username,
        email: currentUser.email,
        isAdmin: currentUser.isAdmin,
    }
}

export async function GetWalletDTO(viewer, userId) {
    if(!viewer || !userId)
        return null;

    const userData = await GetUserFromId(userId);
    if(!userData)
        return null;

    return {
        wallet: await CanSeeWalletValue(viewer, userData) ? userData.wallet : null,
    }
}

export async function GetAccountDTO(viewer, userId)
{
    if(!viewer || !userId)
        return null;

    const userData = await GetUserFromId(userId);
    if(!userData)
        return null;

    return {
        wallet: await CanSeeWalletValue(viewer, userData) ? userData.wallet : null,
        email: await CanSeeEmail(viewer, userData) ? userData.email : null,
        username: CanSeeUsername(viewer, userData) ? userData.username : null,
    } 
}

export async function GetProfileDTO(userId)
{
    const viewer = await GetCurrentUser();
    if(!viewer)
        return null;

    let userData = userId ? await GetUserFromId(userId) : viewer;
    return {
        username: CanSeeUsername(viewer, userData) ? userData.username : null,
        email: await CanSeeEmail(viewer, userData) ? userData.email : null,
        joined: await CanSeeDateJoined(viewer, userData) ? userData.joined : null,
    } 
}