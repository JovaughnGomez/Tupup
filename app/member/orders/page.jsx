import React from 'react'
import Script from 'next/script'
import styles from './orders.module.css'
import Order from '@/app/components/Order'
import Icon from '@mdi/react'
import { mdiMagnify } from '@mdi/js'
import NoReults from '@/app/components/NoResults'
import { GetCurrentUserFromMap } from '@/app/lib/auth'
import { GetOrderHistory } from '@/app/controllers/orderController'

async function page() {
    const currentUser = await GetCurrentUserFromMap();
    if(!currentUser)
        redirect("/login");

    let transactions = [];
    const results = await GetOrderHistory();
    if(results.success)
        transactions = results.transactions;
    
    return (
    <>
        <h1>My Orders</h1>
        <div className={styles.contentWrp}>
            <div className={styles.innerWrp}>
                <div className={styles.searchFilterWrp}>
                    <div className={styles.filterWrp}>
                        <div className={styles.tabWrp}>
                            <ul>
                                <li><a href="orders?status=all">All</a></li>
                                <li><a href="orders?status=unsent">Waiting</a></li>
                                <li><a href="orders?status=sending">Processing</a></li>
                                <li><a href="orders?status=completed">Completed</a></li>
                                <li><a href="orders?status=refunded">Refunded</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className={`${styles.searchWrp}`}>
                        <form id='searchForm' className={styles.searchForm} action="/order/" method='get'>
                            <div className={styles.searchBoxWrp}>
                                <input className={styles.searchBox} type="search" placeholder='Search order ID, Product name'/>
                            </div>
                            <label className={styles.searchBtn}>
                                <Icon path={mdiMagnify} size={1} />
                            </label>
                        </form>
                    </div>
                </div>
                <div className={styles.ordersWrp}>
                {transactions.length > 0 ? 
                    (
                        <ul className={`${styles.transactionsList}`}> 
                            {transactions.map((transaction, index) => <Order transaction={transaction} key={index}/> )}
                        </ul>
                    )   :   (
                        <NoReults text="No orders matched" />
                    )
                }
                </div>
            </div>
        </div>
        <Script src='/js/orders.js' />
    </>
  )
}

export default page