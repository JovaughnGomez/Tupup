"use client"
import React, { useState } from 'react'
import styles from '@/public/css/Card.module.css'
import Image from 'next/image'
import RegularButton from './RegularButton';
import { ConvertDateToString } from '../lib/clientUtils';

function Card({ card }) {
    const [show, setShow] = useState(false)

    const dateAsString = ConvertDateToString(card.deliveredAt);
    const product = card.order.product;
    const code = card.code.split(":")[1];

    function TogglePinVisibility()
    {
        setShow(!show);
    }
    
    return (
        <li className={`border ${styles.cardWrp}`}>
            <div className={styles.cardHeader}>
                <div className={styles.orderDetails}>
                    <span className={`accent ${styles.orderId}`}>{card.order.id}</span>
                    <span className={styles.deliveryTime}>{dateAsString}</span>
                </div>
            </div>
            <div className={styles.productWrp}>
                <div className={styles.productDetails}>
                    <div className={styles.iconWrp}>
                        <Image 
                            className={styles.productIcon}
                            src={product.icon}
                            alt='product icon'
                            width={45}
                            height={45}
                        />
                    </div>

                    <div className={styles.productInfo}>
                        <span>{product.name}</span>
                        <span>{product.productCategory.displayName}</span>
                    </div>
                </div>
                <RegularButton classes={styles.productBtn} querySelector={styles.value} classToToggle={styles.visibility} callback={TogglePinVisibility}/>
   
            </div>
            <div className={styles.cardInfo}>
                {/* <div>
                    <h3>Serial:</h3>
                    <span className={`${styles.visibility} ${styles.value}`}> {card.serial} </span>
                </div> */}
                <div>
                    <h3>Pin: </h3>
                    <span className={`${!show ? styles.visibility : ""} ${styles.value}`}> {code} </span>
                </div>
            </div>
        </li>
    )
}

export default Card