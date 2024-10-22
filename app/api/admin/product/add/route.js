import { CreateProduct } from "@/app/controllers/productController";
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

    const productName = formData.get('product_name');
    const icon = formData.get('icon');
    const categoryId = formData.get('category_id');
    const usdValue = formData.get('usd_value');
    const price = formData.get('price');
    const salePrice = formData.get('sale_price');
    const onSale = formData.get('onSale') === "true" ? true : false;
    const results = await CreateProduct(productName, onSale, icon, categoryId, usdValue, price, salePrice);
    if(!results.success)
        return NextResponse.json(results);

    return NextResponse.json({ success: true, product: results.product}, { status: 200 });
}
