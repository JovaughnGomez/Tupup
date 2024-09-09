import React from 'react'

function NavigationButton({ id, styles, text, path }) {
  return (
    <label id={ id } className={styles}>
        <a href={path}>{text}</a>
    </label>
  )
}

export default NavigationButton