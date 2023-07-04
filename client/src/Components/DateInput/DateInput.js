import React, { useState, useEffect, forwardRef } from 'react'
import { useDispatch } from 'react-redux'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './Calendar.css'
import styles from './DateInput.module.css'

import DateSvg from '../svg/Date'

import { filterChanged } from '../../redux/table-data/table-data-actions'
import {
  changeDateStart,
  changeDateEnd,
} from '../../redux/filter/filter-actions'

function DateInput() {
  const dispatch = useDispatch()

  const [startDate, setStartDate] = useState(null)

  useEffect(() => {
    if (startDate) {
      const oneDate = startDate.toISOString().slice(0, 23).replace('T', ' ')
      dispatch(changeDateStart(oneDate))
      dispatch(changeDateEnd(oneDate))
      dispatch(filterChanged(Date.now()))
    } else if (!startDate) {
      dispatch(changeDateStart(''))
      dispatch(changeDateEnd(''))
    }
  }, [startDate, dispatch])

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <div className={styles.customInput} onClick={onClick} ref={ref}>
      {value}
    </div>
  ))

  const visibleDateFormat = date => {
    if (!date) {
      return 'Select Date'
    }

    return `${date.getDate()} ${date.toLocaleString('en-US', {
      month: 'short',
    })} ${date.getFullYear()}`
  }

  return (
    <div className={styles.container}>
      <div className={styles.visibleInput}>
        <DateSvg />
        {visibleDateFormat(startDate)}
      </div>
      <div className={styles.inputBox}>
        <DatePicker
          customInput={<ExampleCustomInput />}
          selected={startDate}
          onChange={date => setStartDate(date)}
          dayClassName={date => 'customCalendarDate'}
          // locale="en-GB"
        />
      </div>
    </div>
  )
}

export default DateInput
