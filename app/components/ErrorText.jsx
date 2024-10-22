import React from 'react'

function ErrorText({text="This field is required", font="text-base", successful = false}) {

  return (
    <p className={`errorText ${successful ? "successful" : ""} ${font}`}>{text}
        <style jsx>{`
            .errorText {
                color:red;
                width: 100%;
                gap: 0%;
                margin: -.8em 0;
                margin-left: 1em;
            }

            .successful {
              color: rgb(8, 230, 8);
            }
        `} </style>
    </p>

  )
}

export default ErrorText