import React from 'react'

import Logo from '../../Components/Logo'
import DocsFooter from '../../Components/DocsFooter'

import LoginGoal from '../../Components/svg/LoginGoal'

import styles from './LoginContainer.module.css'

function LoginContainer({ children, headerText, mainTitle, subTitle }) {
  return (
    <div className={styles.page}>
      <div className={styles.topTrapeze}></div>
      <div className={styles.topTrapeze}></div>

      <div className={styles.container}>
        <div className={styles.logoTitle}>
          <Logo />
          <div className={styles.cloudKii}>CloudKii</div>
        </div>
        <div className={styles.mainTitle}>{mainTitle}</div>
        {subTitle && <div className={styles.subTitle}>{subTitle}</div>}
        <div className={styles.content}>
          <div className={styles.goalSvg}>
            <LoginGoal />
          </div>
          {headerText && <div className={styles.header}>{headerText}</div>}
          <div className={styles.children}>{children}</div>
        </div>
      </div>
      <DocsFooter />
    </div>
  )
}

export default LoginContainer
