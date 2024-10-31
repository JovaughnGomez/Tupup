import React from 'react'
import { GetSessionFromCookies } from '@/app/lib/session'
import ChangePasswordForm from './ChangePasswordForm'

async function page() {
    const session = await GetSessionFromCookies();
    return (
    <>
        <h1>CHANGE PASSWORD</h1>
        <ChangePasswordForm csrfToken={session.csrfToken} placeholder={"Change Password"} />
    </>
  )
}

export default page