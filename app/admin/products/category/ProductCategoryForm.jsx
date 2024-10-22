"use client"
import React, { useEffect, useState } from 'react'
import InputBox from '@/app/components/InputBox'
import styles from './AdminProductCategory.module.css'
import Image from 'next/image'
import DropdownMenu from '@/app/components/DropdownMenu'
import SearchBar from '@/app/components/SearchBar'
import { useRouter } from 'next/navigation'
import ErrorText from '@/app/components/ErrorText'

function ProductCategoryForm({ category, allProducts=[] }) {
    const router = useRouter();

    const [products, setProducts] = useState([])
    const [type, setType] = useState("game-topup")
    const [error, setError] = useState("")

    useEffect(() => {

        setProducts(allProducts);
        const addProductForm = document.getElementById("add_category");

        const submitForm = async (e) => {
            e.preventDefault();
            const changedProducts = [];
            for (let index = 0; index < products.length; index++) {
                const product = products[index];
                
                if(product.originalValue === undefined || product.originalValue === product.isActive)
                    continue;
                
                product.originalValue = product.isActive;
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
            if(response.success)
            {
                router.push(response.redirect);
                setError("");
            } else {
                setError(response.message);
            }
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
            if(product.originalValue !== product.isActive)
                product.originalValue = product.isActive;

            product.isActive = !product.isActive;
            const newProducts = products.map((product) => product);
            setProducts(newProducts);
        }
    }

    function SelectCategory(e, category)
    {
        window.location.href = `/admin/products/category?product=${category.actualName}`;
    }

    function OnDropdownChange(value)
    {
        setType(value);
    }

  return (
    <div className={styles.addCategoryWrp}>
        <input type='hidden' name='id' value={ category ? category.id : ""}/>
        <label className={styles.searchCategoryWrp}>
            <h2 className={styles.header}>Search Category</h2>
            <SearchBar OnSelect={SelectCategory}/>
        </label>

        <h1 className={`${styles.primaryAccent} ${styles.header}`}>Category Information</h1>
        <div className={styles.categoryInfoWrp}>
            <DropdownMenu name='type' defaultVal={ category ? category.type : "game-topup"} label='Category Type:' callback={OnDropdownChange}>
                <option value="game-topup">Game-TopUp</option>
                <option value="giftcard">Gift Card</option>
            </DropdownMenu>
            

            <InputBox placeholder={"Product Name"} label='Name' name={"product_name"} defaultVal={category ? category.name : ""} />
            <InputBox placeholder={"Display Name"} label='Display Name' name={"display_name"} defaultVal={category ? category.displayName : ""} />
            {(!category && type == "giftcard") &&
                <InputBox placeholder={"Prefix"} label='Prefix' name={"prefix"} />
            }
            {(!category && type == "giftcard") &&
                <InputBox placeholder={"Code Length"} label='Code Length' name={"codeLength"} type='number' />
            }
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
        </div>
        <label className={styles.submitBtn}>
            <span>{!category ? "Add Category": "Update Category"}</span>
            <input type="submit" className='hideInput' />
        </label>
        {error && <ErrorText text={error} />}
    </div>
  )
}

export default ProductCategoryForm