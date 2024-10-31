import { FindUserById } from "@/app/controllers/userController";
import { GetSessionFromCookies } from "@/app/lib/session";
import { ComparePassword, GeneratePasswordHash } from "@/app/lib/utils";
import { NextResponse } from "next/server";

export async function POST(request) {
    const session = await GetSessionFromCookies();
    const formData = await request.formData();

    if(!session)
        return NextResponse.redirect("/login", request.url);

    const currentPassword = await formData.get('current_password');
    const newPassword = await formData.get('new_password');
    const confirmPassword = await formData.get('confirm_password');

    if(!currentPassword || !newPassword || !confirmPassword)
        return NextResponse.json({ success: false, error: "Please input all fields.", status: 400 });

    if(newPassword !== confirmPassword)
        return NextResponse.json({ success: false, error: "New password and confirm password do not match."}, { status: 400});
    
    const userResults = await FindUserById(session.userId);
    if(!userResults.success)
        return NextResponse.json({ success: false, message: "Unexpected Error" }, { status: userResults.status });
    
    const isPasswordSame = await ComparePassword(currentPassword, userResults.user.password);
    if(!isPasswordSame)
        return NextResponse.json({ success: false, error: "Current password is incorrect."}, { status: 400 });

    const hashedPassword = await GeneratePasswordHash(newPassword);
    try {
        const updatedUser = await prisma.user.update({
            where: {
                id: session.userId,
            }, 
            data: {
                password: hashedPassword,
            }
        })

        if(!updatedUser)
            return NextResponse.json({ success: false, error: "Unexpected Error" }, { stauts: 500 });
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, error: "Unexpected Error" }, { stauts: 500 });
    }

    return NextResponse.json({ success: true, status: 200 });
}
