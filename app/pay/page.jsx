import React from 'react'
import styles from './pay.module.css'
import { ConvertDateToString } from '@/app/lib/clientUtils'
import { GetSessionFromCookies } from '@/app/lib/session';
import { FindTransactionById } from '@/app/controllers/transactionController';
import { redirect } from 'next/navigation';
import PaymentForm from './PaymentForm';

async function page({ searchParams }) {
    const { trade_id } = searchParams;

    const session = await GetSessionFromCookies();
    if(!session)
        redirect("/login");
    
    const results = await FindTransactionById(trade_id, session.userId);
    if(!results.success)
        redirect("/");
    
    const transaction = results.transaction;
    const expirationAsString = ConvertDateToString(results.expiration);
    const createdAt = ConvertDateToString(transaction.createdAt);
    const total = transaction.value.toFixed(2);

    return (
    <div className={styles.contentWrp}>
        <div className={styles.innerWrp}>
            <h2 className={styles.heading}>Payment Information</h2>
            <div className={`border ${styles.paymentFromWrp}`}>
                <div className={styles.titleWrp}>
                    <h2 className={styles.title}>Payment From</h2>
                </div>
                <div className={styles.paymentDetails}>
                    <div className={styles.label}>Payment ID</div>
                    <div className={`font-bold ${styles.value}`}>{trade_id}</div>
                    <div className={styles.label}>Created</div>
                    <div className={styles.value}>{createdAt}</div>
                    <div className={styles.label}>Expires</div>
                    <div className={styles.value}>{expirationAsString}</div>
                    <div className={styles.label}>Total</div>
                    <div className={`accent ${styles.value} font-bold`}>TTD ${total} </div>
                </div>
            </div>

            <PaymentForm transactionId={trade_id} total={total} />
        </div>
    </div>
  )
}

export default page