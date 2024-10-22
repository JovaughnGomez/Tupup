"use client"

import React from 'react'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import loginStyles from "@/public/css/login.module.css";
import Border from '@/app/components/Border'
import FormBorder from '@/app/components/FormBorder'
import SubmitButton from '@/app/components/SubmitButton'
import ErrorText from '@/app/components/ErrorText';
import OAuthComponent from '../components/OAuthComponent';

function register() {
  const router = useRouter();
  const [success, setSuccess] = useState("");
  const [validUsername, setUsername] = useState("");
  const [validEmail, setEmail ] = useState("");
  const [validPassword, setPassword] = useState("");

  async function OnSubmit(e)
  {
    const form = document.getElementById('registerForm');
    const data = new FormData(form);
    
    const res = await fetch("/api/auth/register", {
      method:'POST',
      body: data
    });

    const response = await res.json();

    if(res.status == 200)
    {
      router.push("/");
    } else {
      setUsername("");
      setEmail("");
      setPassword("");
      setSuccess("");

      if(response.error !== undefined)
        setSuccess(response.error);
      
      if(response.username !== undefined)
        setUsername(response.username);

      if(response.email !== undefined)
        setEmail(response.email);

      if(response.password !== undefined)
        setPassword(response.password);
    }
  }

  return (
    <Border classes='register_login_form'>
      <FormBorder classes='formBorderDefault' mainClasses='register_login_form_wrp'>
        <form className={loginStyles.login_form} action="post" id='registerForm'>
          <h2 className='font-bold'>Sign Up</h2>
          <div className={loginStyles.input_wrp}>
            <label id="login_user" className={`${loginStyles.label}`}>
              <input className={loginStyles.input} type="username" placeholder='Username' name='username' required/>
            </label>
          </div>
          {validUsername.length > 0 && <ErrorText text={validUsername} />}

          <div className={loginStyles.input_wrp}>
            <label id="login_user" className={loginStyles.label}>
              <input className={loginStyles.input} type="email" placeholder='Email' name='email' required/>
            </label>
          </div>
          {validEmail.length > 0 && <ErrorText text={validEmail} />}

          <div className={loginStyles.input_wrp}>
            <label id='login_submit' className={loginStyles.label}>
              <input className={loginStyles.input} type="password" placeholder='Password' name='password' id='login_pwd' required/>
            </label>
          </div>
          {validPassword.length > 0 && <ErrorText text={validPassword} />}

          <div className={loginStyles.input_wrp}>
            <label id='login_submit' className={loginStyles.label}>
              <input className={loginStyles.input} type="password" placeholder='Confirm Password' name='passwordconfirmation' id='login_pwd' required/>
            </label>
          </div>
          {validPassword.length > 0 && <ErrorText text={validPassword} />}
          {success.length > 0 && <ErrorText text={success} />}

          <div className={`max-w-min m-auto ${loginStyles.signUpWrp}`}>
            <SubmitButton onSubmit={OnSubmit} placeholder={"Sign Up"}/>
          </div>

          <div className={loginStyles.pwd_reset}>
            <a href="/login"><p className={loginStyles.signup}>Already have an account? Sign in <span className='accent'>here</span></p></a>
          </div>
        </form>
        <div className={loginStyles.oAuthContainer}>
          <OAuthComponent />
        </div>
      </FormBorder>
    </Border>
  )
}

export default register