"use client"
import React from 'react'
import { useEffect } from 'react'
import ProductForm from './ProductForm'
import QuantityInput from '@/app/components/QuantityInput'
import Image from 'next/image'
import styles from './ProductPage.module.css'
import Icon from '@mdi/react';
import { mdiCheckBold, mdiChevronRight } from '@mdi/js';

function ProductPage({ category, products, description, guide }) {
  let quantity = 1;
  let currentCheckbox;
  let currentOption;
  let currentProduct;

  useEffect(() => {
    const product = document.querySelector(`.${styles.option}`);
    if(product)
      SelectProduct(product);
  }, [])
  

  function CalculatePrice()
  {
    if(category.onSale && currentProduct.salePrice > 0)
      return currentProduct.salePrice * quantity;
    else  
      return currentProduct.price;
  }

// #region Code related handling selecting products 
  function ToggleProductList()
  {
    const purchaseWrapper = document.getElementById("purchase_wrapper");
    purchaseWrapper.classList.toggle('show');
  }

  function OnSelectProduct(e)
  {
    const product = e.currentTarget;
    SelectProduct(product);
  }

  function SelectProduct(product)
  {
    // Save product as currentProduct
    const productIndex = product.getAttribute("data-index");
    currentProduct = products[productIndex];
    
    // Assign productID to input
    const productId = product.getAttribute("data-product-id");
    const productIdInput = document.getElementById("product_id");
    productIdInput.value = productId;
    
    UpdateChosenOption();
    HighlightOption(product);
    SetPurchaseInformation();
  }

  function UpdateChosenOption()
  {
    const chosenOption = document.getElementById("item_form_ctrl");
    const iconOfChosen = chosenOption.querySelector(`.${styles.productIcon}`);
    const nameOfChosen = chosenOption.querySelector(`.${styles.pName}`);
    iconOfChosen.src = currentProduct.icon;
    nameOfChosen.innerHTML = currentProduct.name;
  }

  function HighlightOption(currentTarget)
  {
    const productCheckbox = currentTarget.querySelector(`.${styles.radioCheck}`);
    if(currentCheckbox)
      currentCheckbox.classList.add("hide");
    
    productCheckbox.classList.remove("hide");
    currentCheckbox = productCheckbox;

    if(currentOption)
      currentOption.classList.remove(styles.activeProduct);

    currentTarget.classList.add(styles.activeProduct);
    currentOption = currentTarget;
  }

  function SetPurchaseInformation()
  {
    const price = document.getElementById("finalPrice");
    price.innerText = `$ ${CalculatePrice()}`;
  }
// #endregion

  return (
    <div className={`${styles.wrapper}`}>
      <div className={styles.coverWrp}>
        <div className={styles.cover}>
          <Image 
            className={styles.coverImage}
            width={192}
            height={192}
            src={category.icon}
            />

          <div className={styles.info}>
            <h2>{category.displayName}</h2>
            <span>{category.region}</span>        
            <span>{category.notes}</span>        
          </div>
        </div>
      </div>
      <form id='purchase_form' method='post' action="">
        <input type="hidden" name='category_id' value={category.id} />
        <div className={styles.purchase}>
          <div className={styles.purchaseInner}>
            <div id='item_form_ctrl' className={`border ${styles.productView}`} onClick={ToggleProductList}>
              <Image 
                src={""}
                width={32}
                height={32}
                className={styles.productIcon}
              />
              <div className={styles.z}>
                <span className={styles.pName}></span>
              </div>
              <div className={styles.z}>
                <Icon path={mdiChevronRight} size={1} />
              </div>
            </div>
            <div id='purchase_wrapper' className={styles.purchaseOptionsWrp}>
              <div className={styles.innerPurchaseOptionsWrp}>
                <div className={`${styles.title}`}>
                  <h3>Select Product</h3>
                </div>
                <div className={styles.purchaseOptions}>
                  <ul id='productTypeList' className={styles.productList}>
                    <input type="hidden" name='category_id' id='category_id' value={category.id}/>
                    <input type="hidden" name='product_id' id='product_id' value={0}/>
                    {
                      products.map((product, index) => 
                        <li key={index} className={styles.option} data-index={index} data-product-id={product.id} onClick={OnSelectProduct}>
                          <div className={styles.product}>
                            <div className={styles.productImage}>
                              <Image  
                                src={product.icon}
                                width={40}
                                height={40}
                              />
                            </div>
                            <div className={styles.radioCircle}>
                              <div className={`hide ${styles.radioCheck}`}>
                                <Icon path={mdiCheckBold} size={.6} />
                              </div>
                            </div>
                            <span className={styles.productName}>{ product.name }</span>
                              {category.onSale && product.salePrice > 0 ?
                                (
                                  <div className={styles.priceList}>
                                    <div className={`accent`}> ${ product.salePrice } </div>
                                    <span>${product.price}</span>
                                  </div>
                                ) : (
                                  <div className={styles.priceList}>
                                    <div className={`accent`}> ${ product.price } </div>
                                  </div>
                                )
                              }
                          </div>
                        </li>
                      )
                    }
                  </ul>
                </div>
                <div className={styles.confirmProductWrp}>
                    <span className={styles.confirmProduct} onClick={ToggleProductList}>CONFIRM</span>
                </div>
              </div>
            </div>

            <div id='order_information' className={`${styles.orderInfoWrapper}`}>
              <div id='order_details' className={`border ${styles.orderDetailsWrp}`}>
                <h3>Order Information</h3>
                <ProductForm productName={category.name}/>
                { category.allowMultiple &&
                  <QuantityInput />
                }
              </div>

              <div>
                <div className={`border ${styles.orderDetailsInner}`}>
                  <div className={styles.details}>
                    <h2>Total</h2> 
                    <span id='finalPrice' className={styles.finalPrice}></span> 
                  </div>
                  <label className={styles.buyBtnWrp}>
                    <span className={styles.buyBtn}>BUY NOW</span>
                    <input className='hideInput' type="submit" value={"Buy Now"} />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div id='product_information' className={styles.productInformationWrp}>
        <div className={styles.productInformation}>
            <div className={`border ${styles.productDescriptionWrp}`}>
              <div className={styles.productDescription}>
                <h1 className={styles.infoTitle}>Description</h1>
                <article className={styles.desc} dangerouslySetInnerHTML={{ __html: description }}></article>
              </div>
            </div>

            <div className={`border ${styles.productDescriptionWrp}`}>
              <div className={styles.productDescription}>
                <h1 className={styles.infoTitle}>Guide</h1>
                <article className={styles.desc} dangerouslySetInnerHTML={{ __html: guide }}></article>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage