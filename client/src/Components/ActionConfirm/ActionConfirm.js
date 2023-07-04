import React from 'react'

import Button from '../Button'

import styles from './ActionConfirm.module.css'

function ActionConfirm({ onConfirm, onCancel, id, title, color, unsubscribe }) {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        {unsubscribe ? '' : `${title} license${id === 'few' ? 's' : ''}`}
      </div>
      <div className={styles.text}>
        {unsubscribe
          ? 'Are you sure you want to unsubscribe?'
          : `Are you sure you want to ${title.toLowerCase()} ${
              Array.isArray(id)
                ? id.reduce((acc, rowId) => `${acc}, ${rowId}`, '')
                : id
            } 
        ${Array.isArray(id) ? 'licenses' : 'license'}?`}
      </div>
      <div className={styles.buttonsBox}>
        <Button width="100%" bgColor={color} onClick={onConfirm}>
          {title}
        </Button>
        <Button width="100%" bgColor="white" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  )
}

export default ActionConfirm
