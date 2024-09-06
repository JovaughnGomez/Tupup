import React from 'react'
import styles from '@/public/css/ProductDisplay.module.css'
import Icon from '@mdi/react';
import Product from './Product';
import { mdiChevronRight } from '@mdi/js';

function ProductDisplay({ id, name, products=[], seeMorePath="" }) {

  return (
    <div id={id} className={`slide ${styles.productWrapper}`}>
        <div className={styles.innerProductWrapper}>
          <div className={styles.header}>
            <h1 className={"font-bold mb-4"}>{name}</h1>
            <a href={seeMorePath} target='_blank'><Icon className="font-bol text-white" path={mdiChevronRight} size={1} /></a>
          </div>
          <div className={styles.products}>
            {products.map((product, index) => <Product className={styles.product} data={product} key={index}/>)}
          </div>
        </div>
    </div>
  )
}

export default ProductDisplay