import React from 'react'
import LinearProgress from '@material-ui/core/LinearProgress'

import styles from './TableLoading.module.css'

export default function LinearIndeterminate() {
  return (
    <div className={styles.box}>
      <div className={styles.fluffyCloudBox}>
        <svg
          className={styles.fluffyCloud}
          width="85.44"
          height="54.18"
          viewBox="0 0 142.402 90.3"
        >
          <path d="M133.1,34.3a32.68258,32.68258,0,0,0-17.9-9.5A33.00658,33.00658,0,0,0,60.9,8.7a32.62456,32.62456,0,0,0-9.6,15.7A32.90983,32.90983,0,0,0,21.7,42.8,23.77123,23.77123,0,0,0,6.3,82.6a23.47443,23.47443,0,0,0,15.4,7.6h.6c3.5,0,86.3.1,87.2.1a33.02632,33.02632,0,0,0,23.6-56ZM109.3,79c-.8,0-81.5-.1-86.9-.1A12.37941,12.37941,0,0,1,11.3,66.5,12.50457,12.50457,0,0,1,23.8,54h1l4.5.5,1.5-4.3A21.69818,21.69818,0,0,1,54.9,35.9l6,1,.6-6.1a21.95192,21.95192,0,0,1,7-13.9,21.602,21.602,0,0,1,36.1,13.6l.5,4.9,4.9.2a21.70574,21.70574,0,0,1-.7,43.4Z" />
        </svg>
        <div className={styles.shadow}></div>
      </div>
    </div>
  )
}
