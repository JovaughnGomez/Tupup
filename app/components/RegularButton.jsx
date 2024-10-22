"use client"
import React from 'react'

function RegularButton({ classes, querySelector, classToToggle, callback }) {

  async function OnClick()
  {
      if(callback)
        callback();
  }

  return (
    <div className={` cursor-pointer ${classes}`} onClick={OnClick}>
        <span>SHOW</span>
    </div>
  )
}

export default RegularButton