import { NextResponse } from 'next/server';
import { GetSession } from '@/app/lib/session';
import { IsUserAnAdmin } from '@/app/controllers/userController';

export async function GET(request)
{
    const sessionId = await request.headers.get("authorization");
    const session = await GetSession(sessionId);
    let successful = session ? true : false;

    const requiresAdmin = await request.headers.get("Admistrator");
    let isAdmin = false;

    if(requiresAdmin == "true")
    {
        const results = await IsUserAnAdmin(session);
        if(results.success)
            isAdmin = results.isAdmin;
    }

    return NextResponse.json({ 
        isAuthorized: successful,
        session: successful ? session : null,
        isAdmin: isAdmin,
    }, { status: 200})
}