"use client"
import React from 'react';
import { useState } from 'react';
import loginStyles from "@/public/css/login.module.css";
import ErrorText from '@/app/components/ErrorText';
import SubmitButton from '@/app/components/SubmitButton';
import OAuthComponent from '../components/OAuthComponent';

function Register_EmailVerification(callback) {
  const [error, setError ] = useState("");
  const [email, setEmail ] = useState("");
  const [success, setSuccess ] = useState(false);
  
  async function OnSubmit(e)
  {
    setError("");
    if(callback)
    {
      const results = await callback.callback(email);
      if(!results.success)
          setError(results.email);
      
      setSuccess(results.success);
    }
  }

  return (
    <>
      {!success ? (

        <>
          <h2 className={`font-bold ${loginStyles.registerTitle}`}>Sign Up</h2>
          <div className={loginStyles.wrapperrr}>
              <div className={loginStyles.input_wrp}>
                  <label id="login_user" className={loginStyles.label}>
                      <input className={loginStyles.input} type="email" placeholder='Email' name='email' onChange={(e) => setEmail(e.currentTarget.value)} required/>
                  </label>
              </div>
              {error && <ErrorText text={error} />}
              <div className={`${loginStyles.signUpWrp} mt-5`}>
                  <SubmitButton onSubmit={OnSubmit} fullWidth={true} placeholder={"Send Verification Email"}/>
              </div>

              <div className={loginStyles.oAuthContainer}>
                <OAuthComponent />
              </div>
          </div>
        </>
      ) : (
        <div className={loginStyles.successfulEmail}>
          <h1 className={"uppercase"}>Email Verification Needed</h1>
          <p>
            Thank you for signing up to Game Haven! <br />
            To complete your registration, please check your <span className='accent'>inbox</span> at <span className='accent'>{email}</span> for an <span className='accent'> email verification link</span>. <br /> 
            If you don’t see it shortly, be sure to check your spam or junk folder.
            If you haven't received the email, you can request a new one below.
          </p>
        </div>
      )
    }
    </>
  )
}

export default Register_EmailVerification