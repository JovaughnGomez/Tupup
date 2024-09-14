import React from 'react'
import ProductPage from '@/app/components/ProductList'

function page() {
    const productCategories = [];
    const category = {
        name: "freefire",
        displayName:"Freefire",
        icon:"/img/posters/freefire.webp",
        region:"United States",
        description:"This is a great product",
        guide:"1. Log into PSN account 2. Enter Code 3. Redeem"
    }
    productCategories.push(category);
    productCategories.push(category);
    productCategories.push(category);
    productCategories.push(category);
    productCategories.push(category);
    productCategories.push(category);
    productCategories.push(category);
    productCategories.push(category);

    return (
    <div>
        <ProductPage categories={productCategories} />
    </div>
  )
}

export default page