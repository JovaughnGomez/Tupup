"use client"
import React, { useEffect, useState } from 'react'
import styles from './AddProduct.module.css'
import Image from 'next/image'
import InputBox from '@/app/components/InputBox'
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import SearchBar from '@/app/components/SearchBar'
import Radio from '@/app/components/Radio'

function AddProductPage ({ category, allProducts=[] }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [product, setProduct] = useState(null);
    const [products, setProducts] = useState([]);
    const [version, setVersion] = useState(0);
    
    useEffect(() => {
        SetProducts();

        const addProductForm = document.getElementById("add_product");
        const upsertProduct = async (e) => {
            e.preventDefault();
            const formData = new FormData(addProductForm);
            let path = `/api/admin/product/add`;
            if(product)
                path = `/api/admin/product/update`;

            const res = await fetch(path, {
                method: "POST",
                body: formData,
            })

            const response = await res.json();
            if(res.status == 200)
            {
                if(product)
                {
                    for (let index = 0; index < allProducts.length; index++) {
                        const currentProduct = allProducts[index];
                        if(currentProduct.id == response.product.id)
                            allProducts[index] = response.product;
                    }
                } else {
                    if(response.product)
                    {
                        allProducts.push(response.product);
                        SetProduct(response.product);
                    }
                }

                SetProducts();
            }
        };

        addProductForm.addEventListener('submit', upsertProduct);
        return () => {
            addProductForm.removeEventListener('submit', upsertProduct);
        };

    }, [pathname, searchParams, product])

    function SetProducts()
    {
        const newArray = allProducts
        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        .map((product) => product)
        setProducts(newArray);
    } 

    function SetProduct(product)
    {
        setProduct(product);
    }
    
    function ClearProduct()
    {
        setProduct(null);
        setVersion(version + 1);
    }

    async function DeleteProduct()
    {
        if(!product)
        {
            console.log("No product found");
            return;
        }

        const addProductForm = document.getElementById("add_product");
        const data = new FormData(addProductForm);
        const res = await fetch(`/api/admin/product/delete`, {
            method: "POST",
            body: data,
        });

        const response = await res.json();
        if(res.status == 200)
        { 
            const newProducts = [];
            products.map((product) => {
                if(product.id == response.productId)
                    product.isActive = false;

                newProducts.push(product);
            });
            
            SetProducts(newProducts);
        }
    }
    
    function SelectCategory(e, category)
    {
        setProduct(null);
        router.push(`/admin/products/product?id=${category.id}`);
    }

    function SelectProduct(e, product)
    {
        setProduct(product);
        setVersion(version + 1);
    }

    function ToggleSale(isOnSale)
    {

    }

  return (
    <>
        <div className={styles.contentWrp}>
            <div className={styles.searchWrp}>
                <SearchBar OnSelect={SelectCategory}/>
            </div>
            <ul className={styles.productsWrp}>
                {products.map((localProduct, index) => 
                    <li key={index} className={`${product && localProduct.id == product.id ? styles.productHighlight : ""} ${styles.productResult} ${styles.searchResult}`} onClick={(e) => SelectProduct(e, localProduct)}>
                        <div className={styles.resultInfo}>
                            <Image 
                                width={40}
                                height={40}
                                src={localProduct.icon}
                                className={styles.icon}
                            />
                            <span className={!localProduct.isActive ? "failed" : ""}>{localProduct.name}</span>
                        </div>
                        <div className={styles.cost}>
                            <span>${localProduct.price}</span>
                            <span className={styles.sale}>${localProduct.salePrice}</span>
                        </div>
                    </li>
                )}
            </ul>
        </div>
        <div className={styles.addProductForm}>
            <input type="hidden" name='category_id' value={category ? category.id : ""} />
            <input type="hidden" name='product_id' value={product ? product.id : ""} />
            <h2 className={styles.heading}>{ !product ? "Add" : "Update" } Product</h2>
            <InputBox key={`name${version}`} placeholder={"Product Name"} label='Name' name={"product_name"} defaultVal={product ? product.name : ""} autoComplete="false" />
            <InputBox key={`icon${version}`} placeholder={"/img/icons/freefire.webp"} label='Icon' name={"icon"} defaultVal={product ? product.icon : "/img/icons/"} />
            <InputBox key={`category${version}`} placeholder={"Category"} label='Category' name={"category"} defaultVal={category ? category.name : ""}/>
            <InputBox key={`usd${version}`} placeholder={"USD Value"} label='USD Value' name={"usd_value"} type='number' defaultVal={product ? product.usdValue : ""}  autoComplete="false" />
            <InputBox key={`price${version}`} placeholder={"Price"} label='Price' name={"price"} type='number' defaultVal={product ? product.price : ""}  autoComplete="false" />
            <InputBox key={`salePrice${version}`} placeholder={"Sale Price"} label='Sale Price' name={"sale_price"} type='number' defaultVal={product ? product.salePrice : ""}  autoComplete="false" />
            <Radio key={`onSale${version}`} name="onSale" defaultValue={ product ? product.onSale : false } callback={ToggleSale} text={"On Sale"}/>
            <div className={styles.btns}>
                <label className={styles.btn} onClick={ClearProduct}>
                    <span>Clear</span>
                </label>
                <label className={styles.btn}>
                    <input type="submit" className='hideInput' />
                    <span>{ !product ? "Add" : "Update" }</span>
                </label>
                <label className={styles.btn} onClick={DeleteProduct}>
                    <span>Delete</span>
                </label>
            </div>
        </div>
    </>
  )
}

export default AddProductPage