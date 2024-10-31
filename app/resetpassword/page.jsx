import React from 'react'
import PasswordResetPage from './PasswordResetPage';
import { RetrieveTokenRedis } from '@/app/lib/db';
import { ComparePassword } from '@/app/lib/utils';
import { redirect } from 'next/navigation';


async function page({ searchParams }) {
    const { token, expired, email } = searchParams;

    if(token && email)
    { 
        const tokenResults = await RetrieveTokenRedis('reset_password', email);
        if((!email && !expired) || !tokenResults.success)
            redirect(`/resetpassword?token=${token}&expired=true`);

        const doSecretsMatch = await ComparePassword(token, tokenResults.token);
        if(!doSecretsMatch)
            redirect(`/resetpassword?token=${token}&expired=true`);
    }

    return (
        <>
            <PasswordResetPage />
        </>
    )
}

export default page