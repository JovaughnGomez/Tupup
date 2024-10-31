import React from 'react'
import styles from './cards.module.css'
import NoResults from '@/app/components/NoResults'
import Card from '@/app/components/Card'
import { GetGiftcardHistory } from '@/app/controllers/giftcardController';
import { GetCurrentUserFromMap } from '@/app/lib/auth';

async function page() {
    const currentUser = await GetCurrentUserFromMap();
    if(!currentUser)
        redirect("/login");

    let orders = [];
    const results = await GetGiftcardHistory();
    if(results.success)
        orders = results.orders;

    return (
    <>
        <h1>My Cards</h1>
        <div className={styles.contentWrp}>
            { orders && orders.length > 0 ?
                ( 
                    <ul className={styles.ugh}>
                        { orders.map((order, index) => <Card order={order} key={index}/> ) }
                    </ul>
                ) : (
                    <NoResults text='Card data unavailable'/>
                )
            }
        </div>
    </>
  )
}

export default page