import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import LoginContainer from '../../Containers/LoginContainer'
import Input from '../../Components/Input'
import InputPassword from '../../Components/InputPassword'
import Button from '../../Components/Button'
// import Accordion from '../../Components/Accordion'

import Mail from '../../Components/svg/Mail'

import styles from './LoginPage.module.css'
import routes from '../../routes'
import authOperations from '../../redux/auth/auth-operations'
import authSelectors from '../../redux/auth/auth-selectors'

function LoginPage() {
  const token = useSelector(authSelectors.token)
  const name = useSelector(authSelectors.name)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const heandleChange = ({ target }) => {
    switch (target.name) {
      case 'email':
        setEmail(target.value)
        break
      case 'password':
        setPassword(target.value)
        break
      default:
    }
  }

  let history = useHistory()
  const goToSignUp = () => {
    history.push(routes.register)
  }

  const dispatch = useDispatch()
  const login = event => {
    event.preventDefault()

    dispatch(authOperations.logIn({ email, password }))
  }

  const recoverPassword = () => {
    history.push(routes.recover)
  }

  return (
    <LoginContainer
      mainTitle="Welcome Back"
      headerText="Sign In to your account"
    >
      {!token && name ? (
        <div className={styles.infoBox}>
          <p className={styles.info}>
            <b>
              Dear {name}! <br />
              For new.cloudki.io you need update your account password from
              cloudki.io. Email with link for update password has been sent.
            </b>{' '}
            <br />
            <br />
            Please, check your email
          </p>
        </div>
      ) : (
        <form onSubmit={login} className={styles.container}>
          <p className={styles.label}>Email</p>
          <div className={styles.inputBox}>
            <Input
              type="email"
              name="email"
              value={email}
              onChange={heandleChange}
              width="100%"
              require
              min="9"
              placeholder="john@gmail.com"
              icon={<Mail />}
            />
          </div>
          <p className={styles.label}>Password</p>
          <div className={styles.inputBox}>
            <InputPassword
              name="password"
              value={password}
              onChange={heandleChange}
              width="100%"
              require
            />
          </div>
          <Button type="submit" bgColor="lightBlue" width="100%">
            Sign In
          </Button>
          <div className={styles.forgotPassword} onClick={recoverPassword}>
            Forgot Password?
          </div>
          <Button
            type="button"
            bgColor="transparent"
            width="100%"
            onClick={goToSignUp}
          >
            Sign Up
          </Button>
        </form>
      )}
    </LoginContainer>
  )
}

export default LoginPage
