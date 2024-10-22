import React from 'react'
import ProductPage from './ProductPage';
import { remark } from 'remark';
import html from 'remark-html';
import { rehype } from 'rehype';
import rehypeSanitize from 'rehype-sanitize';
import { redirect } from 'next/navigation';
import { GetCategoryDTO } from '@/data/cataegory-dto';
import { FindProductsByCategoryId } from '@/app/controllers/productController';

async function page({ params }) {
    const { name } = params;
    
    // search for product category with that name, if the category does not exist then 404 page.
    const results = await GetCategoryDTO(name);
    if(!results.success)
        redirect("/");

    const category = results.category;
    let description = (await remark().use(html).process(category.description)).toString();
    description = (await rehype()
                    .data('settings', {fragment: true})
                    .use(rehypeSanitize)
                    .process(description)).value;

    const guide = (await remark().use(html).process(category.guide)).toString();
    let products = [];
    const productResults = await FindProductsByCategoryId(category.id);
    if(productResults.success)
        products = productResults.products;

    const reviews = [];
    const review = {
        username:"Jovaughn",
        stars:3,
        icon:"/img/user/avatar/p.webp",
        createdAt: Date.now(),
        comment:"fantastic",
    }
    reviews.push(review);
    reviews.push(review);
    reviews.push(review);
    return (
    <>
        <ProductPage category={category} products={products} reviews={reviews} description={description} guide={guide}/>
    </>
  )
}

export default page