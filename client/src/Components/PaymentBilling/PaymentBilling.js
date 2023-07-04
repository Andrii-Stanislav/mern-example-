import React, { useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import SetingsInput from '../../Components/SetingsInput'
import ConfirmCancelButtons from '../ConfirmCancelButtons'

import Pen from '../../Components/svg/Pen'

import styles from './PaymentBilling.module.css'
import authSelectors from '../../redux/auth/auth-selectors'
import authOperations from '../../redux/auth/auth-operations'

function PaymentBilling() {
  const [editMode, setEditMode] = useState(false)

  const [name, setName] = useState(useSelector(authSelectors.billingName))
  const prevName = useRef('')
  const [email, setEmail] = useState(useSelector(authSelectors.billingEmail))
  const prevEmail = useRef('')
  //
  const [city, setCity] = useState(useSelector(authSelectors.city))
  const prevCity = useRef('')
  const [state, setState] = useState(useSelector(authSelectors.state))
  const prevState = useRef('')
  const [street, setStreet] = useState(useSelector(authSelectors.street))
  const prevStreet = useRef('')
  const [postCode, setPostCode] = useState(
    useSelector(authSelectors.postalCode)
  )
  const prevPostCode = useRef('')

  const changeInputValue = ({ target }) => {
    switch (target.name) {
      case 'name':
        setName(target.value)
        break
      case 'email':
        setEmail(target.value)
        break
      case 'city':
        setCity(target.value)
        break
      case 'state':
        setState(target.value)
        break
      case 'street':
        setStreet(target.value)
        break
      case 'postCode':
        setPostCode(target.value)
        break
      default:
    }
  }

  const heandleEditInfo = () => {
    prevName.current = name
    prevEmail.current = email
    prevCity.current = city
    prevState.current = state
    prevStreet.current = street
    prevPostCode.current = postCode

    setEditMode(true)
  }

  const cancelEditInfo = () => {
    setName(prevName.current)
    setEmail(prevEmail.current)
    setCity(prevCity.current)
    setState(prevState.current)
    setStreet(prevStreet.current)
    setPostCode(prevPostCode.current)

    setEditMode(false)
  }

  const dispatch = useDispatch()

  const confirmEditInfo = () => {
    setEditMode(false)
    dispatch(
      authOperations.updateStripeInfo({
        name,
        email,
        city,
        state,
        postal_code: postCode,
        line1: street,
      })
    )
  }

  return (
    <div className={styles.main}>
      <div className={styles.subTitle}>Billing Details</div>

      <div className={styles.container}>
        {editMode && (
          <div className={styles.editButton}>
            <ConfirmCancelButtons
              confirm={confirmEditInfo}
              cancel={cancelEditInfo}
            />
          </div>
        )}
        {!editMode && (
          <div className={styles.editButton} onClick={heandleEditInfo}>
            <Pen />
            <span>Edit</span>
          </div>
        )}

        <div className={styles.inputBox}>
          <div className={styles.userInfoLabel}>Name</div>
          <SetingsInput
            name="name"
            value={name}
            onChange={changeInputValue}
            editMode={editMode}
            placeholder="No Data"
          />
        </div>

        <div className={styles.inputBox}>
          <div className={styles.userInfoLabel}>Email</div>
          <SetingsInput
            name="email"
            type="email"
            value={email}
            onChange={changeInputValue}
            editMode={editMode}
            placeholder="No Data"
          />
        </div>

        <div className={styles.inputBox}>
          <div className={styles.userInfoLabel}>City</div>
          <SetingsInput
            name="city"
            value={city}
            onChange={changeInputValue}
            editMode={editMode}
            placeholder="No Data"
          />
        </div>

        <div className={styles.inputBox}>
          <div className={styles.userInfoLabel}>State</div>
          <SetingsInput
            name="state"
            value={state}
            onChange={changeInputValue}
            editMode={editMode}
            placeholder="No Data"
          />
        </div>

        <div className={styles.inputBox}>
          <div className={styles.userInfoLabel}>Street</div>
          <SetingsInput
            name="street"
            value={street}
            onChange={changeInputValue}
            editMode={editMode}
            placeholder="No Data"
          />
        </div>

        <div className={styles.inputBox}>
          <div className={styles.userInfoLabel}>Postal code</div>
          <SetingsInput
            name="postCode"
            value={postCode}
            onChange={changeInputValue}
            editMode={editMode}
            placeholder="No Data"
          />
        </div>
      </div>
    </div>
  )
}

export default PaymentBilling
