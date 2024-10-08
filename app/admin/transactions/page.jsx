import { AdminGetPendingTransactions } from '@/app/controllers/transactionController'
import React from 'react'
import AdminTransactions from './AdminTransactions';

async function page() {
    const results = await AdminGetPendingTransactions();
    const transactions = results.transactionObjects;
    return (
        <> 
            <AdminTransactions transactions={transactions}/>
        </>
    )
}

export default page