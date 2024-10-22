"use server"
import prisma from "@/server/prisma"
import { AppError } from "../lib/AppError";

export async function CreateProduct(name, onSale, icon, categoryId, usdValue, price, salePrice)
{
    if(!name || !icon || !categoryId || !usdValue || !price || !salePrice)
        return { success: false, message: `Some fields were empty`, status: 401};
    
    const costPriceUSD = usdValue * 7;
    if(costPriceUSD > price || costPriceUSD > salePrice)
        return { success: false, message: `Not Profitable`, status: 400};

    try {
        const product = await prisma.product.create({
            data: {
                name,
                icon,
                categoryId,
                usdValue,
                onSale,
                price,
                salePrice
            }
        });

        return { success: true, product}
    } catch (error) {
        console.error(error);
        return { success: false, message: error.simpleMessage || "Unexpected Error", error: error, status: error.status || 500 };
    }
}

export async function FindActiveProductById(id)
{
    try {
        const product = await prisma.product.findUnique({
            where: {
                id
            }
        });

        if(!product || !product.isActive)
            throw new AppError("Product does not exist.", 400);
        
        return { success: true, product }
    } catch (error) {
        console.log(error);
        return { success: false, message: error.simpleMessage || "Unexpected Error", error: error, status: error.status || 500 };
    }
}

export async function UpdateProduct(id, onSale, salePrice)
{
    if(!id || !salePrice)
        return { success: false, message: `Some fields were empty`, status: 401};
    
    try {
        const product = await prisma.order.findFirst({ where: { productId: id }})
        if(!product)
            return new AppError("At least one of this product has been purchased before.", 400);

        const updatedProduct = await prisma.product.update({
            where: {
                id,
            },
            data: {
                onSale,
                salePrice
            }
        })

        if(!updatedProduct)
            return new AppError("Product does nto exist", 400);
        
        return { success: true, product: updatedProduct };
    } catch (error) {
        console.error(error);
        return { success: false, message: error.simpleMessage || "Unexpected Error", error: error, status: error.status || 500 };
    }
}

export async function ToggleActivationOnManyProducts(products)
{
    try {
        let results = await prisma.$transaction(
            products.map((product) => 
               prisma.product.update({
                where: { id: product.id },
                data: { isActive: product.isActive },
              })
            )
        );

        products = results.map(({ salePrice, price, usdValue, ...product }) => ({
            ...product,
            salePrice: salePrice?.toString(),
            price: price?.toString(),
            usdValue: usdValue?.toString(),
        }));

        return { success: true, products };
    } catch (error) {
        console.log(error);
        return { success: false, message: error.simpleMessage || "Unexpected Error", error: error, status: error.status || 500 };
    }
}

export async function DeleteProduct(id)
{
    if(!id)
        return { success: false, message: `Product not found.`, status: 400};

    try {
        const deletedProduct = await prisma.product.update({
            where: {
                id
            }, 
            data: {
                isActive: false,
            }
        });

        return { success: true, product: deletedProduct }
    } catch (error) {
        console.error(error);
        return { success: false, message: error.simpleMessage || "Unexpected Error", error: error, status: error.status || 500 }; 
    }
}

export async function FindProductsByCategoryId(categoryId, includeInactive)
{
    if(!categoryId)
        return { success: false, message: `CategoryId is not valid`, status: 400};

    try {
        let products = await prisma.product.findMany({
            where: { 
                categoryId: categoryId,
                ...(includeInactive ? {} : { isActive: true })
            }
        });

        products = products.map(({ salePrice, price, usdValue, ...product }) => ({
            ...product,
            salePrice: salePrice?.toString(),
            price: price?.toString(),
            usdValue: usdValue?.toString(),
        }));

        return { success: true, products }
    } catch (error) {
        console.error(error);
        return { success: false, message: error.simpleMessage || "Unexpected Error", error: error, status: error.status || 500 };;
    }
}