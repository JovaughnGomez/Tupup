import React from 'react'
import styles from './paymentConfirmation.module.css'
import Image from 'next/image'
import SubmitButton from '@/app/components/SubmitButton'
import { ConvertDateToString } from '@/app/lib/clientUtils'

function PaymentConfirmation({ transaction }) {

    const createdAt = ConvertDateToString(transaction.createdAt);
    const completedAt = ConvertDateToString(transaction.completedAt);

    return (
    <div className={styles.wrapper}>
        <div className={styles.header}>
            <Image 
                width={30}
                height={30}
                alt='Green Checkmark'
                src={'/img/successful.png'}
            />
            <h1>Payment Successful</h1>
        </div>
        <div className={styles.informationWrp}>
            <div className={`${styles.row1}`}>
                <span className={styles.infoLabel}>Payment No.</span>
                <span className={styles.infoValue}>{transaction.id}</span>
            </div>
            <div className={styles.row}>
                <span className='infoLabel'>Created</span>
                <span className='infoValue'>{createdAt}</span>
            </div>

            <div className={styles.row}>
                <span className='infoLabel'>Paid</span>
                <span className='infoValue'>{completedAt}</span>
            </div>
            
            <div className={styles.row}>
                <div className='infoLabel'>Amount</div>
                <div className='infoValue'>TTD ${parseFloat(transaction.value).toFixed(2)}</div>
            </div>

            <div className={styles.row}>
                <div className='infoLabel'>Service Fee</div>
                <div className='infoValue'>TTD ${0}.00</div>
            </div>

            <div className={styles.row}>
                <div className='infoLabel'>Total</div>
                <div className='infoValue accent'>TTD ${parseFloat(transaction.value).toFixed(2)}</div>
            </div>
        </div>
        <div className={styles.giftcardWrp}>
            <SubmitButton type='link' href='/member/cards' background='bmobile' rounded={false} placeholder='My Cards' />

            <div className={styles.backBtn}>
                <SubmitButton type='link' href='/' fullWidth={true} rounded={false} placeholder='Home' />
            </div>
        </div>
    </div>
  )
}

export default PaymentConfirmation