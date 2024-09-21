import React from 'react'
import styles from './change-password.module.css'
import InputBox from '@/app/components/InputBox'


function page() {

    return (
    <>
        <h1>CHANGE PASSWORD</h1>
        <div>
            <form id='change_password' action="" method='post' className={styles.changePasswordForm}>
                <input type="hidden" name='csrf' value={""} />
                <div className={styles.changePasswordWrp}>   
                    <div className={styles.formLabel}>Current Password</div>
                    <div className={styles.inputWrp}>
                        <InputBox name={"current_password"}/>
                    </div>
                    <div className={styles.formLabel}>New Password</div>
                    <div className={styles.inputWrp}>
                        <InputBox name={"new_password"}/>
                    </div>
                    <div className={styles.formLabel}>Confirm Password</div>
                    <div className={styles.inputWrp}>
                        <InputBox name={"confirm_password"}/>
                    </div>
                </div>
            </form>
        </div>
    </>
  )
}

export default page