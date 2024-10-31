import { AdminFindTransactionOfUser } from "@/app/controllers/transactionController";
import { GetSessionFromCookies } from "@/app/lib/session";
import { NextResponse } from "next/server";

export async function GET(request) {
    const session = await GetSessionFromCookies();
    if(!session)
        return NextResponse.redirect("/login", request.url);
    
    const { searchParams } = new URL(request.url);
    if(!searchParams.has('id'))
        return NextResponse.json({ success: false }, { status: 400 });
    
    const id = searchParams.get('id');
    const userId = searchParams.get("userId") || "";

    const results = await AdminFindTransactionOfUser(id, userId, session);
    if(!results.success)
        return NextResponse.json({ success: false, message: results.message }, { status: results.status });
                
    console.log(results);
    return NextResponse.json({ success: true }, { status: 200 });
}
