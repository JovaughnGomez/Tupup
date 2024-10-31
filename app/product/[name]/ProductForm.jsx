import React from 'react'
import InputBox from '@/app/components/InputBox';

function ProductForm({ productName }) {

  function SelectCorrectForm()
  {
    switch (productName) {
      case "freefire":
        return (
          <InputBox type='number' number={true} placeholder={"Please enter Player ID"} label='Player ID' name={"freefire_id"} autoComplete='true'/>
        )
        default:
          return (
            <></>
          )
    }
  }

  return (
    <>
      {SelectCorrectForm()}
    </>
  )
}

export default ProductForm