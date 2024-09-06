// import { NextResponse } from 'next/server';
// import { GetSession } from '@/app/lib/utils';
// import { IsUserAnAdmin } from '@/app/lib/userController';

// export async function GET(request)
// {
//     const sessionId = await request.headers.get("authorization");
//     const session = await GetSession(sessionId);
//     let successful = session ? true : false;

//     const requiresAdmin = await request.headers.get("Admistrator");
//     let isAdmin = false;

//     if(requiresAdmin == "true")
//         isAdmin = await IsUserAnAdmin(session);

//     return NextResponse.json({ 
//         isAuthorized: successful,
//         session: successful ? session : null,
//         isAdmin: isAdmin,
//     }, { status: 200})
// }