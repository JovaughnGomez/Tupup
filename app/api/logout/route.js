import { NextResponse } from "next/server";
import { Logout } from "../../lib/action";

// To handle a POST request to /api
export async function POST(request)
{
    try {
        await Logout();
    } catch (error) {
        console.log(error);
        return NextResponse.json({}, {status: 400});    
    }
    return NextResponse.json({
        success: true,
    }, {status: 200});
}
	