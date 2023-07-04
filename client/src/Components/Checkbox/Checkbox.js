import React from 'react'

import styles from './Checkbox.module.css'

function Checkbox({ labelText, onChange, id, checked }) {
  return (
    <div className={styles.container}>
      <div className={styles.checkbox}>
        <input
          checked={checked}
          onChange={onChange}
          className={styles.input}
          id={id}
          type="checkbox"
          name={id}
        />
        <div className={styles.check}></div>
      </div>
      <label
        className={checked ? styles.labelChecked : styles.label}
        htmlFor={id}
      >
        {labelText}
      </label>
    </div>
  )
}

export default Checkbox
