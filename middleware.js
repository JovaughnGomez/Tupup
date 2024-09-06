import { NextResponse } from 'next/server'
import { cookies } from 'next/headers';

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
    // const cookieStore = cookies();
    
    // // Redirect if no auth token
    // if(!cookieStore.has(process.env.AUTH_COOKIE_NAME))
    //     return NextResponse.redirect(new URL("/login", request.url));
        
    // // Retrieve sessionId
    // const sessionId = cookies().get(process.env.AUTH_COOKIE_NAME).value;
    // const currentPath = request.nextUrl.pathname;
    // const isAdminPage = currentPath.startsWith('/api/admin') || currentPath.startsWith('/admin');

    // // Make fetch call to actual middleware route so that it can validate user
    // const response = await fetch("http://localhost:3000/api/middleware", {
    //     method: "GET", 
    //     headers: {
    //         Authorization:sessionId,
    //         Admistrator: isAdminPage,
    //     }
    // });

    // const results = await response.json();

    // if(!results.isAuthorized)
    //     return NextResponse.redirect(new URL("/login", request.url));
    
    // if(isAdminPage)
    // {     
    //     if(!results.isAdmin)
    //         return NextResponse.redirect(new URL("/", request.url));
    // }
}
 
// export const config = {
//     // Does not run on the following paths:
//     matcher: ['/((?!css|_next/static|img|js|login|affliates|api/middleware|api/assets|register|api/login|api/register|how-rentaldb-works).*)'],
// }
