import React, { useState, useEffect, forwardRef } from 'react'
import { useDispatch } from 'react-redux'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './Calendar.css'
import styles from './DateRangeInput.module.css'

import DateSvg from '../svg/Date'

import { filterChanged } from '../../redux/table-data/table-data-actions'
import {
  changeDateStart,
  changeDateEnd,
} from '../../redux/filter/filter-actions'

function DateRangeInput() {
  const dispatch = useDispatch()

  const [dateRange, setDateRange] = useState([null, null])
  const [startDate, endDate] = dateRange

  useEffect(() => {
    if (startDate && endDate) {
      const start = startDate.toISOString().slice(0, 23).replace('T', ' ')
      const end = endDate.toISOString().slice(0, 23).replace('T', ' ')
      dispatch(changeDateStart(start))
      dispatch(changeDateEnd(end))
      dispatch(filterChanged(Date.now()))
    } else if (!startDate && !endDate) {
      dispatch(changeDateStart(''))
      dispatch(changeDateEnd(''))
    }
  }, [startDate, endDate, dispatch])

  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <div className={styles.customInput} onClick={onClick} ref={ref}>
      {value}
    </div>
  ))

  const visibleDateFormat = date => {
    if (!date) {
      return '-'
    }

    return `${date.getDate()} ${date.toLocaleString('en-US', {
      month: 'short',
    })} ${date.getFullYear()}`
  }

  return (
    <div className={styles.container}>
      <div className={styles.visibleInput}>
        <DateSvg />
        {!(startDate && endDate) ? (
          'Select Period'
        ) : (
          <>
            From <b>{visibleDateFormat(startDate)}</b> To{' '}
            <b>{visibleDateFormat(endDate)}</b>
          </>
        )}
      </div>
      <div className={styles.inputBox}>
        <DatePicker
          customInput={<ExampleCustomInput />}
          startDate={startDate}
          endDate={endDate}
          onChange={update => {
            setDateRange(update)
          }}
          selectsRange
          dayClassName={date => 'customCalendarDate'}
          // locale="en-GB"
        />
      </div>
    </div>
  )
}

export default DateRangeInput
