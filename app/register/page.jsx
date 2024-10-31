import React from 'react'
import Registration from './Registration'
import { RetrieveTokenRedis } from '@/app/lib/db';
import { redirect } from 'next/navigation';
import { ComparePassword } from '../lib/utils';
async function page({ searchParams }) {
  
  const { secret, expired, email } = searchParams;
  if(secret && email)
  { 
      const tokenResults = await RetrieveTokenRedis('email_verification', email);
      if((!email && !expired) || !tokenResults.success)
          redirect(`/register?secret=${secret}&expired=true`);
      
      const doSecretsMatch = await ComparePassword(secret, tokenResults.token);
      if(!doSecretsMatch)
        redirect(`/register?secret=${secret}&expired=true`);
  }

  return (
    <>
      <Registration secret={secret} email={email} />
    </>
  )
}

export default page