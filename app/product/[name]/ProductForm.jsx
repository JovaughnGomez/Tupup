import React from 'react'
import InputBox from '@/app/components/InputBox';

function ProductForm({ productName }) {

  function SelectCorrectForm()
  {
    switch (productName) {
      case "freefire":
        return (
          <InputBox type='text' number={true} placeholder={"Please enter Player ID"} label='Player ID' name={"player_id"}/>
        )
        default:
          return (
            <InputBox type='text' number={true} placeholder={"Please enter Player ID"} label='Player ID' name={"player_id"}/>
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