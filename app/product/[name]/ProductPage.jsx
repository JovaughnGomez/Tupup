"use client"
import React, { useEffect, useState } from 'react'
import ProductForm from './ProductForm'
import QuantityInput from '@/app/components/QuantityInput'
import SubmitButton from '@/app/components/SubmitButton'
import Image from 'next/image'
import styles from './ProductPage.module.css'
import Icon from '@mdi/react';
import { mdiCheckBold, mdiChevronRight, mdiEyeOff, mdiStar, mdiTagHidden, mdiTrashCan } from '@mdi/js';
import { CalculateAverageRating, CalculateFinalPrice, ConvertDateToString } from '@/app/lib/clientUtils'
import ErrorText from '@/app/components/ErrorText'
import { useRouter } from 'next/navigation'

function ProductPage({ category, products = [], isAdmin=false, reviewData, description, guide }) {
  const router = useRouter();
  const [showDesc, setShowDesc] = useState(true);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState([1,2,3,4,5]);
  const [activeRating, setActiveRating] = useState(0);
  const [finalRating, setFinalRating] = useState(0);
  const [hoveringRating, setHoveringRating] = useState(false);
  const [error, setError] = useState({});
  const averageRating = CalculateAverageRating(reviewData);
  const [reviews, setReviews] = useState([]);
  const [firstLoad, setFirstLoad] = useState(false);
  const starsArray = [1,2,3,4,5];

  products = products.sort((a,b) => a.price - b.price);
  useEffect(() => {
    if(!firstLoad)
    {
      setReviews(reviewData.reviews);
      setFirstLoad(true);
    }
    if(products.length > 1)
      setProduct(products[0]);
  }, [error, reviews])
  

  function ChangeQuantity(quantity)
  {
    setQuantity(quantity);
    CalculatePrice();
  }

  function CalculatePrice()
  {
    if(product)
      return CalculateFinalPrice(product, quantity);
  }

// #region Code related handling selecting products 
  function ToggleProductList()
  {
    const purchaseWrapper = document.getElementById("purchase_wrapper");
    purchaseWrapper.classList.toggle('show');
  }

  function OnSelectProduct(e, product)
  {
    setProduct(product);
  }
// #endregion

  async function OnSubmitReview(e)
  {
    setError(false);

    if(finalRating <= 0)
    {
      setError(true);
      return;
    }

    const form = document.getElementById("review_form");
    const data = new FormData(form);
    const results = await fetch("/api/review/add", {
      method:'post',
      body: data,
    })

    const res = await results.json();
    let errorResponse = {
      success: res.success,
    };

    if(res.success) {
      errorResponse.text = "Thank you for reviewing our service!";
      // setTimeout(() => {

      // }, 2000);
    } else {
      if(res.redirect)
      {
        router.push(res.redirect);
      } else {
        errorResponse.text = res.message;
      }
    } 

    setError(errorResponse);
    if(res.success)
      return true;
  }

  async function OnHideReview(selectedReview)
  {
    const data = new FormData();
    data.set("review_id", selectedReview.id);
    data.set("status", !selectedReview.show);

    const res = await fetch("/api/admin/review/hide", {
      method:"post",
      body: data,
    });

    const results = await res.json();
    setReviews(reviews.map((review) => {
      if(review.id === selectedReview.id)
      {
        return {
          ...review,
          show: results.status,
        }
      }

      return review;
    }))

    console.log(results);
    console.log(reviews);
  }

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
      <form id='purchase_form' method='post' action={`/api/product/buy`}>
        <input type="hidden" name='category_id' value={category.id} />
        <input type="hidden" name='category_name' value={category.name} />
        <input type="hidden" name='product_id' id='product_id' value={product ? product.id : 0}/>
        <input type="hidden" name='quantity' value={quantity}/>
        
        <div className={styles.purchase}>
          <div className={styles.purchaseInner}>
            <div id='item_form_ctrl' className={`border ${styles.productView}`} onClick={ToggleProductList}>
              <Image 
                src={product ? product.icon : ""}
                width={32}
                height={32}
                className={styles.productIcon}
              />
              <div className={styles.z}>
                <span className={styles.pName}>{product ? product.name : ""}</span>
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
                    {
                      products.map((localProduct, index) => 
                        <li key={index} className={`${localProduct == product ? styles.activeProduct : "" } ${styles.option}`} data-index={index} data-product-id={localProduct.id} onClick={(e) => OnSelectProduct(e, localProduct)}>
                          <div className={styles.product}>
                            <div className={styles.productImage}>
                              <Image  
                                src={localProduct.icon}
                                width={40}
                                height={40}
                              />
                            </div>
                            <div className={styles.radioCircle}>
                              <div className={`${localProduct == product ? "" : "hide" } ${styles.radioCheck}`}>
                                <Icon path={mdiCheckBold} size={.6} />
                              </div>
                            </div>
                            <span className={styles.productName}>{ localProduct.name }</span>
                              {localProduct.onSale && localProduct.salePrice > 0 ?
                                (
                                  <div className={styles.priceList}>
                                    <div className={`accent`}> ${ parseFloat(localProduct.salePrice).toFixed(2) } </div>
                                    <span>${parseFloat(localProduct.price).toFixed(2)}</span>
                                  </div>
                                ) : (
                                  <div className={styles.priceList}>
                                    <div className={`accent`}> ${ parseFloat(localProduct.price).toFixed(2) } </div>
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
                  <QuantityInput onQuantityChange={ChangeQuantity}/>
                }
              </div>

              <div>
                <div className={`border ${styles.orderDetailsInner}`}>
                  <div className={styles.details}>
                    <h2>Total</h2> 
                    <span id='finalPrice' className={styles.finalPrice}>${product ? CalculatePrice() : "0.00"}</span> 
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
      <div id='product_information' className={`${styles.productInformationWrp}`}>
        <div className={styles.productInformation}>
          <div className={styles.informationSection}>
            <div className={styles.informationTabs}>
              <div className={`${showDesc ? styles.activeTab : ""} ${styles.desc}  ${styles.tab}`} onClick={(e) => setShowDesc(true)}>Description</div>
              <div className={`${!showDesc ? styles.activeTab : ""} ${styles.tab}`} onClick={(e) => setShowDesc(false)}>Guide</div>
            </div>
            <div className={`${!showDesc ? "hide" : ""} ${styles.productDescriptionWrp}`}>
              <div className={styles.productDescription}>
                <h1 className={styles.infoTitle}>Description</h1>
                <article className={styles.desc} dangerouslySetInnerHTML={{ __html: description }}></article>
              </div>
            </div>

            <div className={`${showDesc ? "hide" : ""} ${styles.productDescriptionWrp}`}>
                <div className={styles.productDescription}>
                  <h1 className={styles.infoTitle}>Guide</h1>
                  <article className={styles.desc} dangerouslySetInnerHTML={{ __html: guide }}></article>
                </div>
            </div>
          </div>
          <div id='reviews' className={styles.reviewContent}>
            <div className={`border ${styles.reviewWrapper}`}>
              <div className={styles.reviewHeader}>
                <h2>User reviews</h2>
                {/* <div className={styles.otherReviews}>
                  <a href="/reviews/playstation-network-card-psn-united-states">All Reviews</a>
                  <Icon path={mdiChevronRight} size={.8} />
                </div> */}
              </div>
              <div className={styles.stats_reviewWrp}>
                <div className={styles.reviewStatsWrp}>
                  <div className={styles.reviewStatsInner}>
                    <div className={styles.reviewStat}>
                      <h2 data-number={reviewData.totalReviews}>Total Reviews</h2>
                    </div>
                    <div className={styles.reviewStat}>
                      <h2 data-number={averageRating}>Avg Reviews</h2>
                    </div>
                  </div>
                </div>
                {reviewData.canLeaveReview &&
                  <form name='review_form' id='review_form' method='post' action='/api/review/add' className={styles.reviewForm}>
                    <input type="hidden" name='rating' value={finalRating} min={1} max={5}/>
                    <input type="hidden" name='category_name' value={category.name}/>
                    <input type="hidden" name='category_id' value={category.id}/>
                    <h3 className={styles.reviewTitle}>Leave A Review</h3>
                    <div className={styles.ratingsWrp} onMouseEnter={(e) => setHoveringRating(true)} onMouseLeave={(e) => setHoveringRating(false)} >
                      <h4>Your Rating: </h4>
                      <div className={styles.ratingStars}>
                        {rating.map((star, index) => (
                          hoveringRating ? (
                            <Icon key={index} path={mdiStar} size={.8} color={star <= activeRating ? "gold" : ""} onMouseEnter={(e) => setActiveRating(index + 1)} onClick={(e) => setFinalRating(index + 1)} />
                          ) : (
                            <Icon key={index} path={mdiStar} size={.8} color={star <= finalRating ? "gold" : ""} />
                          )
                        ))}
                      </div>
                    </div>
                    <div className={styles.textAreaWrp}>
                      <h3 className={styles.textAreaLabel}>Your Review</h3>
                      <textarea name="comment" className={styles.textarea} placeholder='Excellent service! I received my item in minutes!'></textarea>
                    </div>
                    {error.text &&
                      <div className={styles.errorWrp}>
                        <ErrorText text={error.text} successful={error.success} font='text-lg' />
                      </div>
                    }
                    <div className={styles.submitWrp}>
                      <SubmitButton onSubmit={OnSubmitReview}/>
                    </div>
                  </form>
                }
              </div>

              <div className={styles.reviewInner}>
                {reviews.map((review, index) => 
                  <div key={index} className={styles.review}>
                    <div className={styles.outerSeparator}>
                      <div className={styles.reviewSeparator}>
                        <div className={styles.userIconWrp}>
                          <Image 
                            src={review.user.avatar ? review.user.avatar : "/img/user/avatar/p.webp"}
                            width={45}
                            height={45}
                            className={styles.userIcon}
                            alt='Avatar'
                          />
                        </div>
                        <div className={styles.reviewUserInfo}>
                          <h4>{review.user.username}</h4>
                          <div className={styles.stars}>
                            {starsArray.map((star, index) => (
                              star <= review.stars ? (
                                <Icon key={index} path={mdiStar} size={.7} color='gold'/>
                              ) : (
                                <Icon key={index} path={mdiStar} size={.7}/>
                              )
                            ))}
                          </div>
                          <div className={styles.reviewComment} dangerouslySetInnerHTML={{__html: review.notes}}></div>
                        </div>
                      </div>
                      <div className={styles.dateWrp}>
                        <span className={styles.date}>{ConvertDateToString(ConvertDateToString(review.createdAt, true), true)}</span>
                      </div>                      
                    </div>
                    { isAdmin &&
                      <div className={styles.reviewActions}>
                          {/* <Icon className={styles.reviewDelete} path={mdiTrashCan} size={.85}/> */}
                          <SubmitButton onSubmit={(e) => OnHideReview(review)} background='transparent'>
                            <Icon className={`${review.show ? "" : "failed"} ${styles.reviewEdit}`} path={mdiEyeOff} size={.85}/>
                          </SubmitButton>
                      </div>
                    }
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage