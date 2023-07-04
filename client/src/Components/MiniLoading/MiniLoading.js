import React from 'react'

import styles from './MiniLoading.module.css'

function MiniLoading() {
  return (
    <div className={styles.load}>
      <div className={styles.line}></div>
      <div className={styles.line}></div>
      <div className={styles.line}></div>
      <div className={styles.line}></div>
      <div className={styles.line}></div>
      <div className={styles.line}></div>
      <div className={styles.line}></div>
    </div>
  )
}

export default MiniLoading
