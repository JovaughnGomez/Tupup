import { CreateReview } from "@/app/controllers/reviewController";
import { GetSessionFromCookies } from "@/app/lib/session";
import { NextResponse } from "next/server";
import { remark } from 'remark';
import html from 'remark-html';
import { rehype } from 'rehype';
import rehypeSanitize from "rehype-sanitize";

export async function POST(request)
{
    const session = await GetSessionFromCookies();
    if(!session)
        return NextResponse.redirect("/login", request.url);

    const formData = await request.formData();
    const categoryId = await formData.get('category_id');
    const categoryName = await formData.get('category_name');
    const rating = await formData.get('rating');
    const comment = await formData.get('comment');
    const userId = session.userId;
    let reviewText = (await remark().use(html).process(comment)).toString();
    reviewText = (await rehype()
                    .data('settings', {fragment: true})
                    .use(rehypeSanitize)
                    .process(reviewText)).value;

    const results = await CreateReview(categoryId, userId, rating, reviewText);
    if(!results.success)
        return NextResponse.json({ success: false, message: results.message }, { status: results.status });
    
    return NextResponse.json({ success: true, redirect: `/product/${categoryName}/#reviews` }, { status:200 });
}
	