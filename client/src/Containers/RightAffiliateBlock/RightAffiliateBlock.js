import React from 'react'

import SearchAndDownload from '../SearchAndDownload'

import DateInput from '../../Components/DateInput'
import DateRangeInput from '../../Components/DateRangeInput'

import styles from './RightAffiliateBlock.module.css'

function RightAffiliateBlock() {
  return (
    <div className={styles.container}>
      <DateInput />
      <DateRangeInput />

      <SearchAndDownload />
    </div>
  )
}

export default RightAffiliateBlock
