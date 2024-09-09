"use client"
import React from 'react'

function RegularButton({classes, querySelector, classToToggle}) {
async function TogglePinVisibility()
{
    const pins = document.getElementsByClassName(querySelector);
    for (let index = 0; index < pins.length; index++) {
        const pin = pins[index];
        pin.classList.toggle(classToToggle);
    }
}

  return (
    <div className={` cursor-pointer ${classes}`} onClick={TogglePinVisibility}>
        <span>SHOW</span>
    </div>
  )
}

export default RegularButton