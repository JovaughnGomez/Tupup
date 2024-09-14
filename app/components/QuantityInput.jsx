import React from 'react'
import styles from '@/public/css/QuantityInput.module.css'
import Icon from '@mdi/react'
import { mdiPlus, mdiMinus } from '@mdi/js'
function QuantityInput({ id="product_quanity" }) {
    let quantity = 1;

    function OnChange(e)
    {
        let value = e.target.value.replace(/\D/g,'');
        ChangeQuantity(parseInt(value));
        
    }

    function MinusQuantity() 
    {
        ChangeQuantity(quantity - 1);
    }

    function AddQuantity()
    {
        ChangeQuantity(quantity + 1);
    }

    function ChangeQuantity(value)
    {
        if(value < 1)
            value = 1;
        else if(value > 10)
            value = 10

        const input = document.getElementById("product_quantity");
        quantity = value
        input.value = value;
    }

  return (
    <div className={styles.wrapper}>
        <div className={styles.inner}>
            <span>Quantity</span>
            <label className={styles.quantityWrp}>
                <div className={styles.quantityInner}>
                    <Icon id='minus_quantity'  className={styles.quantityIcons} path={mdiMinus} size={1} onClick={MinusQuantity}/>
                    <input className={styles.quantityInput} type="text" name='quantity' id='product_quantity' defaultValue={1} onChange={OnChange} required/>
                    <Icon id='add_quantity' className={styles.quantityIcons} path={mdiPlus} size={1} onClick={AddQuantity}/>
                </div>
            </label>
        </div>
    </div>
  )
}

export default QuantityInput