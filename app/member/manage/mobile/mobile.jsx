import React from 'react'
import styles from './mobile.module.css'
import InputBox from '@/app/components/InputBox'


function page() {

    return (
    <>
        <h1>Mobile Phone</h1>
        <div>
            <form id='change_password' action="" method='post' className={styles.changePasswordForm}>
                <input type="hidden" name='csrf' value={""} />
                <div className={styles.changePasswordWrp}>   
                    <div className={styles.formLabel}>Phone Number</div>
                    <div className={styles.sendCodeWrp}>
                        <InputBox label='+1' name={"number"} number={"mobile"} />
                        <div className={styles.btn}>Send Verification Code</div>
                    </div>
                </div>
            </form>
        </div>
    </>
  )
}

export default page