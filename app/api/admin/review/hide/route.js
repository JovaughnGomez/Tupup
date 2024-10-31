import { HideReview } from "@/app/controllers/reviewController";
import { GetSessionFromCookies } from "@/app/lib/session";
import { NextResponse } from "next/server";

export async function POST(request)
{
    const session = await GetSessionFromCookies();
    if(!session)
        return NextResponse.redirect("/login", request.url);

    const formData = await request.formData();
    const reviewId = await formData.get('review_id');
    let status = await formData.get("status");
    status = status === "true" ? true : false;
    const results = await HideReview(reviewId, status);
    if(!results.success)
        return NextResponse.json({ success: false, message: results.message }, { status: results.status });
    
    return NextResponse.json({ success: true, status: results.status }, { status:200 });
}
	