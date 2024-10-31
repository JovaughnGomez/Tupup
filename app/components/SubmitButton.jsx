"use client"
import React, { useEffect, useState } from 'react'

function FormBorder({
    type="",
    onSubmit,
    placeholder="Submit", 
    id=`${placeholder} Btn`, 
    classes="p-2 w-32",
    rounded=true,
    background="bg-accent",
    children,
    href="",
    fullWidth=false,
    propInteractbale=true,
    }) 
  {

  const [interactable, setInteractable] = useState(true)    
  const [hovered, setHovered] = useState(false)  

  async function OnClick()
  {
    if(!interactable || !propInteractbale)
      return;
    
    if(onSubmit)
    {
      setInteractable(false);
      const keepUninteractable = await onSubmit();
      if(!keepUninteractable)
        setInteractable(true);
    }
  }
  
  function SelectElement(type)
  {
    let selectedElement;
    switch (type) 
    {
      case "link":
        selectedElement = (<a href={href} className={" w-full text-center font-bold text-white"} >{placeholder}</a>)
      break;

      case "submit":
        selectedElement = (<input className=' w-full text-center font-bold text-white cursor-pointer' type='submit' placeholder={placeholder} />)        
      break;
      
      default:
        selectedElement = (<span className=' w-full text-center font-bold text-white'>{placeholder}</span>)  
    }

    return selectedElement;
  }
  return (
    <label onClick={OnClick} className={` ${background} text-white flex justify-center ${classes} ${!propInteractbale || !interactable ? "interacted" : ""} ${rounded ? "roundedBorders" : 'rectangularBorders'} cursor-pointer ${fullWidth && "w-full"}`} id={id} onMouseEnter={(e) => setHovered(true)} onMouseLeave={(e) => setHovered(false)}>
      {children ? children : SelectElement(type)}
    </label>
  )
}

export default FormBorder