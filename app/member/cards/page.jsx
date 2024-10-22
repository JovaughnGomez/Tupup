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

    let giftcards = [];
    const results = await GetGiftcardHistory();
    if(results.success)
        giftcards = results.giftcards;
    
    return (
    <>
        <h1>My Cards</h1>
        <div className={styles.contentWrp}>
            { giftcards && giftcards.length > 0 ?
                ( 
                    <ul className={styles.ugh}>
                        { giftcards.map((card, index) => <Card card={card} key={index}/> ) }
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