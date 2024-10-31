"use server"

import prisma from "@/server/prisma";
import { AppError } from "../lib/AppError"
import { GetSessionFromCookies } from "../lib/session";

export async function AddGiftcards(cards, cardType, denomination)
{
    try {   
        if(!cards)
            throw new AppError("Card List is null.", 400);
        
        if(!denomination)
            throw new AppError("Please select a denomination.", 400);
        
        denomination = parseInt(denomination);
        if(isNaN(denomination))
            throw new AppError("Denomination must be an integer.", 400);

        const prefixResults = await GetCardPrefix(cardType);
        if(!prefixResults.success)
            throw new AppError("A prefix for this card does not exist", 400);
        
        const prefixData = prefixResults.prefix;
        const prefix = prefixData.prefix;
        const codeLength = parseInt(prefixData.codeLength);

        const allCodes = [];
        const rejectedCodes = [];
        for (let index = 0; index < cards.length; index++) {
            const code = cards[index].trim();
            if(!code)
                continue;
            
            if(codeLength != code.length)
            {
                rejectedCodes.push(code);
                continue;
            }

            const editedCode = prefix + code;
            const codeCheck = await prisma.giftcard.findUnique({
                where: {
                    code: editedCode
                }
            })
            
            if(codeCheck)
                rejectedCodes.push(code);
            else
                allCodes.push({ name: cardType, code:editedCode, denomination: denomination })
        }

        await prisma.giftcard.createMany({
            data: allCodes,
            skipDuplicates: true,
        });
        
        return { success: true, rejectedCodes }
    } catch (error) {
        console.log(error);
        return { success: false, message: error.simpleMessage || "Unexpected Error", error: error, status: error.status || 500 };
    }
}

async function GetCardPrefix(cardType)
{
    try {
        if(!cardType)
            throw new AppError("Please select a card type.", 400);
        
        const prefix = await prisma.giftcardPrefix.findUnique({
            where: {
                id: cardType,
            }
        })
        
        if(!prefix)
            throw new AppError("Prefix not found", 400);

        return { success: true, prefix };

    } catch (error) {
        console.log(error)
        return { success: false, message: error.simpleMessage || "Unexpected Error", error: error, status: error.status || 500 };
    }
}

export async function GetGiftcardHistory()
{
    const session = await GetSessionFromCookies();
    try {
        const orders = await prisma.order.findMany({
            where: { 
                userId: session.userId,
                giftcards: {
                    some: {}, // Ensures the order has at least one associated gift card
                }, 
            },
            orderBy: { createdAt: 'desc' }, // Sort orders by the latest created first
            take: 10, // Limit to the latest 10 orders
            select: {
                id: true,
                quantity: true,
                createdAt: true,
                completedAt: true,
                product: {
                    select: {
                        icon: true,
                        name: true,
                        productCategory: {
                            select: {
                                displayName: true,
                            }
                        }
                    }
                },
                giftcards: { // Include all gift cards related to each order
                    select: {
                        code: true,
                        deliveredAt: true,
                    }
                } 
            },
          });
        
        return { success: true, orders };
    } catch (error) {
        console.log(error);
        return { success: false, message: error.simpleMessage || "Unexpected Error", error: error, status: error.status || 500 };
    }    
}