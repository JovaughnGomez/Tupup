import React from 'react'
import styles from '@/public/css/FormBorder.module.css'

function FormBorder({ children, classes="", mainClasses=""}) {
  
  return (
    <div className={`${mainClasses} ${styles.wrapper}`}>
        <div className={`${classes} ${styles.innerWrapper}`}>
            {children}
        </div>
    </div>
  )
}

export default FormBorder