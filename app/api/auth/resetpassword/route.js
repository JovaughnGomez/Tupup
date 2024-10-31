import { FindUserByEmail } from "@/app/controllers/userController";
import { AppError } from "@/app/lib/AppError";
import { IsAliasEmail } from "@/app/lib/auth";
import { AddTokenToRedisWithTTL } from "@/app/lib/db";
import { SendPasswordResetLink } from "@/app/services/resend/brevoClient";
import { NextResponse } from "next/server";

// To handle a POST request to /api
export async function POST(request) {
    try {
        let email = await request.text();
        if(!email)
            return NextResponse.json({ success: false, error: "This email is invalid."}, {status: 400});
        
        email = email.toLowerCase();
        
        const isEmailValid = await IsAliasEmail(email);
        if(!isEmailValid.isAuthorizedProvider)
            return NextResponse.json({ success: false, error: "There are no accounts with this email."}, {status: 400});
            
        const userResult = await FindUserByEmail(email); 
        if(!userResult.success)
            return NextResponse.json({ success: true, error: `An email has been sent to your mailbox.`}, {status: 200});
    
       // generate code, hash code, store code
        const verificationKey = `reset_password:${email}`;
        const ttl = 4 * 60 * 60;
        const tokenResults = await AddTokenToRedisWithTTL(verificationKey, ttl);
        if(!tokenResults.success)
            throw new AppError("Unexpected Error", 500);
        
        const token = tokenResults.originalToken;
        const resetLink = `http://localhost:3000/resetpassword?token=${encodeURIComponent(token)}&email=${encodeURIComponent(email)}`
    
        // send code to email
        const results = await SendPasswordResetLink(email, resetLink);
        return NextResponse.json({ success: true, error: "An email has been sent to your mailbox." }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: error.simpleMessage || "Unexpected Error", error: error, status: error.status || 500 });
    }
}