"use client"
import React, { useState } from 'react'
import Border from '@/app/components/Border'
import FormBorder from '@/app/components/FormBorder'
import SubmitButton from '@/app/components/SubmitButton'
import InputBox from '@/app/components/InputBox'
import styles from '@/public/css/login.module.css'
import ErrorText from '@/app/components/ErrorText'
import ChangePasswordForm from '../member/manage/change-password/ChangePasswordForm'
import { useSearchParams } from 'next/navigation'
import loginStyles from '@/public/css/login.module.css'

function PasswordResetPage() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState({});
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const emailFromURL = searchParams.get("email");
    const expired = searchParams.get("expired");

    async function RequestPasswordReset()
    {
        const formData = new FormData();
        formData.set("email", email);

        const res = await fetch('/api/auth/resetpassword', {
            method:"post",
            headers: {
                'Content-Type': 'text/plain',
            },
            body: email,
        });

        const results = await res.json();

        setError({
            success: results.success,
            text: results.error,
        });
    }

    function OnChange(email)
    {
        setEmail(email);
    }

    return (
        <Border classes='register_login_form'>
            <FormBorder classes='formBorderDefault' mainClasses='register_login_form_wrp'>
            {!token &&
                <>
                    <h2 className={`font-bold ${styles.registerTitle}`}>RESET PASSWORD</h2>
                    <InputBox name={email} placeholder={"Email"} onChange={OnChange}/>
                    { error.text && <ErrorText text={error.text} successful={error.success} /> }
                    <div className={` mt-5 ${styles.submitWrp} `} >
                        <SubmitButton onSubmit={RequestPasswordReset} fullWidth={true} placeholder='RESET PASSWORD'/>
                    </div>
                </>
            }

            { expired &&
                <>
                    <h2 className={`font-bold accent ${loginStyles.registerTitle}`}>EXPIRED!</h2>
                    <div>
                        Unfortunately, the sign-up link you used has expired. This may happen if you did not complete your registration within the given timeframe. <br />
                        To sign up again, please return to the <a href="/register" className='accent underline'>Sign-Up</a> Page

                    </div>
                </>
            }
            
            {(token && !expired) &&
                <>
                    <ChangePasswordForm resetToken={token} email={emailFromURL}/>
                </>
            }
            </FormBorder>
        </Border>
    )
}

export default PasswordResetPage