import { CreateProductTransaction } from "@/app/controllers/transactionController";
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
    
    let allOrders = formData.get('orders');
    if(!allOrders)
        return NextResponse.json({ success: false, message: "This order does not exist."}, {status: 400});
    
    try {
        allOrders = JSON.parse(allOrders);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "This order does not exist."}, {status: 400});
    }

    const results = await CreateProductTransaction(allOrders, session.userId);
    if(!results.success)
        return NextResponse.json({ success: false, message: results.message}, {status: results.status});

    redirect(`/pay?trade_id=${results.transaction.id}`);
}
