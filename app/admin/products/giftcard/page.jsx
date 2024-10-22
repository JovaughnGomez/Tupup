import React from 'react'
import styles from './AdminGiftcard.module.css'
import AdminGiftcardPage from './AdminGiftcardPage'
import ProtectedForm from '@/app/components/ProtectedForm'
import { FindCategoryByName } from '@/app/controllers/categoryController';

async function page({ searchParams }) {

    const categoryName = searchParams.category;
    let category = null;
    if(categoryName)
    {
        const results = await FindCategoryByName(categoryName, true);
        if(results.success)
            category = results.category;
    }

  return (
    <div className={styles.contentWrp}>
        <ProtectedForm id='add_giftcards' name={"add_giftcards"} method='post' styles={styles.form}>
            <AdminGiftcardPage category={category}/>
        </ProtectedForm>       
    </div>
  )
}

export default page