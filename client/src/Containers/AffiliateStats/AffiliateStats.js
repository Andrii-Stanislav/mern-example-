import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import Popover from '@material-ui/core/Popover'
import { makeStyles } from '@material-ui/core/styles'

// import SelectDatePeriod from '../../Components/SelectDatePeriod'

import Info from '../../Components/svg/Info'

import styles from './AffiliateStats.module.css'
import authSelectors from '../../redux/auth/auth-selectors'

const useStyles = makeStyles(() => ({
  popover: {
    pointerEvents: 'none',
    '& .MuiPaper-rounded': {
      borderRadius: 16,
    },
  },
}))

function AffiliateStats() {
  // const visitors = useSelector(authSelectors.affiliate.visitors)
  const paid = useSelector(authSelectors.affiliate.paid)
  const earned = useSelector(authSelectors.affiliate.earned)
  const due = useSelector(authSelectors.affiliate.due)

  const classes = useStyles()

  // Show full email logic
  const [anchorEl, setAnchorEl] = useState(null)
  const handleClosePopover = () => {
    setAnchorEl(null)
  }
  const open = Boolean(anchorEl)
  const id = open ? 'simple-affilate-popover' : undefined

  const onHoverEnter = ({ target }) => {
    setAnchorEl(target.parentNode)
  }

  const onHoverLeave = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <div className={styles.centrallBlock}>
        {/* <SelectDatePeriod visitors={visitors} /> */}
        <div className={styles.infoBox}>
          ${Number(earned).toFixed(2)}
          <div className={styles.description}>
            <span>Earned</span>
            <span onPointerEnter={onHoverEnter} onPointerLeave={onHoverLeave}>
              <Info />
            </span>
          </div>
        </div>
        <div className={`${styles.infoBox} ${styles.green}`}>
          ${Number(due).toFixed(2)}
          <div className={styles.description}>
            <span>Due</span>
            <span onPointerEnter={onHoverEnter} onPointerLeave={onHoverLeave}>
              <Info />
            </span>
          </div>
        </div>
        <div className={styles.infoBox}>
          ${Number(paid).toFixed(2)}
          <div className={styles.description}>Total paid</div>
        </div>
      </div>

      <Popover
        id={id}
        className={classes.popover}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <div className={styles.hoverInfoBox}>Commission Min $50 to payout</div>
      </Popover>
    </>
  )
}

export default AffiliateStats
