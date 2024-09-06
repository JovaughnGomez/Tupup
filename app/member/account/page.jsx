import React from 'react'
import Link from 'next/link';
import styles from './account.module.css'
import ProfileIcon from '@/app/components/ProfileIcon';
import SubmitButton from '@/app/components/SubmitButton';
import Icon from '@mdi/react';
import { mdiAccountCog, mdiChevronRight, mdiCurrencyUsd} from '@mdi/js';

function page() {
  return (
    <>
        <h1>My Wallet</h1>
        <div className={styles.contentWrp}>
            <div className={`border ${styles.userInfo}`}>
                <div className={styles.info}>
                    <ProfileIcon />
                    <h1>Paper Arcade</h1>
                    <Link href="/member/manage" className={styles.manageAccount}>
                        <Icon path={mdiAccountCog} size={1} />
                        <span>Edit</span>
                    </Link>
                </div>
                <div className={styles.email}>
                    <span>Email</span>
                    <p>jovaughn499@gmail.com</p>                    
                </div>
            </div>

            <div className={`border ${styles.userOrders}`}>
                <div className={styles.header}>
                    <h3>My Orders</h3>
                    <Link href='/member/orders' className={styles.viewOrders}>
                        <p>All Orders</p>
                        <Icon path={mdiChevronRight} size={1} />
                    </Link>
                </div>

                <ul className={styles.orderInfo}>
                    <li> <div className={styles.stat} data="0"><span>Sending</span></div>  </li>
                    <li> <div className={styles.stat} data="0"><span>Completed</span></div> </li>
                    <li> <div className={styles.stat} data="0"> <span>Refunded</span></div> </li>
                </ul>
            </div>

            <div className={`border ${styles.userWallet}`}>
                <div className={styles.header}>
                    <h3>My Wallet</h3>
                    <Link href='/member/transactions' className={styles.viewOrders}>
                        <p>View History</p>
                        <Icon path={mdiChevronRight} size={1} />
                    </Link>
                </div>

                <div className={styles.topUp}>  
                    <div className={styles.balance}>
                        <Icon path={mdiCurrencyUsd} size={1.2} />
                        <span>0.00</span>
                    </div>     
                    <Link href='/member/topup' className={styles.topUpBtn}>
                        <SubmitButton classes='w-24 p-2' placeholder='Top Up' />
                    </Link>
                </div>
            </div>
        </div>
    </>
  )
}

export default page