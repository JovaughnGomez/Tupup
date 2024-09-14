import React from 'react'
import categoryData from '@/data/category.json'
import ProductPage from './ProductPage';
import { remark } from 'remark';
import html from 'remark-html';
import { rehype } from 'rehype';
import rehypeSanitize from 'rehype-sanitize';

async function page({ params }) {
    const name = params.name;
    // search for product category with that name, if the category does not exist then 404 page.

    const category = categoryData;
    let description = (await remark().use(html).process(category.description)).toString();
    description = (await rehype()
                    .data('settings', {fragment: true})
                    .use(rehypeSanitize)
                    .process(description)).value;

    const guide = (await remark().use(html).process(category.guide)).toString();
    const products = [];
    const p1 = {
        id:1,
        name: "100 Diamonds",
        icon: "/img/icons/freefire_icon.webp",
        price: 1.05,
        salePrice: 0,
    }   
        const p2 = {
        id:1,
        name: "210 Diamonds",
        icon: "/img/icons/freefire_icon.webp",
        price: 2.10,
        salePrice: 2,
    }
    const p3 = {
        id:1,
        name: "530 Diamonds",
        icon: "/img/icons/freefire_icon.webp",
        price: 5.25,
        salePrice: 4.99,
    }
    const p4 = {
        id:1,
        name: "100 Diamonds",
        icon: "/img/icons/freefire_icon.webp",
        price: 7.33,
        salePrice: 7.26,
    }
    const p5 = {
        id:1,
        name: "100 Diamonds",
        icon: "/img/icons/freefire_icon.webp",
        price: 9.98,
        salePrice: 10.50,
    }  

    products.push(p1);
    products.push(p2);
    products.push(p3);
    products.push(p3);
    products.push(p3);
    products.push(p4);
    products.push(p5);
    products.push(p5);
    products.push(p5);
    products.push(p5);

    return (
    <>
        <ProductPage category={category} products={products} description={description} guide={guide}/>
    </>
  )
}

export default page