"use client"
import React, { useEffect, useState } from 'react'
import styles from '@/public/css/Radio.module.css'
import Icon from '@mdi/react'
import { mdiCheckBold } from '@mdi/js'

function Radio({name, defaultValue = false, callback, text=""}) {
    const [active, setActive] = useState(defaultValue)
    useEffect(() => {
      
      return () => {

      }
    }, [active])
    
    function ToggleRadio()
    {
      setActive(!active);
      if(callback)
        callback(!active);
    }

  return (
    <div className={styles.radioWrp} onClick={ToggleRadio}>
        <div className={`${active ? styles.active : ""} ${styles.radioBox}`}>
          {active && <Icon  path={mdiCheckBold} size={.8} />}
          <input type="hidden" name={name} value={active}/>
        </div>
        <div className={styles.radioText}>{text}</div>
    </div>
  )
}

export default Radio