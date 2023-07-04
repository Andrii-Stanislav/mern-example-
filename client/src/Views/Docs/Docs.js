import React, { useRef } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Disclaimer from '../../Components/Disclaimer'
import PrivacyPolicy from '../../Components/PrivacyPolicy'
import TermsOfService from '../../Components/TermsOfService'
import DocsFooter from '../../Components/DocsFooter'
import Logo from '../../Components/Logo'

import styles from './Docs.module.css'
import routes from '../../routes'
import authSelectors from '../../redux/auth/auth-selectors'

function Docs() {
  const isAuthenticated = useSelector(authSelectors.isAuthenticated)
  let history = useHistory()

  const goToSignIn = () => {
    history.push(routes.login)
  }

  const goToPartnersArea = () => {
    history.push(routes.partnerAreaExtensions)
  }

  const topPageRef = useRef(null)

  const scrollToTop = () => {
    topPageRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className={styles.container}>
      <div className={styles.topPageRef} ref={topPageRef}></div>
      <div className={styles.header}>
        <div className={styles.logoBox}>
          <Logo />
          <span className={styles.logoText}>CloudKii</span>
        </div>

        {isAuthenticated ? (
          <div className={styles.redirectBtn} onClick={goToPartnersArea}>
            <span className={styles.btnText}>Partners Area</span>
            Partners Area
          </div>
        ) : (
          <div className={styles.redirectBtn} onClick={goToSignIn}>
            <span className={styles.btnText}>Login</span>
            Login
          </div>
        )}
      </div>
      <div className={styles.main}>
        <Switch>
          <Route path={routes.privacy}>
            <div className={styles.title}>Privacy Policy</div>
            <div className={styles.subTitle}>
              How we maintain your private data
            </div>
            <PrivacyPolicy onMount={scrollToTop} />
          </Route>
          <Route path={routes.terms}>
            <div className={styles.title}>Terms of Service</div>
            <div className={styles.subTitle}>
              By using our site or services you agree to the following.
            </div>
            <TermsOfService onMount={scrollToTop} />
          </Route>
          <Route>
            <div className={styles.title}>Disclaimer</div>
            <div className={styles.subTitle}>
              Read Carefully, by using our site, services, software, or anything
              you agree to the following.
            </div>
            <Disclaimer onMount={scrollToTop} />
          </Route>
        </Switch>
      </div>
      <DocsFooter />
    </div>
  )
}

export default Docs
