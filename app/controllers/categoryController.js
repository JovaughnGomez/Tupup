"use server"
import prisma from "@/server/prisma"
import { GenerateUUID } from "../lib/utils";
import { AppError } from "../lib/AppError";
import { CreateReviewCategory } from "./reviewController";
import { CreateGiftcardPrefix } from "./giftcardPrefixController";
import { GetSessionFromCookies } from "../lib/session";
import { GetUserFromMap } from "../services/userCache";

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
    
    const session = await GetSessionFromCookies();
    const user = await GetUserFromMap(session.userId);
    const isAdmin = user.isAdmin;
    let reviewSearchParams = { show: true };
    if(isAdmin)
        reviewSearchParams = {};

    try {
        const category = await prisma.productCategory.findUnique({
            where:{
                name,
            },
            select: {
                id: true,
                type: true,
                name: true,
                displayName: true,
                icon: true,
                region: true,
                allowMultiple: true,
                notes: true,
                description: true,
                guide: true,
                isActive: true,
                products: {
                    where: {
                        isActive: true,
                    },
                },
                reviews: {
                    select: {
                        totalExcellent: true,
                        totalGood: true,
                        totalDecent: true,
                        totalBad: true,
                        totalTerrible: true,
                        totalReviews: true,
                        reviews: {
                            where: reviewSearchParams,
                            select: {
                                id: true,
                                stars: true,
                                notes: true,
                                createdAt: true,
                                show: true,
                                user: {
                                    select: {
                                        username: true,
                                        avatar: true,
                                    }
                                }
                            },
                            take: 10,
                        }
                    }
                }
            }
        })

        if(!category)
            throw new AppError("There are no products with that name", 400);
        
        if(!includeInactive && !category.isActive)
            throw new AppError("There are no products with that name", 400, "This product exist but is not activated");

        category.products = category.products.map((product) => ({
            ...product,
            price: product.price.toString(),
            salePrice: product.salePrice.toString(),
            usdValue: product.usdValue.toString(),
        }));

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
                },
                isActive: true,
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
                    reviews: {
                        create: {
                            
                        }
                    }
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
            }
        });

        return { success: true, category: results }
    } catch (error) {
        console.error(error);
        return { success: false, message: error.simpleMessage || "Unexpected Error", error: error, status: error.status || 500 };
    }
}

export async function IsCategoryAGiftcard(categoryName)
{
    try {
        if(!categoryName)
            throw new AppError("Category not found", 400, "No name was submitted when checking if category is a giftcard");

        const category = await prisma.productCategory.findUnique({
            where: {
                name: categoryName,
            }
        })
        
        if(!category)
            throw new AppError("Category not found", 400);
        
        return category.type === "giftcard";
    } catch (error) {
        console.log(error);
        return { success: false, message: error.simpleMessage || "Unexpected Error", error: error, status: error.status || 500 };   
    }
}