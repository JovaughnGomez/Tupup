import React from 'react'
import { ConvertDateToString } from '@/app/lib/clientUtils';
import { GetProfileDTO } from '@/data/user-dto';
import Profile from './Profile';
import { GetSessionFromCookies } from '@/app/lib/session';
import { redirect } from 'next/navigation';

async function page() {
    const userData = await GetProfileDTO();
    const dateJoinedReadable = ConvertDateToString(userData.joined);
    const session = await GetSessionFromCookies();
    if(!session.csrfToken)
        redirect("/login");

    return (
        <>
            <Profile userData={userData} joinDate={dateJoinedReadable} csrfToken={session.csrfToken} />
        </>
    )
}

export default page