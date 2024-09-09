import React from 'react'
import Image from 'next/image'
import Script from 'next/script';
import styles from './topup.module.css'

function page() {
    const value = 100;

    return (
    <>
        <h1>My Wallet</h1>
        <div className={styles.contentWrp}>
            <div className={`border ${styles.user_info}`}>
                <div className={styles.title}>
                    <Image 
                        src={"/img/tt_flag.webp"}
                        width={30}
                        height={10}
                    />
                    <span>Currency (TTD)</span>
                </div>
                <span className={styles.balance}>${value} TTD</span>
            </div>  

            <div className={`border ${styles.user_info}`}>
                <p className={styles.heading}> Top-up via Phone Card</p>
                <form className={styles.topUpForm} id='topup_form' action="/topup/" method='post'>
                    <label className={styles.voucherWrp} tabIndex={0}>
                        <div id='voucherType' className={`bmobileAlpha ${styles.voucherInnerWrp}`}>
                            <select className={styles.dropdownMenu} name="voucherType" defaultValue="bmobile">
                                <option className={styles.dropdownOption} value="bmobile">Bmobile</option>
                                <option className={styles.dropdownOption} value="digicel">Digicel</option>
                            </select>
                            <input type="number" name="voucher" />
                        </div>
                    </label>

                    <label id='topupBtn' className={`bmobile ${styles.topupBtn}`}>
                        <span>TOP UP</span>
                        <input type="submit"/>
                    </label>
                </form>
            </div>  
            <Script src='/js/topup.js' />
        </div>
    </>
  )
}

export default page