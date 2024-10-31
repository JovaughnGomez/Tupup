"use client"
import { Black_Ops_One } from 'next/font/google'
import React, { useState } from 'react'
import styles from './pay.module.css'
import Radio from '@/app/components/Radio';
import { ConvertDateToString } from '@/app/lib/clientUtils'
import PaymentConfirmation from './confirmation/PaymentConfirmation';
import SubmitButton from '@/app/components/SubmitButton'

export const blackOpsOne = Black_Ops_One({
    subsets: ['latin'],
    display: 'swap',
    weight:['400'],
    variable: '--font-blackOpsOne',
  })

function PaymentForm({ transaction, expiration }) {
    const [agree, setAgree] = useState(false);
    const [successful, setSuccessful] = useState(false);
    const expirationAsString = ConvertDateToString(expiration);
    const createdAt = ConvertDateToString(transaction.createdAt);
    const total = parseFloat(transaction.value).toFixed(2);

    function ToggleAgreement(status)
    {
        setAgree(status);
    }

    async function PurchaseProduct()
    {
        const form = document.getElementById('payment_form');
        const data = new FormData(form);

        const res = await fetch("/api/pay", {
            method:"post",
            body: data,
        });

        const results = await res.json();
        !setSuccessful(results.success);
        if(results.success)
            transaction = results.transaction;
    }

    return (
    <>
    { successful ? (
        <PaymentConfirmation transaction={transaction} />
    ) : (
        <div className={styles.contentWrp}>
            <div className={styles.innerWrp}>
                <h2 className={styles.heading}>Payment Information</h2>
                <div className={`border ${styles.paymentFromWrp}`}>
                    <div className={styles.titleWrp}>
                        <h2 className={styles.title}>Payment From</h2>
                    </div>
                    <div className={styles.paymentDetails}>
                        <div className={styles.label}>Payment ID</div>
                        <div className={`font-bold ${styles.value}`}>{transaction.id}</div>
                        <div className={styles.label}>Created</div>
                        <div className={styles.value}>{createdAt}</div>
                        <div className={styles.label}>Expires</div>
                        <div className={styles.value}>{expirationAsString}</div>
                        <div className={styles.label}>Total</div>
                        <div className={`accent ${styles.value} font-bold`}>TTD ${total} </div>
                    </div>
                </div>
                <div className={styles.paymentFunc}>
                    <form id='payment_form' method='post' className={`${styles.paymentWithWrp}`} action='/api/pay' >
                        <div className="border">
                            <input type="hidden" name='payment_method' value={"wallet"} />
                            <input type="hidden" name='product_discount_code'/>
                            <input type="hidden" name='transactionId' value={transaction.id} />
                            <div className={styles.titleWrp}>
                                <h2 className={styles.title}>Payment With</h2>
                                <h1 className={`uppercase font-bold accent underline ${blackOpsOne.className} text-lg`}>Game Haven Wallet</h1>
                                {/* <Image 
                                    width={55}
                                    height={30}
                                    src={"/img/pay/apple_pay.webp"}
                                    alt='payment_method'
                                /> */}
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
                            <div className={styles.payBtn}>
                                <SubmitButton onSubmit={PurchaseProduct} propInteractbale={agree} rounded={false} fullWidth={true} placeholder='Pay Now' />
                            </div>
                        </div>

                        <div className={styles.termsWrp}>
                            <Radio name={"agreement"} callback={ToggleAgreement}/>
                            <div className={styles.terms}>
                                By proceeding, I acknowledge I have read and agreed to &nbsp;
                                <a target='_blank' href="/document/termsofsale">Terms of Sale</a>,
                                <a target='_blank' href="/document/termsofuse"> Terms of Use</a>&nbsp; & &nbsp;
                                <a target='_blank' href="/document/privacypolicy">Privacy Policy</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )}
    </>
  )
}

export default PaymentForm