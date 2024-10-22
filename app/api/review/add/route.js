import { CreateReview } from "@/app/controllers/reviewController";
import { GetSessionFromCookies } from "@/app/lib/session";
import { NextResponse } from "next/server";

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

    const results = await CreateReview(categoryId, userId, rating, comment);
    if(!results.success)
        return NextResponse.json({ success: false, message: results.message }, { status: results.status });
    
    return NextResponse.json({ success: true, redirect: `/product/${categoryName}/#reviews` }, { status:200 });
}
	