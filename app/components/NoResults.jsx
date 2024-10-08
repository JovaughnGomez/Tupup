import React from 'react'
import styles from '@/public/css/NoResults.module.css'
import Image from 'next/image'

function NoReults({ text="" }) {
  return (
    <div className={styles.wrapper}>
        <Image 
            className={styles.img}
            src={"/img/no_results.png"}
            width={375}
            height={375}
            alt='No Results Found'
        />
        <p>{text}</p>
    </div>
  )
}

export default NoReults