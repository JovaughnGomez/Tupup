"use client"
import React from 'react'
import styles from './AdminTransactions.module.css'
import { ConvertDateToString } from '@/app/lib/clientUtils'

function AdminTransactions({ transactions=[] }) {
    
    async function Process(transaction, e)
    {
        const form = document.getElementById(transaction.id);
        const data = new FormData(form);
        
        const res = await fetch("/api/admin/wallet/topup", {
            method:'POST',
            body: data
        });

        const response = await res.json();
        if(response.message)
        {
            const parent = document.getElementById(`item_${transaction.id}`);
            const errorField = parent.querySelector(`.${styles.responseMsg}`);
            if(res.status == 200)
            {
                errorField.classList.add("successful");
                errorField.classList.remove("failed");
            } else {
                errorField.classList.add("failed");
                errorField.classList.remove("successful");
            }
            errorField.innerText = response.message;
        }
    }

    return (
    <div>
        <div>
            <div className={styles.contentWrp}>
                <div className={`${styles.content}`}>
                    <ul className={styles.transactionWrp}>
                        { transactions.map((transaction, index) => 
                            <li id={`item_${transaction.id}`} className={`border ${styles.transaction}`} key={transaction.id}>
                                <div className={styles.row1}>
                                    <div className={styles.tLabel}>TransactionID:</div>
                                    <div className={`accent ${styles.tValue}`}>{transaction.id}</div>
                                    <div className={styles.tLabel}>Method:</div>
                                    <div className={styles.tValue}>{transaction.method}</div>
                                    <div className={styles.tLabel}>Status:</div>
                                    <div className={`${transaction.status == "processing" ? "Processing" : "Completed"} ${styles.tValue}`}>{transaction.status}</div>
                                    <div className={styles.tLabel}>Date Created:</div>
                                    <div className={styles.tValue}>{ConvertDateToString(transaction.createdAt)}</div>
                                    { transaction.completedAt &&
                                        <>
                                            <div className={styles.tLabel}>Date Completed:</div>
                                            <div className={styles.tValue}>{ConvertDateToString(transaction.completedAt)}</div>
                                        </>
                                    }
                                    <div className={styles.tLabel}>UserId:</div>
                                    <div className={styles.tValue}>{transaction.userId}</div>
                                </div>
                                <div className={styles.row2}>
                                    <div className={styles.tLabel}> Notes: </div>
                                    <div className={styles.tNote} dangerouslySetInnerHTML={{ __html: transaction.notes }}></div>
                                    { transaction.adminNotes &&
                                        <div className={styles.tNote} dangerouslySetInnerHTML={{ __html: transaction.adminNotes }}></div>
                                    }
                                </div>
                                {transaction.status == "processing" &&
                                    <>
                                        <form id={transaction.id} className={styles.formWrp}>
                                            <input type="hidden" name='id' value={transaction.id}/>
                                            <div className={styles.outerInputWrp}>
                                                <label className={styles.inputWrp} tabIndex={0}>
                                                    <select className={styles.dropdownMenu} name="vat_type" defaultValue="inclusive">
                                                        <option className={styles.dropdownOption} value="inclusive">Inclusive</option>
                                                        <option className={styles.dropdownOption} value="exclusive">Exclusive</option>
                                                    </select>
                                                    <input className={`hideInputScroller ${styles.valueInput}`} type="number" placeholder="0" name="value" />
                                                </label>
                                                <input className={`hideInputScroller ${styles.phoneNumberInput}`} type="number" placeholder="xxx-xxxx" name="number" />
                                            </div>
                                            <div className={styles.processBtnWrp}>
                                                <span className={styles.processBtn} onClick={(e) => Process(transaction, e)}>Process</span>
                                            </div>
                                        </form>
                                    </>
                                }
                                <span className={styles.responseMsg}></span>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AdminTransactions