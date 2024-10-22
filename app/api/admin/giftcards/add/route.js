import { FindCategoryById } from "@/app/controllers/categoryController";
import { AddGiftcards } from "@/app/controllers/giftcardController";
import { GetSessionFromCookies, ValidateCSRFToken } from "@/app/lib/session";
import { NextResponse } from "next/server";

export async function POST(request) {
    const session = await GetSessionFromCookies();
    const formData = await request.formData();
    const categoryId = formData.get('id');
    const codesAsString = formData.get('codes');
    const denomination = formData.get('denomination');

    if(!session)
        return NextResponse.redirect("/login", request.url);

    const csrfToken = formData.get('csrfToken');
    const isValid = await ValidateCSRFToken(session, csrfToken);
    if(!isValid)
        return NextResponse.json({ success: false, message: "Unauthorized Request"}, {status: 401});
    
    if(!denomination)
        return NextResponse.json({ success: false, message: "Denomination field is empty."}, {status: 401});

    if(!codesAsString)
        return NextResponse.json({ success: false, message: "No Codes Submitted"}, {status: 400});
    
    let allCodes = [];
    try {
        allCodes = JSON.parse(codesAsString);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Unexpected Error" }, { status: 500 });
    }

    const results = await FindCategoryById(categoryId);
    if(!results.success)
        return NextResponse.json({ success: false, message: results.message }, { status: results.status });

    const category = results.category;
    const giftcardResults = await AddGiftcards(allCodes, category.name, denomination);
    if(!giftcardResults.success)
        return NextResponse.json({ success: false, message: giftcardResults.message },  { status: giftcardResults.status });
    
    return NextResponse.json({ success: true, rejectedCodes: giftcardResults.rejectedCodes }, { status: 200 });
}
