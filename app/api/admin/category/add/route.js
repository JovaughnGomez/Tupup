import { UpsertCategory } from "@/app/controllers/categoryController";
import { ToggleActivationOnManyProducts } from "@/app/controllers/productController";
import { GetSessionFromCookies, ValidateCSRFToken } from "@/app/lib/session";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function POST(request) {
    const session = await GetSessionFromCookies();
    const formData = await request.formData();

    if(!session)
        return NextResponse.redirect("/login", request.url);

    const csrfToken = formData.get('csrfToken');
    const isValid = await ValidateCSRFToken(session, csrfToken);
    if(!isValid)
        return NextResponse.json({ success: false, message: "Unauthorized Request"}, {status: 401});

    const id = formData.get('id');
    const type = formData.get('type');
    const poster = formData.get('poster');
    const productName = formData.get('product_name');
    const displayName = formData.get('display_name');
    const region = formData.get('region');
    const notes = formData.get('notes');
    const description = formData.get('description');
    const guide = formData.get('guide');
    const prefix = formData.get('prefix');
    const codeLength = formData.get("codeLength");
    const productsAsString = formData.get('products');
    const products = JSON.parse(productsAsString);

    if(type == "giftcard")
    {
        if(!prefix || !codeLength)
            return NextResponse.json({ success: false, message: "Prefix or CodeLength is empty"}, { status:400 });
    }

    const categoryResults = await UpsertCategory(id, type, poster, productName, displayName, region, notes, description, guide, prefix, codeLength);
    if(!categoryResults.success)    
        return NextResponse.json({ success: false, message: categoryResults.message}, { status: categoryResults.status });
    
    const productResults = await ToggleActivationOnManyProducts(products);
    if(!productResults.success)
        return NextResponse.json({ success: false, message: productResults.message}, { status: productResults.status });

    return NextResponse.json({ success: true, redirect: `?product=${productName}` }, { status: 200 });
}
