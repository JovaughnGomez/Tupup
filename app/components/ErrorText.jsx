import React from 'react'

function ErrorText({text}) {
  if(!text)
    text = "This field is required";
  
  return (
    <p className='errorText'>{text}
        <style jsx>{`
            .errorText {
                color:red;
                font-size: .75em;
                width: 100%;
                gap: 0%;
                margin: -.8em 0;
                margin-left: 1em;
            }
        `} </style>
    </p>

  )
}

export default ErrorText