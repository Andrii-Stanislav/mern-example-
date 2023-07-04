import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import Popover from '@material-ui/core/Popover'

import UserLogo from '../UserLogo'
import Button from '../Button'
import MiniLoading from '../MiniLoading'

import Licenses from '../svg/Licenses'
import Docs from '../svg/Docs'
import Connect from '../svg/Connect'
import Upgrade from '../svg/Upgrade'
import LogOut from '../svg/LogOut'
import Settings from '../svg/Settings'
import Unsubscribe from '../svg/Unsubscribe'

import StyledUserPlan from './StyledUserModal'

import styles from './UserModalBlock.module.css'
import authSelectors from '../../redux/auth/auth-selectors'
import authOperations from '../../redux/auth/auth-operations'
import api from '../../services/api'

import routes from '../../routes'

function UserModalBlock({ onCloseClick, userLogo, upgradeUserPlan }) {
  const userName = useSelector(authSelectors.name)
  const usePlan = useSelector(authSelectors.plan)
  const [userLicenses, setUserLicenses] = useState(null)

  const userApi = useSelector(authSelectors.api)

  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await api.auth.getLicenses()
        console.log('licenses: ', data.licenses)
        setUserLicenses(+data.licenses)
      } catch (error) {
        console.log('error: ', error)
      }
    })()
  }, [])
  //
  const [anchorEl, setAnchorEl] = useState(null)
  const copyApiToClipboard = event => {
    setAnchorEl(event.currentTarget)
    navigator.clipboard.writeText(userApi)
  }
  const handleClosePopover = () => {
    setAnchorEl(null)
  }
  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  let history = useHistory()
  const goToSettings = () => {
    onCloseClick()
    history.push(routes.settingsAccount)
  }

  const dispatch = useDispatch()
  const logOut = () => {
    dispatch(authOperations.logOut())
  }

  const unsubscribe = () => {
    onCloseClick()
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.logoutHeader}></div>

        <div className={styles.header}>
          <UserLogo width="88px" border="6px solid #fff" userLogo={userLogo} />
          <div className={styles.userInfo}>
            <div className={styles.userName}>{userName}</div>
            <StyledUserPlan account={usePlan}>
              {usePlan.toLowerCase() === 'god mode' ? (
                usePlan
              ) : (
                <>
                  <span className={styles.userAccountTitle}>{usePlan}</span>
                  account
                </>
              )}
            </StyledUserPlan>
            <div className={styles.userNameLicenses}>
              {usePlan.toLowerCase() === 'god mode' ? (
                <>
                  <span className={styles.greenLicenses}>Unlimited</span>
                  licenses
                </>
              ) : (
                <>
                  {typeof userLicenses === 'number' ? (
                    <>
                      {userLicenses > 5 ? (
                        <span className={styles.greenLicenses}>
                          {userLicenses}
                        </span>
                      ) : (
                        <span className={styles.redLicenses}>
                          {userLicenses}
                        </span>
                      )}
                      licenses left
                    </>
                  ) : (
                    <MiniLoading />
                  )}
                </>
              )}
            </div>
          </div>
          <div className={styles.logOutButton} onClick={logOut}>
            <LogOut />
          </div>
        </div>
        {!(usePlan.toLowerCase() === 'god mode') && (
          <div className={styles.button}>
            <Licenses />{' '}
            <span className={styles.buttonText}>Buy more licenses</span>
          </div>
        )}
        <div className={styles.button} onClick={copyApiToClipboard}>
          <Docs />
          <span className={styles.buttonText}>API: {userApi}</span>
        </div>
        {/* Connect with Zapier */}
        <div className={styles.button}>
          <Connect />
          <span className={styles.buttonText}>Connect with Zapier</span>
        </div>
        {/* Unsubscribe */}
        <div className={styles.button}>
          <Unsubscribe />
          <span
            className={`${styles.buttonText} ${styles.unsubscribe}`}
            onClick={unsubscribe}
          >
            Unsubscribe
          </span>
        </div>

        <div className={styles.upgradeButton}>
          <Button
            bgColor="darkBlue"
            icon={<Upgrade />}
            width="250px"
            onClick={upgradeUserPlan}
          >
            Upgrade
          </Button>
        </div>

        <div className={styles.settingsButton} onClick={goToSettings}>
          <Button
            bgColor="white"
            icon={<Settings />}
            width="250px"
            onClick={goToSettings}
          >
            Settings
          </Button>
        </div>
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <div className={styles.popoverText}>API copied</div>
      </Popover>
    </>
  )
}

// bgColor, onClick, icon, width, children
export default UserModalBlock
