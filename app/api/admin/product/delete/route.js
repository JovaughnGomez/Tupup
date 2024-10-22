import { DeleteProduct } from "@/app/controllers/productController";
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
        return NextResponse.json({ success: false, message: "Unauthorized Request"}, {status: 401});
    
    const productId = formData.get('product_id');
    const results = await DeleteProduct(productId);
    if(!results.success)
        return NextResponse.json(results, { stauts: results.status });

    return NextResponse.json({ success: true, productId }, { status: 200 });
}
