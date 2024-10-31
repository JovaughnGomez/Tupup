import React from 'react'
import styles from '@/public/css/ProductDisplay.module.css'
import Icon from '@mdi/react';
import { mdiChevronRight } from '@mdi/js';
import Image from 'next/image';

function ProductDisplay({ id, name, products=[], seeMorePath="" }) {

  return (
    <div id={id} className={`slide ${styles.productWrapper}`}>
        <div className={styles.innerProductWrapper}>
          <div className={styles.header}>
            <h1 className={"font-bold mb-4"}>{name}</h1>
            <a href={seeMorePath} target='_blank'><Icon className="font-bol text-white" path={mdiChevronRight} size={1} /></a>
          </div>
          <div className={styles.products}>

            {products.map((product, index) => 
              <div className={`group cursor-pointer ${styles.wrapper}`} key={index}>
                <Image 
                    width={50}
                    height={50}
                    src={product.icon}
                    className={`${styles.img} group-hover:scale-110 block`}
                    alt='product icon'
                />

                <div className={styles.info}>
                    <p className={styles.productName}> {product.name} </p>
                    <p className={styles.productRegion}> {product.region} </p>
                </div>
              </div>
            )}
          </div>
        </div>
    </div>
  )
}

export default ProductDisplay