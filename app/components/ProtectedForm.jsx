import React from 'react'
import { GetSessionFromCookies } from '@/app/lib/session'

async function ProtectedForm({ children, id="", name, method="post", action="", styles="",}) {
    const session = await GetSessionFromCookies();
    const csrfToken = session && session.csrfToken ? session.csrfToken : "";    

    return (
    <form className={styles} method={method} id={id} name={name} action={action}>
        <input type="hidden" name='csrfToken' value={csrfToken} />
        {children}
    </form>
  )
}

export default ProtectedForm