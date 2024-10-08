import React from 'react'
import Image from 'next/image'
import styles from '@/public/css/OrderDetail.module.css'

function Order({order}) {
    
    return (
    <div className={styles.orderWrp}>
        <div className={styles.orderHeader}>
            <Image 
                className={styles.orderImg}
                src={"/img/icons/freefire_icon.webp"}
                width={65}
                height={65}
                alt='product_icon'
            />
            <div className={styles.productInfo}>
                <h2 className={styles.productTitle}> {order.product} </h2>
                <span>{order.productType}</span>
            </div>
        </div>
        
        <div className={styles.orderDetails}>
            <div className={styles.detailWrp}>
                <div className={styles.detailInfo} data-product="Order No.">
                    {order.id}
                </div>
            </div>
            <div className={styles.detailWrp}>
                <div className={styles.detailInfo} data-product="Product">
                    {order.product}
                </div>
            </div>
            <div className={styles.detailWrp}>
                <div className={styles.detailInfo} data-product="Product Type">
                    {order.productType}
                </div>
            </div>
            <div className={styles.detailWrp}>
                <div className={styles.detailInfo}  data-product="Price">
                    $ {order.price}
                </div>
            </div>
            <div className={styles.detailWrp}>
                <div className={styles.detailInfo} data-product="Quantity">
                    {order.quantity}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Order