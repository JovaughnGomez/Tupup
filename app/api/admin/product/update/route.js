import { UpdateProduct } from "@/app/controllers/productController";
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

    const id = formData.get('product_id');
    const salePrice = formData.get('sale_price');
    const onSale = formData.get('onSale') === "true" ? true : false;
    const results = await UpdateProduct(id, onSale, salePrice);

    if(!results.success)
        return NextResponse.json(results, {status: results.status});

    return NextResponse.json({ success: true, product: results.product}, { status: 200 });
}
