import React, { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import UserLogo from '../../Components/UserLogo'
import SetingsInput from '../../Components/SetingsInput'
import Button from '../../Components/Button'
import Modal from '../../Containers/Modal'
import UpgradePlan from '../../Components/UpgradePlan'
import ConfirmCancelButtons from '../../Components/ConfirmCancelButtons'
import InputPhone from '../../Components/InputPhone'

import PhotoCamera from '../../Components/svg/PhotoCamera'
import Pen from '../../Components/svg/Pen'
import Upgrade from '../../Components/svg/Upgrade'

import styles from './SettingsAccount.module.css'
import authSelectors from '../../redux/auth/auth-selectors'
import authOperations from '../../redux/auth/auth-operations'
import { setAuthError } from '../../redux/auth/auth-actions'

import validate from '../../services/validation'
import userLogo from '../../images/default-user.png'

function AccountSettings() {
  const name = useSelector(authSelectors.name)
  const phone = useSelector(authSelectors.phone)
  const email = useSelector(authSelectors.email)

  const [userName, setUserName] = useState('')
  const prevName = useRef('')
  const [userPhone, setUserPhone] = useState('')
  const prevPhone = useRef('')
  const [userEmail, setUserEmail] = useState()
  const prevEmail = useRef('')

  useEffect(() => {
    setUserName(name)
  }, [name])
  useEffect(() => {
    setUserPhone(phone)
  }, [phone])
  useEffect(() => {
    setUserEmail(email)
  }, [email])

  const [editMode, setEditMode] = useState(false)
  const [modalPlanShow, setPlanModalShow] = useState(false)

  const changeInputValue = ({ target }) => {
    switch (target.name) {
      case 'userName':
        setUserName(target.value)
        break
      case 'userEmail':
        setUserEmail(target.value)
        break
      default:
    }
  }

  const heandleEditPersonalInfo = () => {
    prevName.current = userName
    prevPhone.current = userPhone
    prevEmail.current = userEmail
    setEditMode(true)
  }

  const cancelPersonalInfo = () => {
    setUserName(prevName.current)
    setUserPhone(prevPhone.current)
    setUserEmail(prevEmail.current)

    setEditMode(false)
  }

  const dispatch = useDispatch()
  const confirmPersonalInfo = () => {
    const { result: fullNameValid } = validate.isFullName(userName)
    if (!fullNameValid) {
      return dispatch(setAuthError('Full Name not valid!'))
    }

    const { result: emailValid } = validate.isEmail(userEmail)
    if (!emailValid) {
      return dispatch(setAuthError('Email not valid!'))
    }

    setEditMode(false)
    dispatch(
      authOperations.editUserInfo({
        Name: userName,
        Phone: userPhone,
        Email: userEmail,
      })
    )
  }

  const upgradeUserPlan = () => {
    dispatch(authOperations.getPlans())
    setPlanModalShow(true)
  }

  return (
    <>
      <div className={styles.settingsContainer}>
        <div className={styles.subTitle}>Personal Information</div>
        <div className={styles.userInfoBlock}>
          <div className={styles.logoBox}>
            <UserLogo userLogo={userLogo} width="100px" />
            <div className={styles.editLogo}>
              <PhotoCamera />
            </div>
          </div>
          <div>
            <div className={styles.inputBox}>
              <div className={styles.userInfoLabel}>Full name</div>
              <SetingsInput
                name="userName"
                value={userName}
                onChange={changeInputValue}
                editMode={editMode}
              />
            </div>

            <div className={styles.inputBox}>
              <div className={styles.userInfoLabel}>Email</div>
              <SetingsInput
                name="userEmail"
                type="email"
                value={userEmail}
                onChange={changeInputValue}
                editMode={editMode}
              />
            </div>

            <div className={styles.inputBox}>
              <div className={styles.userInfoLabel}>Phone number</div>
              <InputPhone
                value={userPhone}
                onChange={phone => setUserPhone(phone)}
                disabled={!editMode}
              />
            </div>

            {!editMode && (
              <div
                className={styles.editButton}
                onClick={heandleEditPersonalInfo}
              >
                <Pen />
                <span>Edit</span>
              </div>
            )}
            {editMode && (
              <div className={styles.editButton}>
                <ConfirmCancelButtons
                  confirm={confirmPersonalInfo}
                  cancel={cancelPersonalInfo}
                />
              </div>
            )}
          </div>
        </div>

        <div className={styles.subTitle}>User Information</div>
        <div className={styles.userInfoBlock}>
          <div className={styles.planInfoBlock}>
            <div className={styles.inputBox}>
              <div className={styles.userInfoLabel}>User name </div>
              <div className={styles.userInfoText}>
                {useSelector(authSelectors.nickName)}
              </div>
            </div>
            <div className={styles.inputBox}>
              <div className={styles.userInfoLabel}>ID</div>
              <div className={styles.userInfoText}>
                {useSelector(authSelectors.id)}
              </div>
            </div>
            <div className={styles.inputBox}>
              <div className={styles.userInfoLabel}>Plan</div>
              <div className={styles.userInfoPlan}>
                {useSelector(authSelectors.plan)}
              </div>
            </div>
          </div>
          <div className={styles.upgradeBtn}>
            <Button
              icon={<Upgrade />}
              bgColor="darkBlue"
              onClick={upgradeUserPlan}
            >
              Upgrade
            </Button>
          </div>
        </div>
      </div>
      <Modal
        size="lg"
        show={modalPlanShow}
        onHide={() => setPlanModalShow(false)}
      >
        <UpgradePlan onCloseClick={() => setPlanModalShow(false)} />
      </Modal>
    </>
  )
}

export default AccountSettings
