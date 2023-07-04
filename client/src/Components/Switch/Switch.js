import React, { useEffect } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Switch from '@material-ui/core/Switch'

import styles from './Switch.module.css'
import { colors } from '../../styles/variables'

const CustomSwitch = withStyles({
  switchBase: {
    color: colors.darkBlue,
    '&$checked': {
      color: colors.darkBlue,
    },
    '& + $track': {
      backgroundColor: colors.darkBlue,
    },
    '&$checked + $track': {
      backgroundColor: colors.darkBlue,
    },
  },
  checked: {},
  track: {},
})(Switch)

export default function CustomizedSwitches({ setTimePeriod, initTimePeriod }) {
  const [checked, setChecked] = React.useState(false)

  useEffect(() => {
    if (initTimePeriod === 'year') {
      setChecked(true)
    }
  }, [initTimePeriod])

  const handleChange = event => {
    setChecked(event.target.checked)
    if (event.target.checked) {
      setTimePeriod('year')
    } else {
      setTimePeriod('month')
    }
  }

  return (
    <div className={styles.container}>
      <div className={checked ? styles.time : styles.timeActive}>Monthly</div>
      <div className={styles.switchBox}>
        <CustomSwitch
          checked={checked}
          onChange={handleChange}
          color="primary"
        />
      </div>
      <div className={!checked ? styles.time : styles.timeActive}>Yearly</div>
    </div>
  )
}
