import React from 'react'
import styles from '@/public/css/DropdownMenu.module.css'

function DropdownMenu({ children, defaultVal="", name="", label="", callback }) {

  function OnChange(e)
  {
    if(callback)
      callback(e.currentTarget.value);
  }
  return (
    <label className={styles.label}>
        <span>{label}</span>
        <select className={styles.dropdownMenu} name={name} defaultValue={defaultVal} onChange={OnChange}>
            {children}
        </select>
    </label >
  )
}

export default DropdownMenu