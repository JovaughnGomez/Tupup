import React from 'react'
import styles from '@/public/css/InputBox.module.css'

const InputBox = ({placeholder, name, type="text", required=true, defaultVal, shape = "rectangularBorders"}, number=false) => {

  function OnChange(e)
  {
    if(number == true)
    {
      const value = e.target.value.replace(/\D/g,'');

      let newValue = value;
      if(value.length > 3 && value.length < 9)
        newValue = `${value.substring(0, 3)}-${value.substring(3, value.length)}`;
      else if(value.length > 8 && value.length < 12)
        newValue = `(${value.substring(0, 3)}) ${value.substring(3, 7)}-${value.substring(7, value.length)}`

      e.target.value = newValue;
    }
  }

  return (
    <div className={styles.input_wrp}>
        <label className={`${styles.label} ${shape}`}>
            <input className={styles.input} defaultValue={defaultVal} type={type} placeholder={placeholder} name={name} required={required} onChange={OnChange}/>
        </label>
    </div>  
  )
}

export default InputBox