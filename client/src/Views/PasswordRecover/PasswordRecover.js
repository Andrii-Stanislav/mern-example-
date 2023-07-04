import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import LoginContainer from '../../Containers/LoginContainer'
import Input from '../../Components/Input'
import Button from '../../Components/Button'

import Mail from '../../Components/svg/Mail'

import styles from './PasswordRecover.module.css'
import routes from '../../routes'
import authOperations from '../../redux/auth/auth-operations'
import authSelectors from '../../redux/auth/auth-selectors'

function PasswordRecover() {
  const [email, setEmail] = useState('')
  const [requestSent, setRequestSent] = useState(false)
  const [error, setError] = useState(false)

  const authError = useSelector(authSelectors.authError)

  useEffect(() => {
    if (authError) {
      setError(authError)
    }
  }, [authError])

  const heandleChange = ({ target }) => {
    setEmail(target.value)
  }

  let history = useHistory()
  const goToSignIp = () => {
    history.push(routes.login)
  }

  const dispatch = useDispatch()
  const recoverPassword = event => {
    event.preventDefault()

    setRequestSent(true)
    dispatch(authOperations.recoverPassword(email))
  }

  return (
    <LoginContainer
      mainTitle="Forgot Password?"
      headerText="Enter email to recover password"
    >
      <>
        {requestSent ? (
          <div className={styles.container}>
            {error ? (
              <div className={styles.infoBox}>
                <p className={styles.info}>{error}</p>
              </div>
            ) : (
              <>
                <div className={styles.infoBox}>
                  <p className={styles.info}>
                    <b>Email has been sent.</b> <br />
                    Please, check your email
                  </p>
                </div>

                <Button bgColor="lightBlue" width="100%" onClick={goToSignIp}>
                  Back to Sign In
                </Button>
              </>
            )}
          </div>
        ) : (
          <form onSubmit={recoverPassword} className={styles.container}>
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
            <div className={styles.buttonBox}>
              <Button type="submit" bgColor="lightBlue" width="100%">
                Send
              </Button>
            </div>

            <Button
              type="button"
              bgColor="transparent"
              width="100%"
              onClick={goToSignIp}
            >
              Sign In
            </Button>
          </form>
        )}
      </>
    </LoginContainer>
  )
}

export default PasswordRecover
