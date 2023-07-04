import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'

import Popover from '@material-ui/core/Popover'
import { makeStyles } from '@material-ui/core/styles'

import Modal from '../Modal'
import UpgradePlan from '../../Components/UpgradePlan'
import Button from '../../Components/Button'
import Lock from '../../Components/svg/Lock'
import Upgrade from '../../Components/svg/Upgrade'

import authSelectors from '../../redux/auth/auth-selectors'
import authOperations from '../../redux/auth/auth-operations'

import styles from './LeftLinksBlock.module.css'
import routes from '../../routes'
import accountTypes from '../../constants/accountTypes'

const useStyles = makeStyles(theme => ({
  popover: {
    '& .MuiPaper-rounded': {
      borderRadius: 16,
    },
  },
}))

function PartnerLinksBlock({ title }) {
  const userPlan = useSelector(authSelectors.plan).trim()
  const isRestricted = !(
    userPlan === accountTypes.partner || userPlan === accountTypes.godMode
  )

  const [modalPlanShow, setPlanModalShow] = useState(false)

  const dispatch = useDispatch()
  const upgradeUserPlan = () => {
    setAnchorEl(null)
    dispatch(authOperations.getPlans())
    setPlanModalShow(true)
  }

  // Show restricted info logic
  const classes = useStyles()

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const id = open ? 'affilate-restricted-popover' : undefined

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <div className={styles.leftControlBlock}>
        <p className={styles.title}>{title}</p>
        <div className={styles.buttonsBlock}>
          {title === 'Partner Area' && (
            <>
              <NavLink
                to={routes.partnerAreaExtensions}
                className={styles.buttonControl}
                activeClassName={styles.activeButton}
              >
                Extensions
              </NavLink>
              <NavLink
                to={routes.partnerAreaLicenses}
                className={styles.buttonControl}
                activeClassName={styles.activeButton}
              >
                Licenses
              </NavLink>
              {isRestricted ? (
                <div
                  className={`${styles.buttonControl} ${styles.isRestricted}`}
                  onClick={handleClick}
                >
                  <span>Sub-partners </span>
                  <Lock />
                </div>
              ) : (
                <NavLink
                  to={routes.partnerAreaSubPartners}
                  className={styles.buttonControl}
                  activeClassName={styles.activeButton}
                >
                  Sub-partners
                </NavLink>
              )}
            </>
          )}
          {title === 'Affiliate Dashboard' && (
            <>
              <NavLink
                to={routes.affiliateDashboardReferrals}
                className={styles.buttonControl}
                activeClassName={styles.activeButton}
              >
                Referrals
              </NavLink>
              <NavLink
                to={routes.affiliateDashboardTransaction}
                className={styles.buttonControl}
                activeClassName={styles.activeButton}
              >
                Transaction
              </NavLink>
            </>
          )}
        </div>
      </div>

      {isRestricted && (
        <>
          <Popover
            id={id}
            className={classes.popover}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
          >
            <div className={styles.hoverInfoBox}>
              <div className={styles.hoverInfoText}>
                <span className={styles.redText}>
                  Sub-partners are not available
                </span>{' '}
                for your plan. <br />
                Only with "Partner" plan you can add Sub-partners.
              </div>
              <Button
                bgColor="darkBlue"
                icon={<Upgrade />}
                width="100%"
                onClick={upgradeUserPlan}
              >
                Upgrade
              </Button>
            </div>
          </Popover>

          <Modal
            size="lg"
            show={modalPlanShow}
            onHide={() => setPlanModalShow(false)}
          >
            <UpgradePlan onCloseClick={() => setPlanModalShow(false)} />
          </Modal>
        </>
      )}
    </>
  )
}

export default PartnerLinksBlock
