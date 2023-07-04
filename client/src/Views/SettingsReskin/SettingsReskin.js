import React, { useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import SetingsInput from '../../Components/SetingsInput'
import ConfirmCancelButtons from '../../Components/ConfirmCancelButtons'

import Pen from '../../Components/svg/Pen'

import styles from './SettingsReskin.module.css'
import authSelectors from '../../redux/auth/auth-selectors'
import authOperations from '../../redux/auth/auth-operations'

function SettingsReskin() {
  const elMessengerChat = useSelector(authSelectors.elMessengerChat)
  const elMessengerGroup = useSelector(authSelectors.elMessengerGroup)
  const elMessengerUnlockUrl = useSelector(authSelectors.elMessengerUnlockUrl)

  const [supportLink, setSupportLink] = useState(elMessengerChat)
  const prevSupportLink = useRef('')
  const [officialGroupLink, setOfficialGroupLink] = useState(elMessengerGroup)
  const prevOfficialGroupLink = useRef('')
  const [unlockUrl, setUnlockUrl] = useState(elMessengerUnlockUrl)
  const prevUnlockUrl = useRef('')

  const [editMode, setEditMode] = useState(false)

  const changeInputValue = ({ target }) => {
    switch (target.name) {
      case 'supportLink':
        setSupportLink(target.value)
        break
      case 'officialGroupLink':
        setOfficialGroupLink(target.value)
        break
      case 'unlockUrl':
        setUnlockUrl(target.value)
        break
      default:
    }
  }

  const heandleEditPersonalInfo = () => {
    prevSupportLink.current = supportLink
    prevOfficialGroupLink.current = officialGroupLink
    prevUnlockUrl.current = unlockUrl
    setEditMode(true)
  }

  const cancelPersonalInfo = () => {
    setSupportLink(prevSupportLink.current)
    setOfficialGroupLink(prevOfficialGroupLink.current)
    setUnlockUrl(prevUnlockUrl.current)

    setEditMode(false)
  }

  const dispatch = useDispatch()

  const confirmPersonalInfo = () => {
    dispatch(
      authOperations.updateReskinInfo({
        ElmessengerChatSupport: supportLink,
        ElmessengerGroupSupport: officialGroupLink,
        ElmessengerUnlockUrl: unlockUrl,
      })
    )
    setEditMode(false)
  }

  return (
    <>
      <div className={styles.subTitle}>ElMessenger Reskin</div>

      <div className={styles.container}>
        <div className={styles.inputBox}>
          <div className={styles.userInfoLabel}>Chat Support Link</div>
          <SetingsInput
            name="supportLink"
            value={supportLink}
            onChange={changeInputValue}
            editMode={editMode}
            placeholder="No Data"
          />
        </div>
        <div className={styles.inputBox}>
          <div className={styles.userInfoLabel}>
            Official Group Support Link
          </div>
          <SetingsInput
            name="officialGroupLink"
            value={officialGroupLink}
            onChange={changeInputValue}
            editMode={editMode}
            placeholder="No Data"
          />
        </div>
        <div className={styles.inputBox}>
          <div className={styles.userInfoLabel}>ELMessenger 'Unlock' URL</div>
          <SetingsInput
            name="unlockUrl"
            value={unlockUrl}
            onChange={changeInputValue}
            editMode={editMode}
            placeholder="No Data"
          />
        </div>
        {!editMode && (
          <div className={styles.editButton} onClick={heandleEditPersonalInfo}>
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
    </>
  )
}

export default SettingsReskin
