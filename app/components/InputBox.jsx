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
    defaultVal,
    inputClasses="",
    valueFill="",
    autoComplete="false",
    lowercase=false, 
    onChange,
    rounded = true,
  }) => {

  function OnChange(e)
  {
    if(number === "number")
    {
      const value = e.target.value;
      if (!/^\d*\.?\d*$/.test(value)) {
        e.target.value = value.slice(0, -1);
        valueFill = value;
      }
    } else if(number == "mobile")
    {
      const value = e.target.value.replace(/\D/g,'');

      let newValue = value;
      if(value.length > 3 && value.length < 9)
        newValue = `${value.substring(0, 3)}-${value.substring(3, 7)}`;
      // else if(value.length > 8 && value.length < 12)
      //   newValue = `(${value.substring(0, 3)}) ${value.substring(3, 7)}-${value.substring(7, value.length)}`

      if(lowercase)
        newValue = newValue.toLowerCase();

      e.target.value = newValue;
    }

    if(onChange)
      onChange(e.currentTarget.value);
  }

  return (
    <div className={styles.input_wrp}>
        <label className={`${styles.label} ${rounded ? "roundedBorders" : "rectangularBorders"}`}>
          { label.length > 0 &&
            <span>{label}</span>
          }

          {valueFill ? (
              <input id={id} className={`${inputClasses} ${styles.input}`} type={type} value={valueFill} placeholder={placeholder} name={name} required={required} onChange={OnChange} autoComplete={autoComplete} />
            ) : (
              <input id={id} className={`${inputClasses} ${styles.input}`} defaultValue={defaultVal} type={type} placeholder={placeholder} name={name} required={required} onChange={OnChange} autoComplete={autoComplete} />
            )
          }
        </label>
    </div>  
  )
}

export default InputBox