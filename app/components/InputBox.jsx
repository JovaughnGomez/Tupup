"use client"
import React from 'react'
import styles from '@/public/css/InputBox.module.css'

const InputBox = ({
    id,
    placeholder, 
    label="", 
    number=false, 
    name, 
    type="text", 
    required=true, 
    defaultVal }) => {

  function OnChange(e)
  {
    if(number === "number")
    {
      const value = e.target.value;
      if (!/^\d*\.?\d*$/.test(value)) {
        e.target.value = value.slice(0, -1);
      }
    } else if(number == "mobile")
    {
      const value = e.target.value.replace(/\D/g,'');

      let newValue = value;
      if(value.length > 3 && value.length < 9)
        newValue = `${value.substring(0, 3)}-${value.substring(3, 7)}`;
      // else if(value.length > 8 && value.length < 12)
      //   newValue = `(${value.substring(0, 3)}) ${value.substring(3, 7)}-${value.substring(7, value.length)}`

      e.target.value = newValue;
    }
  }

  return (
    <div className={styles.input_wrp}>
        <label className={`${styles.label}`}>
          { label.length > 0 &&
            <span>{label}</span>
          }

          <input id={id} className={styles.input} defaultValue={defaultVal} type={type} placeholder={placeholder} name={name} required={required} onChange={OnChange}/>
        </label>
    </div>  
  )
}

export default InputBox