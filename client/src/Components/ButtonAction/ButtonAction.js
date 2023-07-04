import React from 'react'

import styles from './ButtonAction.module.css'

function ButtonAction({ onClick, children }) {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  )
}

export default ButtonAction
