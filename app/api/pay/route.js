import { ProcessProductTransaction } from "@/app/controllers/transactionController";
import { GetSessionFromCookies } from "@/app/lib/session";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function POST(request) {
    const session = await GetSessionFromCookies();
    const formData = await request.formData();

    if(!session)
        return NextResponse.redirect("/login", request.url);

    const transactionId = formData.get('transactionId');
    const paymentMethod = formData.get('payment_method');
    const agreement = formData.get('agreement');
    
    if(!transactionId)
        redirect("/");
    
    if(!paymentMethod || !agreement)
        redirect(`/pay?trade_id=${transactionId}`)
    
    const hasAgreed = agreement === "true";
    if(!hasAgreed)
        return NextResponse.json({ success: false, message: "You must agree to proceed." }, {status: 400})

    const results = await ProcessProductTransaction(transactionId);
    if(!results.success)
        return NextResponse.json({ success: false, message: results.message }, {status: results.status})
    
    return NextResponse.json({ success: true, transaction: results.transaction });
}
