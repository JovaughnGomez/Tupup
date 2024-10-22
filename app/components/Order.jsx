import React from 'react'
import styles from '@/public/css/Order.module.css'
import Image from 'next/image'
import { ConvertDateToString } from '../lib/utils'
import { CapitalizeWord } from '../lib/clientUtils';

async function Order({ transaction }) {
    const dateAsString = await ConvertDateToString(transaction.createdAt);
    const orders = transaction.orders;

    return (
        <div className={`border ${styles.orderWrp}`}>
            <div className={styles.orderHeader}>
                <div className={styles.paymentDetails}>
                    <div className={`${styles.idHolder} ${styles.paymentInfo}`}>
                        <h2 className={styles.productTitle}> Payment ID:</h2>
                        <span className={` ${styles.id} accent`}>{transaction.id}</span>
                    </div>
                    <span>{dateAsString}</span>
                </div>
                <div className={`accent ${styles.paymentCost}`}>
                    TTD $ { transaction.value.toFixed(2).toString() }
                </div>
            </div>

            {
                orders.map((order, index) => 
                <div key={index} className={styles.orderInfo}>
                    <div className={styles.orderInfoLeft}>
                        <div className={`${styles.idHolder} ${styles.orderId}`}>
                            <span className={` ${styles.id} accent`}>{order.id}</span>
                        </div>

                        <div className={styles.productInfo}>
                            <Image 
                                className={styles.orderImg}
                                src={order.product.icon}
                                width={65}
                                height={65}
                                alt='product icon'
                            />
                            <div className={styles.productDetail}>
                                <span>{transaction.product}</span>
                                <span>{transaction.productType}</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.orderInfoRight}>
                        <div className={styles.productCost}>
                            TTD ${order.product.price.toFixed(2).toString()}
                            <span className={styles.quantity}><span>x</span>{order.quantity}</span>
                        </div>
                        <div className={styles.orderStatus}>
                            <span className={CapitalizeWord(transaction.status)}>{CapitalizeWord(transaction.status)}</span>
                        </div>
                    </div>
                    </div>
            )}
        </div>
    )
}

export default Order