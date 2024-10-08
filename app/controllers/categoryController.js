"use server"
import prisma from "@/server/prisma"
import { GenerateUUID } from "../lib/utils";

export async function FindCategoryById(id)
{
    if(!id)
        return {success: false, message: "The ID field is empty", status: 401};

    try {
        const category = await prisma.productCategory.findUnique({
            where: {
                id,
                isActive: true,
            }
        });
    
        if(!category)
            return {success: false, message: "Not Found.", status: 400};        

        return { success: true, category }
    } catch (error) {
        console.log(error);
        return {success: false, message: "Unexpected Error", status: 500};        
    }
}

export async function FindCategoryByName(name, includeInactive)
{
    if(!name)
        return {success: false, message: "The name field is empty", status: 401};
    
    try {
        const category = await prisma.productCategory.findUnique({
            where:{
                name,
                ...(includeInactive ? {} : { isActive: true })
            }
        })

        if(!category)
            return {success: false, message: "There are no ACTIVE categories with that name", status: 404};
        
        return {success: true, category}
    } catch (error) {
        console.log(error);
        return {success: false, message: "Unexpected Error", status: 500};
    }
}

export async function FindCategoryWhichIncludesValue(value)
{   
    value = value.toLowerCase();
    console.log(value);
    try {
        const categories = await prisma.productCategory.findMany({
            where: {
                name: {
                  contains: value,
                },
            },
        })

        return { success: true, categories }
    } catch (error) {
        console.error(error);
        return {sucess: false, message: "Unexpected Error", status: 500}
    }
}

export async function UpsertCategory(id, poster, productName, displayName, region, notes, description, guide)
{
    if(!id)
        id = await GenerateUUID();
    
    if(!poster || !productName || !displayName)
        return { success: false, message: `Some fields were empty`, status: 401};

    try {
        const category = await prisma.productCategory.upsert({
            where: {
                id: id
            }, 
            update: {
                name: productName,
                displayName,
                icon:poster,
                region,
                notes,
                description,
                guide,
            },
            create: {
                name: productName,
                displayName,
                icon:poster,
                region,
                notes,
                description,
                guide,
            }
        });

        return {success: true, category}
    } catch (error) {
        console.error(error);
        return { success: false, mesage: "Unexpected Error", status:500}
    }
}