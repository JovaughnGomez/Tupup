"use client"
import React, { useState } from 'react'
import styles from './change-password.module.css'
import InputBox from '@/app/components/InputBox'
import SubmitButton from "@/app/components/SubmitButton"
import ErrorText from '@/app/components/ErrorText'
import { useRouter } from 'next/navigation'

function ChangePasswordForm({csrfToken, email, resetToken}) {
    const router = useRouter();

    const [error, setError] = useState({})
    async function ChangePassword()
    {
        const form = document.getElementById("change_password");
        const formData = new FormData(form);
        const results = await fetch("/api/auth/changepassword", {
            method:"post",
            body: formData,
        });

        const res = await results.json();
        console.log(res);
        const errorResponse = {
            success: res.success,
        }

        setError({});

        if(res.success)
        {
            errorResponse.text = "Your password has been updated."
        } else {
            if(res.error)
               errorResponse.text = res.error;
        }

        setError(errorResponse);
    }

    async function ResetPassword()
    {
        const form = document.getElementById("change_password");
        const formData = new FormData(form);
        const results = await fetch("/api/auth/changepassword/reset", {
            method:"post",
            body: formData,
        });

        const res = await results.json();
        const errorResponse = {
            success: res.success,
        }

        setError({});
        if(res.success)
        {
            errorResponse.text = "Your password has been updated."
            setTimeout(() => {
                router.push("/login");
            }, 2000);
        } else {
            if(res.error)
               errorResponse.text = res.error;

            if(res.redirec)
                router.push(res.redirect);
        }

        setError(errorResponse);    
    }

    return (
        <div>
            <form id='change_password' action="" method='post' className={styles.changePasswordForm}>
                {csrfToken && 
                    <input type="hidden" name='csrfToken' value={csrfToken} />
                }

                { resetToken && 
                    <>
                        <input type="hidden" name='resetToken' value={resetToken} />
                        <input type="hidden" name='email' value={email} />
                    </>
                }
                <div className={styles.changePasswordWrp}>  
                    {!resetToken && 
                        <div className={styles.inputWrp}>
                            <div className={styles.formLabel}>Current Password</div>
                            <InputBox name={"current_password"} type='password'/>
                        </div>
                    } 

                    <div className={styles.inputWrp}>
                        <div className={styles.formLabel}>New Password</div>
                        <InputBox name={"new_password"} type='password'/>
                    </div>
                    
                    <div className={styles.inputWrp}>
                        <div className={styles.formLabel}>Confirm Password</div>
                        <InputBox name={"confirm_password"} type='password'/>
                    </div>
                </div>

                <div className={styles.error}>
                    {error.text && <ErrorText text={error.text} successful={error.success} font='text-sm'/> }
                </div>

                <div className={styles.submitBtn}>
                    <SubmitButton onSubmit={resetToken ? ResetPassword : ChangePassword}/>
                </div>
            </form>
        </div>
    )
}

export default ChangePasswordForm