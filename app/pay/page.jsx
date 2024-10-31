import React from 'react'
import { GetSessionFromCookies } from '@/app/lib/session';
import { FindTransactionById } from '@/app/controllers/transactionController';
import { redirect } from 'next/navigation';
import PaymentForm from './PaymentForm';
import { SerializeTransactionsForUser } from '@/data/transaction-dto';

async function page({ searchParams }) {
    const { trade_id } = searchParams;

    const session = await GetSessionFromCookies();
    if(!session)
        redirect("/login");
    
    const results = await FindTransactionById(trade_id, session.userId);
    if(!results.success)
        redirect("/");

    const transaction = await SerializeTransactionsForUser(results.transaction);
    console.log(transaction);

    return (
    <>
        <PaymentForm transaction={transaction} expiration={results.expiration} />
        {/* <div className={styles.contentWrp}>
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
        </div> */}
    </>
  )
}

export default page