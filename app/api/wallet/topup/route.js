import { CreateWalletTransaction } from "@/app/controllers/transactionController";
import { GetSessionFromCookies, ValidateCSRFToken } from "@/app/lib/session";
import { GetSingleWalletTransactionUnsafeDTO } from "@/data/transaction-dto";
import { NextResponse } from "next/server";

export async function POST(request) {
    const requiredVoucherLength = 15;

    const session = await GetSessionFromCookies();
    if(!session)
        return NextResponse.redirect("/login", request.url);

    const formData = await request.formData();
    const csrfToken = formData.get('csrfToken');
    const voucherType = formData.get('voucherType');

    const isValid = await ValidateCSRFToken(session, csrfToken);
    if(!isValid)
        return NextResponse.json({ success: false, message: "Unauthorized Request"}, {status: 401});

    let voucher = formData.get('voucher');
    if(!voucher || !voucherType)
        return NextResponse.json({ success: false, message: "This voucher is not valid."}, {status: 400});

    
    voucher = voucher.trim();
    if(voucher.length != requiredVoucherLength)
        return NextResponse.json({ success: false, message: "This voucher is not valid."}, {status: 400});
    
    let notes;
    try {
        notes = { voucherType: voucherType, voucher: voucher };
        notes = JSON.stringify(notes);
    } catch (error) {
        console.error("Error stringifying JSON:", error);
        return NextResponse.json({ success: false, message: "An unexpected error occured" }, { status: 500 });
    }
    
    const results = await CreateWalletTransaction("phone_card", "0", notes, session.userId);

    if(!results || !results.success)
        return NextResponse.json({ success: false, message: results.message }, { status: 500 });

    const transaction = await GetSingleWalletTransactionUnsafeDTO(results.transaction);
    return NextResponse.json({ success: true, message: "Your request is being processed. Please keep your voucher until the process has been successful.", transaction: transaction }, { status: 200 });
}
