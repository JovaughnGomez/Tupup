import { AppError } from "@/app/lib/AppError";
import { CheckIfBaseEmailExist, IsAliasEmail } from "@/app/lib/auth";
import { AddTokenToRedisWithTTL } from "@/app/lib/db";
import { SendEmailVerificationLink } from "@/app/services/resend/brevoClient";
import { NextResponse } from "next/server";

// To handle a POST request to /api
export async function POST(request) {
    try {
        let email = await request.text();
        if(!email)
            return NextResponse.json({ success: false, email: "You must submit a valid email to continue."}, {status: 400});
        
        email = email.toLowerCase();
    
        const baseEmailData = await IsAliasEmail(email);
        if(!baseEmailData.isAuthorizedProvider)
            return NextResponse.json({ success: false, email:"The email provider you used is not allowed. Please sign up using a common email provider like Gmail, Yahoo, Outlook, iCloud, or Zoho" }, { status: 400 });
        
        const isEmailTaken = await CheckIfBaseEmailExist(baseEmailData.baseEmail);
        if(isEmailTaken)
            return NextResponse.json({ success: false, email: "A account with this email already exist." }, { status: 400 });
          
        // generate code, hash code, store code
        const verificationKey = `email_verification:${email}`;
        const ttl = 4 * 60 * 60;
        const results = await AddTokenToRedisWithTTL(verificationKey, ttl);
        if(!results.success)
            throw new AppError("Unexpected Error", 500);

        const token = results.originalToken;
        const verificationLink = `http://localhost:3000/register?secret=${encodeURIComponent(token)}&email=${encodeURIComponent(email)}`
    
        // // send code to email
        const emailVerification = await SendEmailVerificationLink(email, verificationLink);
        return NextResponse.json({ success: true}, {status: 200});

    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: error.simpleMessage || "Unexpected Error", error: error, status: error.status || 500 });
    }
}