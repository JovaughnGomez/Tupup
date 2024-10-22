"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import styles from './pay.module.css'
import Radio from '@/app/components/Radio';

function PaymentForm({ transactionId="", total = 0 }) {
    const [agree, setAgree] = useState(false);

    function ToggleAgreement(status)
    {
        setAgree(status);
    }

    return (
    <div className={styles.paymentFunc}>
        <form method='post' className={`${styles.paymentWithWrp}`} action='/api/pay' >
            <div className="border">
                <input type="hidden" name='payment_method' value={"wallet"} />
                <input type="hidden" name='product_discount_code'/>
                <input type="hidden" name='transactionId' value={transactionId} />
                <div className={styles.titleWrp}>
                    <h2 className={styles.title}>Payment With</h2>
                    <Image 
                        width={55}
                        height={30}
                        src={"/img/pay/apple_pay.webp"}
                        alt='payment_method'
                    />
                </div>
                <div className={styles.feesWrp}>
                    <div className={styles.label}>Service Fees</div>
                    <div className={styles.fees}>
                        <div className={`font-bold ${styles.value}`}>TTD $1.00</div>
                        <div className={styles.serviceDiscount}>TTD $0.00</div>
                    </div>
                    <div className={styles.label}>Total</div>
                    <div className={`font-bold accent ${styles.value}`}>TTD ${total}</div>
                </div>
                <label className={`${!agree ? styles.inactiveBtn : ""} ${styles.payNowWrp}`}>
                    <span>PAY NOW</span>
                    <input className='hideInput' type="submit" id="pay_now"/>
                </label>
            </div>

            <div className={styles.termsWrp}>
                <Radio name={"agreement"} callback={ToggleAgreement}/>
                <div className={styles.terms}>
                    By proceeding, I acknowledge I have read and agreed to &nbsp;
                    <a target='_blank' href="/termsofsale">Terms of Sale</a>,
                    <a target='_blank' href="/termsofuse"> Terms of Use</a>&nbsp; & &nbsp;
                    <a target='_blank' href="/privacypolicy">Privacy Policy</a>
                </div>
            </div>
        </form>
    </div>
  )
}

export default PaymentForm