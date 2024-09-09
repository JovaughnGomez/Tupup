import React from 'react'
import styles from './cards.module.css'
import NoResults from '@/app/components/NoResults'
import Card from '@/app/components/Card'

function page() {
    const cards = [];
    const card = {
        id: "C6892652",
        paymentId: "P8561036568",
        product: "Playstation Network Card",
        productType: "$10 USD PSN",
        dateDelivered: Date.now(),
        serial:"1234-5678-9012",
        pin:"ABCD-1234-EFGH",
    }

    cards.push(card);
    
    return (
    <>
        <h1>My Cards</h1>
        <div className={styles.contentWrp}>
            <ul>
                { cards && cards.length > 0 ?
                    ( 
                        <li className={`${styles.card}`}> 
                            {cards.map((card, index) => <Card card={card} key={index}/> )}
                        </li>
                    ) : (
                        <NoResults text='Card data unavailable'/>
                    )
                }
            </ul>
        </div>
    </>
  )
}

export default page