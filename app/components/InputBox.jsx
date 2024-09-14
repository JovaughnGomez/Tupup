import React from 'react'
import styles from '@/public/css/InputBox.module.css'

const InputBox = ({
    placeholder, 
    label="", 
    number=false, 
    name, 
    type="text", 
    required=true, 
    defaultVal }) => {

  function OnChange(e)
  {
    if(number === true && !qunaity)
    {
      const value = e.target.value;
      if (!/^\d*\.?\d*$/.test(value)) {
        e.target.value = value.slice(0, -1);
      }
    }
  }

  return (
    <div className={styles.input_wrp}>
        <label className={`${styles.label}`}>
          <span>{label}</span>
          <input className={styles.input} defaultValue={defaultVal} type={type} placeholder={placeholder} name={name} required={required} onChange={OnChange}/>
        </label>
    </div>  
  )
}

export default InputBox