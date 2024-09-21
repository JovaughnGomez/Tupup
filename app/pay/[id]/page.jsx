import React from 'react'
import styles from './pay.module.css'
import Image from 'next/image'
import { ConvertDateToString } from '@/app/lib/clientUtils'

function page({params}) {
    const { id } = params;

    return (
    <div className={styles.contentWrp}>
        <div className={styles.innerWrp}>
            <h2 className={styles.heading}>Payment Information</h2>
            <div className={`border ${styles.paymentFromWrp}`}>
                <div className={styles.titleWrp}>
                    <h2 className={styles.title}>Payment From</h2>
                </div>
                <div className={styles.paymentDetails}>
                    <div className={styles.label}>Payment Number</div>
                    <div className={`font-bold ${styles.value}`}>{id}</div>
                    <div className={styles.label}>Created</div>
                    <div className={styles.value}>{ConvertDateToString(Date.now())}</div>
                    <div className={styles.label}>Expiry</div>
                    <div className={styles.value}>{ConvertDateToString(Date.now())}</div>
                    <div className={styles.label}>Total</div>
                    <div className={`accent ${styles.value} font-bold`}>TTD $2.07</div>
                </div>
            </div>

            <div className={styles.paymentFunc}>
                <form method='post' className={`border ${styles.paymentWithWrp}`}>
                    <input type="hidden" name='payment_method' value={"wallet"} />
                    <input type="hidden" name='product_discount_code'/>
                    <div className={styles.titleWrp}>
                        <h2 className={styles.title}>Payment With</h2>
                        <Image 
                            width={55}
                            height={30}
                            src={"/img/pay/apple_pay.webp"}
                        />
                    </div>
                    <div className={styles.feesWrp}>
                        <div className={styles.label}>Service Fees</div>
                        <div className={styles.fees}>
                            <div className={`font-bold ${styles.value}`}>TTD $1.00</div>
                            <div className={styles.serviceDiscount}>TTD $0.00</div>
                        </div>
                        <div className={styles.label}>Total</div>
                        <div className={`font-bold accent ${styles.value}`}>TTD $100</div>
                    </div>
                    <label className={styles.payNowWrp}>
                        <span>PAY NOW</span>
                        <input className='hideInput' type="submit" name="pay_now" id="pay_now" />
                    </label>
                </form>
                <div className={styles.terms}>
                    By proceeding, I acknowledge I have read and agreed to &nbsp;
                    <a target='_blank' href="/termsofsale">Terms of Sale</a>,
                    <a target='_blank' href="/termsofuse"> Terms of Use</a>&nbsp; & &nbsp;
                    <a target='_blank' href="/privacypolicy">Privacy Policy</a>
                </div>
            </div>
        </div>
    </div>
  )
}

export default page