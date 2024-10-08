import { NextResponse } from "next/server";
import { Logout } from "@/app/lib/action";

// To handle a POST request to /api
export async function GET(request)
{
    try {
        await Logout();
        return NextResponse.redirect(new URL("/", request.url));
    } catch (error) {
        console.log(error);
        return NextResponse.json({}, {status: 400});    
    }
}
	