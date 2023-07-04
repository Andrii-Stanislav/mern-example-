import React from 'react'
import { useHistory } from 'react-router-dom'

import styles from './DocsFooter.module.css'
import routes from '../../routes'

function DocsFooter() {
  let history = useHistory()

  const goToDisclaimer = () => {
    history.push(routes.disclaimer)
  }

  const goToTerm = () => {
    history.push(routes.terms)
  }

  const goToPrivacy = () => {
    history.push(routes.privacy)
  }

  return (
    <div className={styles.footer}>
      <div className={styles.footerLink} onClick={goToDisclaimer}>
        Disclaimer
      </div>
      <div className={styles.footerLink} onClick={goToTerm}>
        Term of Service
      </div>
      <div className={styles.footerLink} onClick={goToPrivacy}>
        Privacy Policy
      </div>
    </div>
  )
}

export default DocsFooter
