"use client"
import React from 'react'
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import loginStyles from "@/public/css/login.module.css";
import Border from '@/app/components/Border'
import FormBorder from '@/app/components/FormBorder'
import SubmitButton from '@/app/components/SubmitButton'
import ErrorText from '@/app/components/ErrorText';
import Register_EmailVerification from './Register_EmailVerification';

function Registration({ secret, email }) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [success, setSuccess] = useState("");
    const [validUsername, setUsername] = useState("");
    const [validPassword, setPassword] = useState("");

    const expired = searchParams.get("expired");
    async function OnSubmit(e)
    {
        const form = document.getElementById('registerForm');
        const data = new FormData(form);

        const response = await fetch("/api/auth/register", {
            method:'POST',
            body: data
        });

        const results = await response.json();
        if(results.success)
        {
            router.push("/");
        } else {
          if(results.redirect)
          {
            router.push(results.redirect);
          } else {
            setUsername("");
            setPassword("");
            setSuccess("");

            if(results.error !== undefined)
              setSuccess(results.error);
            
            if(results.username !== undefined)
              setUsername(results.username);

            if(results.password !== undefined)
              setPassword(results.password);
          }
        }
    }

  async function RegisterEmail(email)
  {
    const res = await fetch("/api/auth/register/verifyemail", {
      method:'POST',
      headers: {
        'Content-Type': 'text/plain', // or 'application/json'
      },
      body: email
    });

    const results = await res.json();
    return results;
  }

  function OnUsername(e)
  {
    e.currentTarget.value = e.currentTarget.value.replace(/\s/g,'').toLowerCase();
  }

  return (
    <Border classes='register_login_form'>
      <FormBorder classes='formBorderDefault' mainClasses='register_login_form_wrp'>
        {(!secret && !expired) && 
          <Register_EmailVerification callback={RegisterEmail} />
        } 

        {expired && secret &&
          <>
            <h2 className={`font-bold accent ${loginStyles.registerTitle}`}>EXPIRED!</h2>
            <div>
                Unfortunately, the sign-up link you used has expired. This may happen if you did not complete your registration within the given timeframe. <br />
                To sign up again, please return to the <a href="/register" className='accent underline'>Sign-Up</a> Page

            </div>
          </>
        }

        {(secret && !expired) && 
            <>
                <h2 className={`font-bold ${loginStyles.registerTitle}`}>Sign Up</h2>
                <form className={loginStyles.login_form} action="post" id='registerForm'>
                    <input type="hidden" name='secret' value={secret} />
                    <input type="hidden" name='email' value={email} />
                    <div className={loginStyles.input_wrp}>
                      <label id="login_user" className={`${loginStyles.label}`}>
                          <input className={`${loginStyles.input}`} type="username" placeholder='Username' name='username' onChange={OnUsername} required/>
                      </label>
                      {validUsername.length > 0 && <ErrorText text={validUsername} />}
                    </div>

                    <div className={loginStyles.input_wrp}>
                      <label id='login_submit' className={loginStyles.label}>
                          <input className={loginStyles.input} type="password" placeholder='Password' name='password' id='login_pwd' required/>
                      </label>
                      {validPassword.length > 0 && <ErrorText text={validPassword} />}
                    </div>

                    <div className={loginStyles.input_wrp}>
                      <label id='login_submit' className={loginStyles.label}>
                          <input className={loginStyles.input} type="password" placeholder='Confirm Password' name='passwordconfirmation' id='login_pwd' required/>
                      </label>
                      {validPassword.length > 0 && <ErrorText text={validPassword} />}
                      {success.length > 0 && <ErrorText text={success} />}
                    </div>

                    <div className={`max-w-min m-auto ${loginStyles.signUpWrp}`}>
                    <SubmitButton onSubmit={OnSubmit} placeholder={"Sign Up"}/>
                    </div>

                    <div className={loginStyles.pwd_reset}>
                    <a href="/login"><p className={loginStyles.signup}>Already have an account? Sign in <span className='accent'>here</span></p></a>
                    </div>
                </form>
            </>
        }
      </FormBorder>
    </Border>
  )
}

export default Registration