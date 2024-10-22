"use client"
import React from 'react'
import Image from 'next/image';
import styles from './checkout.module.css'
import { CalculateFinalPrice, CalculateFullPrice } from '@/app/lib/clientUtils';

function OrderCheckout({ order, csrfToken }) {
    order = JSON.parse(order);
    
    const orderAsJson = JSON.stringify([{id: order.id}]);

    const product = order.product;
    const category = product.productCategory;

    const fullPrice = CalculateFullPrice(product, order.quantity);
    const finalPrice = CalculateFinalPrice(product, order.quantity);
    const discount = fullPrice - finalPrice;

  return (
    <div className={styles.wrapper}>
        <div className={styles.inner}>
            <div className={styles.contentWrp}>
                <div className={styles.heading}> <h1>Checkout</h1> </div>
                <div className={styles.contentInner}>
                    <ul className={styles.productsWrp}>
                        {/* { products.map((product, index) =>  */}
                            <li className={`border ${styles.product}`}>
                                <h2 className={styles.title}>{category.displayName}</h2>
                                <div className={styles.productInfo}>
                                    <div className={styles.productDesc}>
                                        <Image 
                                            width={50}
                                            height={50}
                                            src={product.icon}
                                            alt={`Product Poster`}
                                        />
                                        <div className={styles.name}>{product.name}</div>
                                    </div>
                                    <div className={styles.productCost}>
                                        <div className={styles.quantity}>x {order.quantity}</div>
                                        <div className={styles.subtotal}>$ {parseFloat(product.price).toFixed(2)}</div>
                                    </div>
                                </div>
                            </li>
                            {/* ) */}
                        {/* } */}
                    </ul>
                    <div className={`${styles.paymentWrp}`}>
                        <div className={`border ${styles.paymentInfo}`}>
                            <h2 className={styles.title}>Payment Details</h2>
                            <div className={styles.paymentDetails}>
                                <div className={styles.detailWrp}>
                                    <div className={styles.detailLabel}>Total Before Discounts</div>
                                    <div className={styles.detailValue}>TTD $ {fullPrice} </div>
                                </div>
                                <div className={styles.detailWrp}>
                                    <div className={styles.detailLabel}>Discount</div>
                                    <div className={`accent ${styles.detailValue}`}>- TTD$ {discount.toFixed(2)} </div>
                                </div>
                            </div>
                        </div>
                        <form className={`border ${styles.payment}`} method='post' action={`/api/cart/order_checkout`}>
                            <input type="hidden" name='csrfToken' value={csrfToken} />
                            <input type="hidden" name='orders' value={orderAsJson} />
                            <span className={styles.totalCost}>TTD $ {finalPrice}</span>
                            <label className={styles.payBtn} href="">
                                <input type="submit" className='hideInput'/>
                                <span>PAY NOW</span>
                            </label>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default OrderCheckout