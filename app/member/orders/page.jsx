import React from 'react'
import Script from 'next/script'
import styles from './orders.module.css'
import Order from '@/app/components/Order'
import Icon from '@mdi/react'
import { mdiMagnify } from '@mdi/js'
import NoReults from '@/app/components/NoResults'

function page() {
    const orders = [];
    const order = 
    {
        id: "O6892652",
        paymentId: "P8561036568",
        product: "Freefire",
        productType: "Freefire Membership",
        price: 5.12,
        quantity: 2,
        date: Date.now(),
        status: "Completed",
    }
    orders.push(order);
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
                                <li><a href="orders?status=sending">Sending</a></li>
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
                    <ul>
                        {orders.length > 0 ? 
                            (
                                <li className={`${styles.order}`}> 
                                    {orders.map((order, index) => <Order order={order} key={index}/> )}
                                </li>
                            )   :   (
                                <NoReults text="No orders matched" />
                            )
                        }
                    </ul>
                </div>
            </div>
        </div>
        <Script src='/js/orders.js' />
    </>
  )
}

export default page