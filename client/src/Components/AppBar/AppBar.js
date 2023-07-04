import React, { useState } from 'react'
import { NavLink, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Logo from '../Logo'
import UserLogo from '../UserLogo'
import Button from '../Button'
import Modal from '../../Containers/Modal'
import UserModalBlock from '../UserModalBlock'
import UpgradePlan from '../UpgradePlan'

import CopyLink from '../svg/CopyLink'

import styles from './AppBar.module.css'
import routes from '../../routes'
import authSelectors from '../../redux/auth/auth-selectors'
import authOperations from '../../redux/auth/auth-operations'

function AppBar({ userLogo }) {
  const userName = useSelector(authSelectors.name)
  const nickName = useSelector(authSelectors.nickName)

  const [modalUserShow, setUserModalShow] = useState(false)
  const [modalPlanShow, setPlanModalShow] = useState(false)
  const [modalUnsubscribeShow, setUnsubscribeModalShow] = useState(false)

  const [linkIsCoppied, setLinkIsCoppied] = useState(false)

  const openUserModal = () => {
    setUserModalShow(true)
  }

  const dispatch = useDispatch()
  const upgradeUserPlan = () => {
    dispatch(authOperations.getPlans())
    setUserModalShow(false)
    setPlanModalShow(true)
  }

  const chouseUserPlan = () => {
    setPlanModalShow(false)
  }

  const copyReferralLink = () => {
    navigator.clipboard.writeText(`https://cloudki.io/?r=${nickName}`)
    setLinkIsCoppied(true)
  }

  const backToCopyReferralLink = () => {
    setLinkIsCoppied(false)
  }

  return (
    <>
      <div className={styles.header}>
        <div className={styles.mainNav}>
          <Logo />
          <NavLink
            to={routes.partnerArea}
            className={styles.navLink}
            activeClassName={styles.activeLink}
          >
            Partner Area
          </NavLink>
          <NavLink
            to={routes.affiliateDashboard}
            className={styles.navLink}
            activeClassName={styles.activeLink}
          >
            Affiliate Dashboard
          </NavLink>
        </div>
        <div className={styles.userNav}>
          <Route path={routes.affiliateDashboard}>
            {linkIsCoppied ? (
              <div
                onClick={backToCopyReferralLink}
                className={styles.linkIsCoppied}
              >
                Referral Link Copied
              </div>
            ) : (
              <Button
                bgColor="white"
                icon={<CopyLink />}
                onClick={copyReferralLink}
              >
                Copy referral link
              </Button>
            )}
          </Route>
          <div className={styles.userName} onClick={openUserModal}>
            {userName}
          </div>
          <UserLogo userLogo={userLogo} onClick={openUserModal} />
        </div>
      </div>

      <Modal show={modalUserShow} onHide={() => setUserModalShow(false)}>
        <UserModalBlock
          userLogo={userLogo}
          upgradeUserPlan={upgradeUserPlan}
          onCloseClick={() => setUserModalShow(false)}
        />
      </Modal>
      <Modal
        size="lg"
        show={modalPlanShow}
        onHide={() => setPlanModalShow(false)}
      >
        <UpgradePlan onCloseClick={chouseUserPlan} />
      </Modal>
      <Modal
        show={modalUnsubscribeShow}
        onHide={() => setUnsubscribeModalShow(false)}
      ></Modal>
    </>
  )
}

export default AppBar
