import React from 'react'
import ProductPage from '@/app/components/ProductList'

async function page() {
    let productCategories = [];
    const res = await fetch("http://localhost:3000/api/search", {
        method:"GET",
        headers: {
            InternalToken: process.env.INTERNAL_REQUEST_TOKEN,
            }
    });

    const results = await res.json();
    if(results.success)
        productCategories = results.categories;

    return (
    <div>
        <ProductPage categories={productCategories} />
    </div>
  )
}

export default page