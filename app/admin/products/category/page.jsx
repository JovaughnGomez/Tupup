import React from 'react'
import ProtectedForm from '@/app/components/ProtectedForm'
import styles from './AdminProductCategory.module.css'
import ProductCategoryForm from './ProductCategoryForm'
import { FindCategoryByName } from '@/app/controllers/categoryController'
import { GetAdminProductsDTO } from '@/data/product-dto'
import { redirect } from 'next/navigation'

async function page({searchParams}) {
  // if search param exist, grab category from database
  const productName = searchParams.product;
  let category = null;
  let products = [];
  if(productName)
  {
    const results = await FindCategoryByName(productName, true);
    if(results.success)
    {
      category = results.category;
      const productResults = await GetAdminProductsDTO(category.id);
      if(productResults.success)
        products = productResults.products;
    } else {
      redirect("/admin/products/category");
    }
  } 

  return (
    <>
      <div className={styles.contentWrp}>
          <ProtectedForm id='add_category' name={"add_category"} method='post' styles={styles.form}>
            <ProductCategoryForm category={category} allProducts={products} />
          </ProtectedForm>       
      </div>
    </>
  )
}

export default page