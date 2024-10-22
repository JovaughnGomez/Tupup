import { CreateOrder } from "@/app/controllers/orderController";
import { GetSessionFromCookies } from "@/app/lib/session";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function POST(request) {
    const session = await GetSessionFromCookies();
    const formData = await request.formData();

    if(!session)
        return NextResponse.redirect("/login", request.url);

    const productId = formData.get('product_id');
    const quantity = formData.get('quantity');
    const categoryName = formData.get('category_name');
    const orderNotes = formData.get('order_notes');
    const results = await CreateOrder(productId, quantity, session.userId);
    if(!results.success)
        redirect(`/product/${categoryName}`);

    redirect(`/cart/order_checkout?id=${results.order.id}`);
}
