import React from 'react'
import styles from './orders.module.css'
import Icon from '@mdi/react'
import { mdiMagnify } from '@mdi/js'

function page() {
  return (
    <>
        <h1>My Orders</h1>
        <div className={styles.contentWrp}>
            <div className={styles.innerWrp}>
                <div className={styles.filterWrp}>
                    <div className={styles.tabWrp}>
                        <ul>
                            <li><a href="/order/?status=all">All</a></li>
                            <li><a href="/order/?status=unsent">Waiting</a></li>
                            <li><a href="/order/?status=sending">Sending</a></li>
                            <li><a href="/order/?status=completed">Completed</a></li>
                            <li><a href="/order/?status=refunded">Refunded</a></li>
                        </ul>
                    </div>
                </div>
                <div className={`${styles.searchWrp}`}>
                    <form id='searchForm' className={styles.searchForm} action="/order/" method='get'>
                        <div className={styles.searchBoxWrp}>
                            <input className={styles.searchBox} type="search" placeholder='Search order ID, Product name'/>
                        </div>
                        <label className={styles.searchBtn}>
                            <Icon path={mdiMagnify} size={1} />
                        </label>
                    </form>
                </div>
            </div>
        </div>
    </>
  )
}

export default page