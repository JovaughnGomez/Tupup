import { FindUserByEmail } from "@/app/controllers/userController";
import { DeleteTokenRedis, RetrieveTokenRedis } from "@/app/lib/db";
import { ComparePassword, GeneratePasswordHash } from "@/app/lib/utils";
import { NextResponse } from "next/server";

export async function POST(request) {
    const formData = await request.formData();
    const newPassword = await formData.get('new_password');
    const confirmPassword = await formData.get('confirm_password');
    const email = await formData.get('email');
    const resetToken = await formData.get('resetToken');
    
    // Verify email and token were sent
    if(!email || !resetToken)
        return NextResponse.json({ success: false, redirect: `/resetpassword?token=${resetToken}&expired=true` }, { status: 400 })

    // Ensure new and old password are the same
    if(!newPassword || !confirmPassword)
        return NextResponse.json({ success: false, error: "Please input all fields.", status: 400 });

    if(newPassword !== confirmPassword)
        return NextResponse.json({ success: false, error: "New password and confirm password do not match."}, { status: 400});
    
    // Retrieving redis token baesd on email sent
    const tokenResults = await RetrieveTokenRedis("reset_password", email);
    if(!tokenResults.success)
        return NextResponse.json({ success: false, redirect: `/resetpassword?token=${resetToken}&expired=true` }, { status: 400 })
    
    // Verifying that email and token sent match those in redis storage.
    const doSecretsMatch = await ComparePassword(resetToken, tokenResults.token);
    if(!doSecretsMatch)
        return NextResponse.json({ success: false, redirect: `/resetpassword?token=${resetToken}&expired=true` }, { status: 400 })
    
    const userResults = await FindUserByEmail(email);
    if(!userResults.success)
        return NextResponse.json({ success: false, message: "Unexpected Error" }, { status: userResults.status });
    
    const hashedPassword = await GeneratePasswordHash(newPassword);
    try {
        const updatedUser = await prisma.user.update({
            where: {
                email: email,
            }, 
            data: {
                password: hashedPassword,
            }
        })
        
        if(!updatedUser)
            return NextResponse.json({ success: false, error: "Unexpected Error" }, { stauts: 500 });
        
        await DeleteTokenRedis("reset_password", email);
        return NextResponse.json({ success: true }, { status: 200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, error: "Unexpected Error" }, { stauts: 500 });
    }

}
