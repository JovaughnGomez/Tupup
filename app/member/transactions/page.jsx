import React from 'react'
import NavigationButton  from '@/app/components/NavigationButton';
import Transaction  from '@/app/components/Transaction';
import styles from './transactions.module.css'

function page() {
    const balance = 0;
    const transactions = [];
    const transaction = {
        transaction: "Bmobile",
        amount: 100,
        balance: 21,
        date: Date.now(),
        notes: "Voucher Type: Bmobile, Voucher #: 1234-5678-9012",
    }

    transactions.push(transaction);
    transactions.push(transaction);
  return (
    <>
        <div className={`border ${styles.balanceWrp}`}>
            <div className={`${styles.inner}`}>
                <h2> TOTAL ACCOUNT BALANCE </h2>
                <span>${balance}</span>
                <NavigationButton id={"topUpBtn"} text={"Top Up"} path={"/member/topup"} styles={styles.topUpBtn}/>
            </div>
        </div>
        <div className={styles.wrapper}>
            <div className={styles.header} >
                <h1>Transaction History</h1>
                <label className={styles.label}>
                    <select className={styles.filter} name="filter" defaultValue="All Transactions">
                        <option className={styles.dropdownOption} value="All">All Transactions</option>
                        <option className={styles.dropdownOption} value="Voucher">Voucher</option>
                        <option className={styles.dropdownOption} value="Card">Card</option>
                        <option className={styles.dropdownOption} value="TopUp">Top Up</option>
                    </select >
                </label>
            </div>
            <div className={`${styles.transactionWrp}`}>
                <ul className={styles.tableWrp}>
                    <div className={styles.first}>
                        <span>Time</span>
                        <span>Transaction</span>
                    </div>
                    <div className={styles.second}>
                        <span className={styles.balance}>Balance</span>
                        <span>Notes</span>
                    </div>
                </ul>
                {
                    transactions.map((transaction, index) =>
                        <Transaction key={index} transaction={transaction} identifier={index}/>
                    )
                }
            </div>
        </div>
    </>
  )
}

export default page