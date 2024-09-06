import React from 'react'

function FormBorder({onSubmit,placeholder="Submit", id=`${placeholder} Btn`, classes="p-2 w-32"}) {
  
  return (
    <label onClick={onSubmit} className={`${classes} roundedBorders bg-green-800 cursor-pointer block`} id={id}>
        <p className='text-center font-bold'>{placeholder}</p>
    </label>
  )
}

export default FormBorder