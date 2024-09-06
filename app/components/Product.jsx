"use client"
import React from 'react'
import Image from 'next/image'
import styles from '@/public/css/Product.module.css'

function Product({data}) {
  return (
    <div className={`group ${styles.wrapper}`}>
        <Image 
            width={50}
            height={50}
            src={data.icon}
            className={`${styles.img} group-hover:scale-110 block`}
        />

        <div className={styles.info}>
            <p className={styles.productName}> {data.name} </p>
            <p className={styles.productRegion}> {data.region} </p>
        </div>
    </div>
  )
}

export default Product