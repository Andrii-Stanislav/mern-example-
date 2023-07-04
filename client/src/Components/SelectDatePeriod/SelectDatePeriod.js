import React, { useState } from 'react'

import Select from '../svg/Select'

import styles from './SelectDatePeriod.module.css'
import timeSteps from '../../constants/timeSteps'

function SelectDatePeriod() {
  const [timeStep, setTimeStep] = useState(timeSteps[1])

  const heandleSelectChange = ({ target }) => {
    setTimeStep(target.value)
  }
  return (
    <div className={styles.box}>
      {/* !!! HARDCODE */}
      <div className={styles.visitorsCount}>{7}</div>

      <div className={styles.text}>Visitors in last </div>
      <div className={styles.chousenPeriod}>{timeStep}</div>
      <Select />
      <select
        value={timeStep}
        onChange={heandleSelectChange}
        className={styles.select}
      >
        {timeSteps.map(value => (
          <option key={value} className={styles.option} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SelectDatePeriod
