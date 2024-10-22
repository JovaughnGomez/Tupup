import React from 'react'
import ProductPage from '@/app/components/ProductList'

async function page() {
    let productCategories = [];
    const res = await fetch(`http://localhost:3000/api/search?type=giftcard `, {
        method:"GET",
        next: { revalidate: 1 },
        headers: {
            InternalToken: process.env.INTERNAL_REQUEST_TOKEN,
            'Cache-Control': 'no-store', // Disable caching
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