import React from 'react'
import styles from '@/public/css/Order.module.css'
import Image from 'next/image'
import { ConvertDateToString } from '../lib/utils'

async function Order({ order }) {
    const dateAsString = await ConvertDateToString(order.date);

    return (
        <div className={`border ${styles.orderWrp}`}>
            <div className={styles.orderHeader}>
                <div className={styles.paymentDetails}>
                    <h2 className={styles.productTitle}> Payment <span className='accent'>{order.paymentId}</span> </h2>
                    <span>{dateAsString}</span>
                </div>
                <div className={`accent ${styles.paymentCost}`}>
                    TTD $ {order.price * order.quantity}
                </div>
            </div>

            <div className={styles.orderInfo}>
                <div className={styles.orderInfoLeft}>
                    <div className={styles.orderId}>
                        <span className='accent'>{order.id}</span>
                    </div>

                    <div className={styles.productInfo}>
                        <Image 
                            className={styles.orderImg}
                            src={"/img/icons/freefire_icon.webp"}
                            width={65}
                            height={65}
                            alt='product icon'
                        />
                        <div className={styles.productDetail}>
                            <span>{order.product}</span>
                            <span>{order.productType}</span>
                        </div>
                    </div>
                </div>

                <div className={styles.orderInfoRight}>
                    <div className={styles.productCost}>
                        TTD ${order.price}
                        <span className={styles.quantity}><span>x</span> {order.quantity}</span>
                    </div>
                    <div className={styles.orderStatus}>
                        <span className={order.status}>{order.status}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Order