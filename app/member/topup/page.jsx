import React from 'react'
import Image from 'next/image'
import Script from 'next/script';
import styles from './topup.module.css'
import InputBox from '@/app/components/InputBox';
import { Calculate } from '@/app/lib/action';

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
                <h2 className={styles.heading}> Top-up via Phone Card</h2>
                <form className={styles.topUpForm} id='topup_form' action="/topup/" method='post'>
                    <label className={styles.voucherWrp} tabIndex={0}>
                        <div id='voucherWrp' className={`bmobileAlpha ${styles.voucherInnerWrp}`}>
                            <select id='voucherType' className={styles.dropdownMenu} name="voucherType" defaultValue="bmobile">
                                <option className={styles.dropdownOption} value="bmobile">Bmobile</option>
                                <option className={styles.dropdownOption} value="digicel">Digicel</option>
                            </select>
                            <input type="number" name="voucher" />
                        </div>
                    </label>

                    <label id='topupBtn' className={`bmobile ${styles.topupBtn}`}>
                        <span>TOP UP</span>
                        <input className='hideInput' type="submit"/>
                    </label>
                </form>
            </div>  
            <div className={`border ${styles.calculator}`}>
                <div><span className={styles.heading}>Calculator</span></div>
                <div className={styles.calculatorInput}>
                    <InputBox id={"calculator_voucher"} type="number" name={"calculator_voucher"} placeholder={"Voucher Value (e.g 15, 25)"}/>
                    <div id='calculator_btn' className={`${styles.calculateBtn}`}>
                        <span>Calculate</span>
                    </div>
                </div>
                <div id='calculator_stats' className={`hide ${styles.calculator_stats}`}>
                    <div className={styles.statsTitle}>Mobile Provider Fees</div>
                    <div></div>
                    <div className={styles.statLabel}>Vat(12.5%)</div>
                    <div id="calculator_vat" className={styles.statValue}></div>
                    <div className={styles.statsTitle}>{process.env.NEXT_PUBLIC_WEBSITE_NAME} Fees</div>
                    <div></div>
                    <div className={styles.statLabel}>Service Fee</div>
                    <div id="calculator_localFee" className={styles.statValue}>${process.env.NEXT_PUBLIC_TOPUP_FEE}</div>
                    <div className={styles.statTotal}>Money added to wallet</div>
                    <div id="calculator_total" className={`${styles.calculator_balance} ${styles.statValue}`}></div>
                </div>
            </div>  
            <Script src='/js/topup.js' />
        </div>
    </>
  )
}

export default page