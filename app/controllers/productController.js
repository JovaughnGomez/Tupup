"use server"
import Product from "@/data/product-dto";
import prisma from "@/server/prisma"

export async function UpdateMultipleProducts(products)
{
    try {
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            
        }
        const categories = prisma.productcategory.update({
            where: {

            }
        })
    } catch (error) {
        
    }
}

export async function CreateProduct(name, icon, categoryId, usdValue, price, salePrice)
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
                price,
                salePrice
            }
        });

        return {success: true, product}
    } catch (error) {
        console.error(error);
        return { success: false, mesage: "Unexpected Error", status:500}
    }
}

export async function UpdateProduct(id, salePrice)
{
    if(!id || !salePrice)
        return { success: false, message: `Some fields were empty`, status: 401};
    
    try {
        const product = await prisma.order.findFirst({ where: { productId: id }})
        if(product)
            return { success: false, message: `At least one of this product has been purchased before.`, status: 400};

        const updatedProduct = await prisma.product.update({
            where: {
                id,
            },
            data: {
                salePrice
            }
        })

        if(!updatedProduct)
            return { success: false, message: `Product does not exist.`, status: 400};
        
        return { success: true, product: updatedProduct };
    } catch (error) {
        console.error(error);
        return { success: false, mesage: "Unexpected Error", status:500}  
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
        return { success: false, message:"Unexpected Error" }
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
        return { success: false, mesage: "Unexpected Error", status:500}   
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
        return { success: false, mesage: "Unexpected Error", status:500}   
    }
}