import { NextResponse } from 'next/server'
import { cookies } from 'next/headers';

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
    const serverToken = request.headers.get("InternalToken"); 
    const currentPath = request.nextUrl.pathname;

    if(!serverToken || serverToken != process.env.INTERNAL_REQUEST_TOKEN)
    {
        const cookieStore = cookies();
        // Redirect if no auth token
        if(!cookieStore.has(process.env.AUTH_COOKIE_NAME))
            return NextResponse.redirect(new URL("/login", request.url));
            
        // Retrieve sessionId
        const sessionId = cookies().get(process.env.AUTH_COOKIE_NAME).value;
        const isAdminPage = currentPath.startsWith('/api/admin') || currentPath.startsWith('/admin');

        // Make fetch call to actual middleware route so that it can validate user
        const response = await fetch("http://localhost:3000/api/middleware", {
            method: "GET", 
            headers: {
                InternalToken: process.env.INTERNAL_REQUEST_TOKEN,
                Authorization:sessionId,
                Admistrator: isAdminPage,
            }
        });
        
        const responseHeader = response.headers.get("Content-Type");
        const results = responseHeader == "application/json" ? await response.json() : {}
        
        if(!results.isAuthorized)
            return NextResponse.redirect(new URL("/login", request.url));
        
        if(isAdminPage)
        {     
            if(!results.isAdmin)
                return NextResponse.redirect(new URL("/", request.url));
        }
    }
}
 
export const config = {
    // Does not run on the following paths:
    matcher: ['/((?!_next/static|css|img|js|login|register|topups|product|cards|api/auth|$).*)']
}
