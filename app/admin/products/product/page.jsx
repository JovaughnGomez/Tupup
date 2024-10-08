import React from 'react'
import ProtectedForm from '@/app/components/ProtectedForm'
import styles from './AddProduct.module.css'
import AddProductPage from './AddProductPage'
import { GetAdminProductsDTO } from '@/data/product-dto';
import { GetControlPanelDTO } from '@/data/cataegory-dto';

async function page({searchParams}) {

  const { id } = searchParams;
  const results = await GetAdminProductsDTO(id);
  const category = await GetControlPanelDTO(id);
  let products = [];
  if(results.success)
    products = results.products;
  
  return (
    <div className={styles.wrapper}>
      <ProtectedForm id='add_product' name={"add_product"} method='post' styles={styles.form}>
        <AddProductPage category={category} allProducts={products} />
      </ProtectedForm>   
    </div>
  )
}

export default page