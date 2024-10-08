import { UpsertCategory } from "@/app/controllers/categoryController";
import { ToggleActivationOnManyProducts } from "@/app/controllers/productController";
import { GetSessionFromCookies, ValidateCSRFToken } from "@/app/lib/session";
import { NextResponse } from "next/server";

export async function POST(request) {
    const session = await GetSessionFromCookies();
    const formData = await request.formData();

    if(!session)
        return NextResponse.redirect("/login", request.url);

    const csrfToken = formData.get('csrfToken');
    const isValid = await ValidateCSRFToken(session, csrfToken);
    if(!isValid)
        return NextResponse.json({success: false, message: "Unauthorized Request"}, {status: 401});

    const id = formData.get('id');
    const poster = formData.get('poster');
    const productName = formData.get('product_name');
    const displayName = formData.get('display_name');
    const region = formData.get('region');
    const notes = formData.get('notes');
    const description = formData.get('description');
    const guide = formData.get('guide');
    const productsAsString = formData.get('products');
    const products = JSON.parse(productsAsString);
    
    const categoryResults = await UpsertCategory(id, poster, productName, displayName, region, notes, description, guide);
    if(!categoryResults.success)    
        return NextResponse.json({ success: false, message: categoryResults.message}, { status: categoryResults.status });
    
    const productResults = await ToggleActivationOnManyProducts(products);
    if(!productResults.success)
        return NextResponse.json({ success: false, message: productResults.message}, { status: 500 });

    return NextResponse.json({ success: true, message: ``}, { status: 200 });
}
