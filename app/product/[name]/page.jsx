import React from 'react'
import ProductPage from './ProductPage';
import { remark } from 'remark';
import html from 'remark-html';
import { rehype } from 'rehype';
import rehypeSanitize from 'rehype-sanitize';
import { redirect } from 'next/navigation';
import { FindCategoryByName } from '@/app/controllers/categoryController';
import { HasUserLeftReviewBefore } from '@/app/controllers/reviewController';
import { GetSessionFromCookies } from '@/app/lib/session';
import { GetCurrentUserFromMap } from '@/app/lib/auth';

async function page({ params }) {
    const { name } = params;
    
    const session = await GetSessionFromCookies();
    const currentUser = await GetCurrentUserFromMap();
    
    // search for product category with that name, if the category does not exist then 404 page.
    const results = await FindCategoryByName(name);
    if(!results.success)
        redirect("/");

    const category = results.category;
    let description = (await remark().use(html).process(category.description)).toString();
    description = (await rehype()
                    .data('settings', {fragment: true})
                    .use(rehypeSanitize)
                    .process(description)).value;

    const guide = (await remark().use(html).process(category.guide)).toString();
    const canLeaveReview = await HasUserLeftReviewBefore(session.userId, category.categoryId);
    const products = category.products;
    const reviewData = category.reviews;
    reviewData.canLeaveReview = canLeaveReview;
    category.reviews = undefined;
    category.products = undefined;

    return (
    <>
        <ProductPage category={category} products={products} reviewData={reviewData} isAdmin={currentUser.isAdmin} description={description} guide={guide}/>
    </>
  )
}

export default page