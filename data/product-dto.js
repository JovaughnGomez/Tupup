"use server"
import { FindProductsByCategoryId } from "@/app/controllers/productController"

export async function GetAdminProductsDTO(categoryId)
{
    const results = await FindProductsByCategoryId(categoryId, true);
    if(!results.success)
        return results;

    const allProducts = [];
    results.products.map((product) => 
        allProducts.push({ 
            id: product.id,
            name: product.name,
            icon: product.icon, 
            usdValue: product.usdValue.toString(),
            price: product.price.toString(),
            salePrice: product.salePrice.toString(),
            isActive: product.isActive,
            createdAt: product.createdAt,
        })
    );
    
    return { success: true, products:allProducts }
}