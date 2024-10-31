import { GetSessionFromCookies, ValidateCSRFToken } from "@/app/lib/session";
import { IsUsernameValid } from "@/app/lib/utils";
import { NextResponse } from "next/server";

export async function POST(request) {
    const session = await GetSessionFromCookies();
    if(!session)
        return NextResponse.redirect("/login", request.url);
    
    const formData = await request.formData();
    const csrfToken = formData.get('csrfToken');
    const isValid = await ValidateCSRFToken(session, csrfToken);
    if(!isValid)
        return NextResponse.json({ success: false, message: "Unauthorized Request"}, {status: 401});
    
    const newUsername = formData.get('username');
    if(!newUsername)
        return NextResponse.json({ success: false, message: "Username must not be empty."}, {status: 401});

    try {
        const isUsernameValid = await IsUsernameValid(newUsername);
        if(!isUsernameValid)
            return NextResponse.json({ success: false, message: "Username can only contain letters, numbers, and underscores." }, { status: 400 });

        const usernameCheck = await prisma.user.findUnique({
            where: {
                username: newUsername
            }
        });

        if(usernameCheck)
            return NextResponse.json({ success: false, message: "Username already taken." }, { status: 400 });

        const updatedUser = await prisma.user.update({
            where: {
                id: session.userId,
            }, 
            data: {
                username: newUsername,
            }
        })

        if(!updatedUser)
            return NextResponse.json({ success: false, error: "Unexpected Error" }, { stauts: 500 });
        
        return NextResponse.json({ success: true, message:"Your username was successfully changed." }, { status:200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, error: "Unexpected Error" }, { stauts: 500 });
    }
}
