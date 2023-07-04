import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Switch, Route, NavLink, Redirect, useHistory } from 'react-router-dom'

import MainContainer from '../../Containers/MainContainer'
import AccountSettings from '../SettingsAccount'
import SettingsPayment from '../SettingsPayment'
import SettingsReskin from '../SettingsReskin'

import Arrow from '../../Components/svg/Arrow'

import authOperations from '../../redux/auth/auth-operations'

import styles from './SettingsPage.module.css'
import routes from '../../routes'

function SettingsPage() {
  let history = useHistory()

  const handleGoBack = event => {
    event.preventDefault()
    history.push(routes.partnerArea)
  }

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(authOperations.getSettingsInfo())
  }, [dispatch])

  return (
    <MainContainer>
      <button onClick={handleGoBack} className={styles.goBackBtn}>
        <Arrow />
        Back to main page
      </button>
      <div className={styles.title}>Settings</div>
      <div className={styles.buttonsBlock}>
        <NavLink
          to={routes.settingsAccount}
          className={styles.buttonControl}
          activeClassName={styles.activeButton}
        >
          Account
        </NavLink>
        <NavLink
          to={routes.settingsPayment}
          className={styles.buttonControl}
          activeClassName={styles.activeButton}
        >
          Payment
        </NavLink>
        <NavLink
          to={routes.settingsReskin}
          className={styles.buttonControl}
          activeClassName={styles.activeButton}
        >
          Reskin
        </NavLink>
      </div>
      <Switch>
        <Route path={routes.settingsAccount} component={AccountSettings} />
        <Route path={routes.settingsPayment} component={SettingsPayment} />
        <Route path={routes.settingsReskin} component={SettingsReskin} />
        <Redirect to={routes.settingsAccount} />
      </Switch>
    </MainContainer>
  )
}

export default SettingsPage

/*
              <NavLink
                to={routes.settingsAccount}
                className={styles.navLink}
                activeClassName={styles.activeLink}
              >
                Account
              </NavLink>
              <NavLink
                to={routes.settingsPayment}
                className={styles.navLink}
                activeClassName={styles.activeLink}
              >
                Payment
              </NavLink>
              <NavLink
                to={routes.settingsReskin}
                className={styles.navLink}
                activeClassName={styles.activeLink}
              >
                Reskin
              </NavLink>

*/
