"use client"
import React, { useState } from 'react'
import styles from './ManageTransactions.module.css'
import SearchBar from '@/app/components/SearchBar'
import InputBox from '@/app/components/InputBox';
import SubmitButton from '@/app/components/SubmitButton'

function ManageTransactions() {
    const [transactionId, setTransactionId] = useState("");
    const [userId, setUserId] = useState("");
    const [transaction, setTransaction] = useState("");

    const baseURL = `/api/admin/manage/transactions/search?`;
    function OnChangeTransactionId(value)
    {
        setTransactionId(value);
    }

    function OnChangeUserId(value)
    {
        setUserId(value);
    }

    async function SearchTransaction()
    {
        const res = await fetch(`${baseURL}id=${transactionId}&userId=${userId}`);
        const results = await res.json();
        if(results.transaction)
            setTransaction(results.transaction);
    }

    return (
    <div className={styles.outerWrp}>
        <div className={styles.search}>
            <InputBox onChange={OnChangeTransactionId} placeholder={"Transaction ID"} />
            <InputBox onChange={OnChangeUserId} placeholder={"User ID"} />
            <SubmitButton onSubmit={SearchTransaction} />
        </div>

        <div className={styles.transactionWrp}>
            
        </div>
    </div>
  )
}

export default ManageTransactions