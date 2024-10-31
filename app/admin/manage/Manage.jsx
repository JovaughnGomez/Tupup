"use client"
import React, { useState } from 'react'
import styles from './manage.module.css'
import DropdownMenu from '@/app/components/DropdownMenu'
import ManageTransactions from './ManageTransactions'

function Manage() {
  const [option, setOption] = useState("transactions")
  
  function OnChange(value)
  {
    setOption(value);
  }

  return (
    <div className={styles.outerWrp}>
        <div className={styles.inner}>
            <div className={styles.menu}>
                <DropdownMenu fullWidth={true} label='Section' callback={OnChange}>
                    <option value="transactions">Transactions</option>
                    <option value="giftcard">Giftcard</option>
                </DropdownMenu>
            </div>
            <div className={styles.content}>
              {option === "transactions" &&
                <ManageTransactions />
              }
            </div>
        </div>
    </div>
  )
}

export default Manage