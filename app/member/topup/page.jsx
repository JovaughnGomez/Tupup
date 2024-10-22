import React from 'react'
import { GetWalletDTO } from '@/data/user-dto';
import styles from './topup.module.css'
import ProtectedForm from '@/app/components/ProtectedForm';
import TopUp from './TopUp';
import { GetSessionFromCookies } from '@/app/lib/session';
import { GetCurrentUserFromMap } from '@/app/lib/auth';
import { redirect } from 'next/navigation';
import { GetWalletTransactionsDTO } from '@/data/transaction-dto';

async function page() {
    const currentUser = await GetCurrentUserFromMap();
    const session = await GetSessionFromCookies();
    if(!currentUser || !session)
        redirect("/login");

    const userData = await GetWalletDTO(currentUser, currentUser.id);
    if(!userData)
        redirect("/");
    
    const transactions = await GetWalletTransactionsDTO(currentUser, currentUser.id);
    if(!transactions)
        redirect("/");

    return (
    <>
        <TopUp userData={userData} allTransactions={transactions}>
            <ProtectedForm styles={styles.topUpForm} id='topup_form' action="/api/wallet/topup" method='post'>
                <label className={styles.voucherWrp} tabIndex={0}>
                    <div id='voucherWrp' className={`bmobileAlpha ${styles.voucherInnerWrp}`}>
                        <select id='voucherType' className={styles.dropdownMenu} name="voucherType" defaultValue="bmobile">
                            <option className={styles.dropdownOption} value="bmobile">Bmobile</option>
                            <option className={styles.dropdownOption} value="digicel">Digicel</option>
                        </select>
                        <input className={styles.topup_input} type="number" name="voucher" minLength={15} maxLength={15}/>
                    </div>
                </label>

                <label id='topupBtn' className={`bmobile ${styles.topupBtn}`}>
                    <span>TOP UP</span>
                    <input className='hideInput' type="submit"/>
                </label>
            </ProtectedForm>
        </TopUp>
    </>
  )
}

export default page