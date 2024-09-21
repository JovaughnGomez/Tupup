import React from 'react'
import styles from './checkout.module.css'
import Image from 'next/image';
import category from '@/data/category.json'


function page() {
    const order = {
        quantity: 2,
        total: 100,
        discount: 10,
    }

    const products = [];    
    const p1 = {
        name: "100 Diamonds",
        icon: "/img/icons/freefire_icon.webp",
        price: 15,
        salePrice: 0,
    }   
    const p2 = {
        name: "1060 Diamonds",
        icon: "/img/icons/freefire_icon.webp",
        price: 90,
        salePrice: 0,
    }   
    products.push(p1);
    products.push(p2);
     
    return (
    <div className={styles.wrapper}>
        <div className={styles.inner}>
            <div className={styles.contentWrp}>
                <div className={styles.heading}> <h1>Checkout</h1> </div>
                <div className={styles.contentInner}>
                    <ul className={styles.productsWrp}>
                        { products.map((product, index) => 
                            <li key={index} className={`border ${styles.product}`}>
                                <h2 className={styles.title}>{category.displayName}</h2>
                                <div className={styles.productInfo}>
                                    <div className={styles.productDesc}>
                                        <Image 
                                            width={50}
                                            height={50}
                                            src={product.icon}
                                        />
                                        <div className={styles.name}>{product.name}</div>
                                    </div>
                                    <div className={styles.productCost}>
                                        <div className={styles.quantity}>x {order.quantity}</div>
                                        <div className={styles.subtotal}>$ {order.quantity * product.price}</div>
                                    </div>
                                </div>
                            </li>
                            )
                        }
                    </ul>
                    <div className={`${styles.paymentWrp}`}>
                        <div className={`border ${styles.paymentInfo}`}>
                            <h2 className={styles.title}>Payment Details</h2>
                            <div className={styles.paymentDetails}>
                                <div className={styles.detailWrp}>
                                    <div className={styles.detailLabel}>Total Before Discounts</div>
                                    <div className={styles.detailValue}>$ {order.total} </div>
                                </div>
                                <div className={styles.detailWrp}>
                                    <div className={styles.detailLabel}>Discount</div>
                                    <div className={`accent ${styles.detailValue}`}>- TTD$ {order.discount} </div>
                                </div>
                            </div>
                        </div>
                        <div className={`border ${styles.payment}`}>
                            <span className={styles.totalCost}>TTD $ {order.total}</span>
                            <a className={styles.payBtn} href="">
                                <span>PAY NOW</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default page