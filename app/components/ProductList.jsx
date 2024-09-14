import React from 'react'
import styles from '@/public/css/ProductList.module.css'
import Image from 'next/image'

function ProductList({ categories=[] }) {

    return (
    <div className={styles.inner}>
        <div className={`border ${styles.sidebar}`}>
            <p>Information about the top up procedure goes here.</p>
        </div>
        <ul id='productListWrp' className={styles.productListWrp}>
            {
                categories.map((product, index) => 
                    <li key={index} className={styles.product}>
                        <a href={`/product/${product.name}`}>
                            <Image 
                                width={138}
                                height={138}
                                src={product.icon}
                                className={styles.productIcon}
                            />
                            <span className={styles.productName}>{product.displayName}</span>
                        </a>
                    </li>
                )
            }
        </ul>
    </div>
    )
}

export default ProductList