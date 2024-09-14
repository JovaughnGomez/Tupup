import React from 'react'
import styles from '@/public/css/Card.module.css'
import Image from 'next/image'
import { ConvertDateToString } from '../lib/utils';
import RegularButton from './RegularButton';

async function Card({card}) {
    const dateAsString = await ConvertDateToString(card.dateDelivered);

    return (
        <div className={`border ${styles.cardWrp}`}>
            <div className={styles.cardHeader}>
                <div className={styles.orderDetails}>
                    <span className={styles.orderId}>{card.id}</span>
                    <span className={styles.deliveryTime}>{dateAsString}</span>
                </div>
            </div>
            <div className={styles.productWrp}>
                <div className={styles.productDetails}>
                    <Image 
                        className={styles.productIcon}
                        src={"/img/icons/psn_icon.webp"}
                        width={45}
                        height={45}
                    />

                    <div className={styles.productInfo}>
                        <span>{card.product}</span>
                        <span>{card.productType}</span>
                    </div>
                </div>
                <RegularButton classes={styles.productBtn} querySelector={styles.value} classToToggle={styles.visibility}/>
   
            </div>
            <div className={styles.cardInfo}>
                <div>
                    <h3>Serial:</h3>
                    <span className={`${styles.visibility} ${styles.value}`}> {card.serial} </span>
                </div>
                <div>
                    <h3>Pin: </h3>
                    <span className={`${styles.visibility} ${styles.value}`}> {card.pin} </span>
                </div>
            </div>
        </div>
    )
}

export default Card