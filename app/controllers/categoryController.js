"use server"
import prisma from "@/server/prisma"
import { GenerateUUID } from "../lib/utils";
import { AppError } from "../lib/AppError";
import { CreateReviewCategory } from "./reviewController";
import { CreateGiftcardPrefix } from "./giftcardPrefixController";

export async function FindCategoryById(id)
{
    if(!id)
        return { success: false, message: "The ID field is empty", status: 401};

    try {
        const category = await prisma.productCategory.findUnique({
            where: {
                id,
            }
        });
        
        if(!category)
            throw new AppError("Not Found", 400);

        if(!category.isActive)
            throw new AppError("Category does not exist or is not active");

        return { success: true, category }
    } catch (error) {
        console.log(error);
        return { success: false, message: error.simpleMessage || "Unexpected Error", error: error, status: error.status || 500 };
    }
}

export async function FindCategoryByName(name, includeInactive)
{
    if(!name)
        return { success: false, message: "The name field is empty", status: 401 };
    
    try {
        const category = await prisma.productCategory.findUnique({
            where:{
                name,
                ...(includeInactive ? {} : { isActive: true })
            }
        })

        if(!category)
            throw new AppError("There are no ACTIVE categories with that name", 404);
        
        return { success: true, category}
    } catch (error) {

        console.log(error);
        return { success: false, message: error.simpleMessage || "Unexpected Error", error: error, status: error.status || 500 };
    }
}

export async function FindCategoryWhichIncludesValue(value, type)
{   
    value = value.toLowerCase();
    try {
        const categories = await prisma.productCategory.findMany({
            where: {
                name: {
                  contains: value,
                },
                type: {
                    contains: type,
                }
            },
        })
        
        return { success: true, categories }
    } catch (error) {
        console.error(error);
        return { success: false, message: error.simpleMessage || "Unexpected Error", error: error, status: error.status || 500 };
    }
}

export async function UpsertCategory(id, type, poster, productName, displayName, region, notes, description, guide, prefix, codeLength)
{
    if(!id)
        id = await GenerateUUID();
    
    if(!poster || !productName || !displayName)
        return { success: false, message: `Some fields were empty`, status: 401};

    try { 
        const results = await prisma.$transaction(async (prismaClient) => {
            const category = await prismaClient.productCategory.upsert({
                where: {
                    id: id
                }, 
                update: {
                    name: productName,
                    type: type,
                    displayName,
                    icon:poster,
                    region,
                    notes,
                    description,
                    guide,
                },
                create: {
                    id,
                    name: productName,
                    type: type,
                    displayName,
                    icon:poster,
                    region,
                    notes,
                    description,
                    guide,
                }
            });
            
            if(id === category.id)
            {
                if(type == "giftcard")
                {
                    if(!prefix || !codeLength)
                        throw new AppError("Prefix or Code Length is empty", 400);

                    codeLength = parseInt(codeLength);
                    if(isNaN(codeLength))
                        throw new AppError("Code length is not a number", 400);
    
                    const prefixResults = await CreateGiftcardPrefix()
                    if(!prefixResults.success)
                        throw new AppError(prefixResults.message, prefixResults.status);
                }
                
                const reviewResults = await CreateReviewCategory(category.id, prismaClient);
                if(!reviewResults.success)
                    throw new AppError(reviewResults.simpleMessage, reviewResults.status);
            }
        });

        return { success: true, category: results }
    } catch (error) {
        console.error(error);
        return { success: false, message: error.simpleMessage || "Unexpected Error", error: error, status: error.status || 500 };
    }
}