"use client"
import React from 'react'
import styles from '@/public/css/Transaction.module.css'
import Icon from '@mdi/react'
import { mdiChevronDown } from '@mdi/js'
import { ConvertDateToString } from '../lib/clientUtils'

function Transaction({ transaction, identifier }) {
    const dateAsString = ConvertDateToString(transaction.date);
    const transactionColor = transaction.transaction == "Bmobile" ? "Completed" : "Refunded";
    const symbol = transaction.amount >= 0 ? "+" : "-";
    let balanceColor = transaction.amount >= 0 ? "Completed" : "Refunded";

    function ToggleVisibility()
    {
        const trans = document.getElementById(`transaction${identifier}`);
        trans.classList.toggle(styles.visibility);

        const chevron = document.getElementById(`chevron${identifier}`);
        chevron.classList.toggle(styles.chevron);
    }

    return (
    <div className={`${styles.wrapper}`} onClick={ToggleVisibility}>
        <div className={styles.header}>
            <div className={styles.dateAt1000}>
                <span>{dateAsString}</span>
            </div>
            <div className={`${transactionColor} ${styles.transactionType}`}>
                <span>{transaction.transaction}</span>
            </div>
            <div className={styles.headerRight}>
                <span className={`${balanceColor}`}>{`${symbol} $${transaction.amount}`}</span>
                <div id={`chevron${identifier}`} className= {styles.chevronWrp}>
                    <Icon className={styles.chevron} path={mdiChevronDown} size={1} />
                </div>
            </div>
        </div>

        <div id={`transaction${identifier}`} className={`${styles.visibility} ${styles.transactionWrp}`}>
            <div className={`${styles.transactionInfo}`}>
                <div className={`${styles.value}`} data="Balanace">
                    <span>${transaction.balance}</span>
                </div>
                <div className={`${styles.value} ${styles.period}`} data="Date">
                    <span>{dateAsString}</span>
                </div>
            </div>
            <div className={styles.additionalInfo} data="Notes">
                <p dangerouslySetInnerHTML={{ __html: transaction.notes }} />
            </div>
        </div>
    </div>
    )
}

export default Transaction