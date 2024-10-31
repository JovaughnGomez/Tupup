"use client"
import React, { useState } from 'react'
import styles from '@/public/css/Card.module.css'
import Image from 'next/image'
import { ConvertDateToString } from '@/app/lib/clientUtils';

function Card({ order }) {
    const [show, setShow] = useState(false)
    const [visiblePins, setVisiblePins] = useState({})

    const dateAsString = ConvertDateToString(order.completedAt, true);
    const product = order.product;

    function TogglePinVisibility()
    {
        setShow(!show);
    }

    function ToggleVisiblePin(id)
    {
        setVisiblePins((prev) => ({
            ...prev,
            [id]: !prev[id], // Toggle visibility for the specific giftcard ID
          }));

    }
    
    return (
        <li className={`border ${styles.cardWrp}`}>
            <div className={styles.cardHeader}>
                <div className={styles.orderDetails}>
                    <span className={`accent ${styles.orderId}`}>{order.id}</span>
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
   
            </div>
            <div className={styles.cardList}>
                {order.giftcards.map((giftcard, index) => 
                    <div key={index} className={styles.cardInfo}>
                        {/* <div>
                            <h3>Serial:</h3>
                            <span className={`${styles.visibility} ${styles.value}`}> {card.serial} </span>
                            </div> */}
                            <div className={styles.cardInnerPin}>
                                <h3>Pin: </h3>
                                <span className={`${visiblePins[giftcard.code] ? "" : styles.hide } ${styles.value}`}> {giftcard.code.split(":")[1]} </span>
                            </div>
                            <span className={styles.showBtn} onClick={(e) => ToggleVisiblePin(giftcard.code)}>Show</span>
                    </div>
                )}
            </div>
        </li>
    )
}

export default Card