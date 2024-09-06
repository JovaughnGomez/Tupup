import React from 'react'
import styles from '@/public/css/Border.module.css'

function Border({children, classes = "", margin=""}) {
  return (
  <div className={`${styles.mainWrp} ${margin}`}>
      <div className={`${styles.innerWrp} ${classes}`}>
          {children}
      </div>
  </div>
  )
}

export default Border