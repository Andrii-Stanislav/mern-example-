import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Cookies from 'js-cookie'

import LoginContainer from '../../Containers/LoginContainer'
import Input from '../../Components/Input'
import InputPassword from '../../Components/InputPassword'
import InputPhone from '../../Components/InputPhone'
import Checkbox from '../../Components/Checkbox'
import Button from '../../Components/Button'

import CustomPopover from './Popover'

import User from '../../Components/svg/User'
import Mail from '../../Components/svg/Mail'
import NextStep from '../../Components/svg/NextStep'
import Info from '../../Components/svg/Info'

import styles from './Register.module.css'
import routes from '../../routes'
import authOperations from '../../redux/auth/auth-operations'
import authSelectors from '../../redux/auth/auth-selectors'
import { setAuthError } from '../../redux/auth/auth-actions'
import validate from '../../services/validation'

function Register() {
  const [anchorEl, setAnchorEl] = useState(null)
  const [inputInfo, setInputInfo] = useState('')

  const onHoverEnter = ({ currentTarget }) => {
    setAnchorEl(currentTarget)
  }

  const onHoverLeave = () => {
    setAnchorEl(null)
  }

  const handleClosePopover = () => {
    setAnchorEl(null)
  }

  //
  const affiliate = useSelector(authSelectors.affiliate.affiliateUser)

  const [formStep, setFormStep] = useState(1)

  const [fullName, setFullName] = useState('')
  const [userName, setUserName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [agreeWithPolicy, setAgreeWithPolicy] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    const affiliateNick = Cookies.get('Affiliate')
    if (affiliateNick) {
      dispatch(authOperations.getAffiliateUser(affiliateNick))
    }
  }, [dispatch])

  const heandleChange = ({ target }) => {
    switch (target.name) {
      case 'fullName':
        setFullName(target.value)
        break
      case 'userName':
        setUserName(target.value)
        break
      case 'phone':
        setPhone(target.value)
        break
      case 'email':
        setEmail(target.value)
        break
      case 'password':
        setPassword(target.value)
        break
      case 'confirmPassword':
        setConfirmPassword(target.value)
        break

      default:
    }
  }

  let history = useHistory()
  const goToSignIn = () => {
    history.push(routes.login)
  }

  const register = event => {
    event.preventDefault()
    const { result: passwordValid, message } = validate.isPassword(password)
    if (!passwordValid) {
      return dispatch(setAuthError(message))
    }

    if (password !== confirmPassword) {
      return dispatch(
        setAuthError(`"Password" and "Confirm Password" must coincide`)
      )
    }

    if (!agreeWithPolicy) {
      return dispatch(setAuthError(`Please agree with the No-refund Policy`))
    }

    dispatch(
      authOperations.registerUser({
        fullName,
        userName,
        phone,
        password,
        email,
        affiliate,
      })
    )
  }

  const goToSecondForm = () => {
    const { result: fullNameValid, message } = validate.isFullName(fullName)

    if (!fullNameValid || fullName.length < 2) {
      return dispatch(setAuthError(message || 'Full Name not valid!'))
    }

    const { result: userNameValid } = validate.isNickName(userName)
    if (!userNameValid || userName.length < 2) {
      return dispatch(setAuthError('User Name not valid!'))
    }

    setFormStep(2)
  }

  const goToThirdForm = () => {
    if (phone.length < 11) {
      return dispatch(setAuthError('Write phone. Min 11 numbers'))
    }

    const { result: emailValid } = validate.isEmail(email)
    if (!emailValid) {
      return dispatch(setAuthError('Email not valid!'))
    }

    setFormStep(3)
  }

  return (
    <LoginContainer
      mainTitle="Nice to meet you"
      headerText="Create your account"
    >
      <form className={styles.formBox} onSubmit={register}>
        {formStep === 1 && (
          <div className={styles.partOfForm}>
            <p className={styles.subtitle}>1/3 Personal information</p>
            <p className={styles.label}>
              <span>Full Name</span>{' '}
              <span
                onPointerEnter={e => {
                  setInputInfo('fullName')
                  onHoverEnter(e)
                }}
                onPointerLeave={onHoverLeave}
              >
                <Info />
              </span>
            </p>
            <div className={styles.inputBox}>
              <Input
                name="fullName"
                value={fullName}
                onChange={heandleChange}
                width="100%"
                min="2"
                required
                placeholder="Enter your name"
                icon={<User />}
              />
            </div>
            <p className={styles.label}>
              <span>User Name</span>{' '}
              <span
                onPointerEnter={e => {
                  setInputInfo('userName')
                  onHoverEnter(e)
                }}
                onPointerLeave={onHoverLeave}
              >
                <Info />
              </span>
            </p>
            <div className={styles.inputBox}>
              <Input
                name="userName"
                value={userName}
                onChange={heandleChange}
                width="100%"
                min="2"
                required
                placeholder="Enter user name"
                icon={<User />}
              />
            </div>
            <div className={styles.nextStep}>
              <NextStep />
              <Button
                type="button"
                bgColor="lightBlue"
                width="100%"
                onClick={goToSecondForm}
              >
                Next Step
              </Button>
            </div>

            <div className={styles.signInButton}>
              <Button
                type="button"
                bgColor="transparent"
                width="100%"
                onClick={goToSignIn}
              >
                Sign In
              </Button>
            </div>
          </div>
        )}

        {formStep === 2 && (
          <div className={styles.partOfForm}>
            <p className={styles.subtitle}>2/3 Contact information</p>
            <p className={styles.label}>Full Phone Number</p>
            <div className={styles.inputBox}>
              <InputPhone value={phone} onChange={phone => setPhone(phone)} />
            </div>
            <p className={styles.label}>Email</p>
            <div className={styles.inputBox}>
              <Input
                type="email"
                name="email"
                value={email}
                onChange={heandleChange}
                width="100%"
                min="9"
                required
                placeholder="Enter your email"
                icon={<Mail />}
              />
            </div>
            <div className={styles.nextStep}>
              <NextStep />
              <Button
                type="button"
                bgColor="lightBlue"
                width="100%"
                onClick={goToThirdForm}
              >
                Next Step
              </Button>
            </div>
            <div className={styles.prevStep} onClick={() => setFormStep(1)}>
              <NextStep />
              <span>Previous Step</span>
            </div>
          </div>
        )}

        {formStep === 3 && (
          <div className={styles.partOfForm}>
            <p className={styles.subtitle}>3/3 Password </p>
            <p className={styles.label}>
              <span> Password</span>{' '}
              <span
                onPointerEnter={e => {
                  setInputInfo('password')
                  onHoverEnter(e)
                }}
                onPointerLeave={onHoverLeave}
              >
                <Info />
              </span>
            </p>
            <div className={styles.inputBox}>
              <InputPassword
                name="password"
                value={password}
                onChange={heandleChange}
                width="100%"
                required
              />
            </div>
            <p className={styles.label}>Confirm Password</p>
            <div className={styles.inputBox}>
              <InputPassword
                name="confirmPassword"
                value={confirmPassword}
                onChange={heandleChange}
                width="100%"
                required
              />
            </div>
            <div className={styles.checkbox}>
              <Checkbox
                id={Date.now()}
                labelText="I agree to the No-refund Policy"
                onChange={e => setAgreeWithPolicy(e.target.checked)}
                checked={agreeWithPolicy}
              />
            </div>
            <Button type="submit" bgColor="lightBlue" width="100%">
              Create an account
            </Button>
            <div className={styles.prevStep} onClick={() => setFormStep(2)}>
              <NextStep />
              <span>Previous Step</span>
            </div>
          </div>
        )}
        {affiliate && (
          <div className={styles.affiliate}>
            <span>Affiliate Partner</span>{' '}
            <span className={styles.affiliateNickName}>
              {affiliate.Nickname}
            </span>
          </div>
        )}

        {/*  */}
        <CustomPopover
          anchorEl={anchorEl}
          handleClosePopover={handleClosePopover}
        >
          <div className={styles.hoverInfoBox}>
            {inputInfo === 'fullName' && (
              <ul>
                <li>Only letter</li>
                <li>Min 2 symbol</li>
              </ul>
            )}
            {inputInfo === 'userName' && (
              <ul>
                <li>Only letter</li>
                <li>Can use number</li>
                <li>Without spaces</li>
                <li>Min 2 symbol</li>
                <li>Unic value</li>
              </ul>
            )}
            {inputInfo === 'password' && (
              <ul>
                <li>Need use capital letter</li>
                <li>Need use number</li>
                <li>Min 6 symbol</li>
              </ul>
            )}
          </div>
        </CustomPopover>
      </form>
    </LoginContainer>
  )
}

export default Register
