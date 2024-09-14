"use client"
import React from 'react'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from "../../public/css/login.module.css";
import {MdAccountCircle, MdLock, MdArrowForward} from 'react-icons/md'
import Border from '@/app/components/Border'
import FormBorder from '@/app/components/FormBorder'
import ErrorText from '@/app/components/ErrorText';

function page() {
  const router = useRouter();
  const [validEmail, setEmail ] = useState("");
  const [validPassword, setPassword] = useState("");
  const [success, setSuccess] = useState("");

  async function OnSubmit(e)
  {
    e.preventDefault();

    setEmail("");
    setPassword("");
    setSuccess("");

    const form = document.getElementById('loginForm');
    const data = new FormData(form);
    const res = await fetch("/api/login", {
      method:'POST',
      body: data
    });

    const response = await res.json();
    if(res.status == 200)
    {
      router.push("/");
    } else {
      console.log(response);
      if(response.error !== undefined)
        setSuccess(false);
        
      if(response.password !== undefined)
        setPassword(response.password);
      
      if(response.email !== undefined)
        setEmail(response.email);
    }
  }

  return (
    <Border classes='register_login_form'>
      <FormBorder classes='formBorderDefault' mainClasses='register_login_form_wrp'>
            <form id='loginForm' className={styles.login_form} action="post">
              <h2 className='font-bold'>Sign In</h2>
              <div className={styles.input_wrp}>
                <label id="login_user" className={styles.label}>
                  <input className={styles.input} type="email" placeholder='Email' name='email' id='login_email' required/>
                </label>
              </div>
              {validEmail.length > 0 && <ErrorText text={validEmail} />}

              <div className={styles.input_wrp}>
                <label id='login_submit' className={styles.label}>
                  <input className={styles.input} type="password" placeholder='Password' name='password' id='login_pwd' required/>
                  <label className={styles.submit_label} id='login_btn'>
                    <input type="submit" onClick={OnSubmit}/>
                    <MdArrowForward className={styles.whip} size={24} fill='white'/>
                  </label>
                </label>
              </div>
              {validPassword.length > 0 && <ErrorText text={validPassword} />}
              {success.length > 0 && <ErrorText text={success} />}

              <div className={styles.pwd_reset}>
                <a href="/register"><p className={styles.signup}>Don't have an account? Sign up <span className='accent'>here</span></p></a>
                <a href="forgotpassword" className="accent"><p className="accent">Forgot password?</p></a>
              </div>
            </form>
      </FormBorder>
    </Border>
  )
}

export default page