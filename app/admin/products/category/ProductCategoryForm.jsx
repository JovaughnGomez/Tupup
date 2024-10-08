"use client"
import React, { useEffect, useState } from 'react'
import InputBox from '@/app/components/InputBox'
import styles from './AdminProductCategory.module.css'
import Image from 'next/image'

function ProductCategoryForm({category, allProducts=[]}) {
    const [products, setProducts] = useState([])

    useEffect(() => {
        setProducts(allProducts);
        
        const addProductForm = document.getElementById("add_category");

        const submitForm = async (e) => {
            e.preventDefault();
            const changedProducts = [];
            for (let index = 0; index < products.length; index++) {
                const product = products[index];
                if(product.originalValue == undefined)
                    continue;
                
                if(product.originalValue == product.isActive)
                    continue;

                changedProducts.push(product);
            }

            const formData = new FormData(addProductForm);
            const productAsJson = JSON.stringify(changedProducts);
            formData.set("products", productAsJson);

            const res = await fetch(`/api/admin/category/add`, {
                method: "POST",
                body: formData,
            })

            const response = await res.json();
        };

        addProductForm.addEventListener('submit', submitForm);
        
            return () => {
            addProductForm.removeEventListener('submit', submitForm);
        };
        return () => {

        }
    }, [products])
    
    function OnClick(e, product)
    {
        if(e.altKey)
        {
            if(product.originalValue == undefined)
                product.originalValue = product.isActive;

            product.isActive = !product.isActive;
            const newProducts = products.map((product) => product);
            setProducts(newProducts);
        }
    }

  return (
    <div className={styles.addCategoryWrp}>
        <input type='hidden' name='id' value={category ? category.id : ""}/>
        <InputBox placeholder={"Product Name"} label='Name' name={"product_name"} defaultVal={category ? category.name : ""} />
        <InputBox placeholder={"Display Name"} label='Display Name' name={"display_name"} defaultVal={category ? category.displayName : ""} />
        <InputBox placeholder={"/img/posters/freefire.webp"} label='Poster' name={"poster"} defaultVal={category ? category.icon : ""} />
        <InputBox placeholder={"Region"} label='Region' name={"region"} required={false} defaultVal={category ? category.region : ""} />
        <InputBox placeholder={"Notes"} label='Notes' name={"notes"} required={false} defaultVal={category ? category.notes : ""} />
        <ul className={styles.productList}>
            <div className={styles.header}>Products</div>
            <div className={styles.productsWrp}>
            <div className={styles.activeProducts}>
                {products.map((product, index) => 
                product.isActive && 
                    <li className={styles.product} key={index} onClick={(e) => OnClick(e, product)}>
                        <div className={styles.productLeftSide}>
                            <Image 
                            width={40}
                            height={40}
                            src={product.icon}
                            alt='product_icon'
                            className={styles.product_icon}
                            />
                            <h4>{product.name}</h4>
                        </div>
                        <div className={styles.pricing}>
                            <span>${product.price}</span>
                            <span className={styles.salePrice}>${product.salePrice}</span>
                        </div>
                    </li>
                )}
            </div>
            <div className={styles.inactiveProducts}>
                <h3>Inactive List</h3>
                {products.map((product, index) => 
                !product.isActive && 
                    <li className={styles.product} key={index} onClick={(e) => OnClick(e, product)}>
                        <div className={styles.productLeftSide}>
                        <Image 
                            width={40}
                            height={40}
                            src={product.icon}
                            alt='product_icon'
                            className={styles.product_icon}
                        />
                        <h4>{product.name}</h4>
                        </div>
                        <div className={styles.pricing}>
                        <span>${product.price}</span>
                        <span className={styles.salePrice}>${product.salePrice}</span>
                        </div>
                    </li>
                )}
            </div>
            </div>
        </ul>
        <div className={styles.textAreaWrp}>
            <h3 className={styles.textAreaLabel}>Description</h3>
            <textarea name="description" className={styles.textarea} defaultValue={category ? category.description : ""}></textarea>
        </div>
        <div className={styles.textAreaWrp}>
            <h3 className={styles.textAreaLabel}>Guide</h3>
            <textarea name="guide" className={styles.textarea} defaultValue={category ? category.guide : ""}></textarea>
        </div>
        <label className={styles.submitBtn}>
            <span>Add Category</span>
            <input type="submit" className='hideInput' />
        </label>
    </div>
  )
}

export default ProductCategoryForm