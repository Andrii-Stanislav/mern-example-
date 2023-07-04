import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, Redirect } from 'react-router-dom'

import LoginContainer from '../../Containers/LoginContainer'
import Button from '../../Components/Button'
import InputPassword from '../../Components/InputPassword'

import styles from './ConfirmPasswordRecover.module.css'
import routes from '../../routes'
import authOperations from '../../redux/auth/auth-operations'
import authSelectors from '../../redux/auth/auth-selectors'
import { setAuthError } from '../../redux/auth/auth-actions'

function ConfirmPasswordRecover() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [requestSent, setRequestSent] = useState(false)
  const [error, setError] = useState(false)

  const authError = useSelector(authSelectors.authError)
  let history = useHistory()
  const dispatch = useDispatch()

  const query = history.location?.search
    .slice(1)
    .split('&')
    .reduce((acc, query) => {
      const [name, value] = query.split('=')
      return { ...acc, [name]: value }
    }, {})

  useEffect(() => {
    dispatch(authOperations.verifyRecoverPassword(query.code))
  }, [dispatch, query?.code])

  useEffect(() => {
    if (authError === `User can't update password`) {
      history.push(routes.login)
    }
    setError(authError)
  }, [authError, history])

  const heandleChange = ({ target }) => {
    switch (target.name) {
      case 'password':
        setPassword(target.value)
        break
      case 'confirmPassword':
        setConfirmPassword(target.value)
        break
      default:
    }
  }

  const recoverPassword = event => {
    event.preventDefault()
    if (password !== confirmPassword) {
      return dispatch(
        setAuthError(`"Password" and "Confirm Password" must coincide`)
      )
    }

    setRequestSent(true)
    dispatch(authOperations.setNewPassword(password, query.code))
  }

  const goToSignIn = () => {
    history.push(routes.login)
  }

  if (!query.code) {
    return <Redirect to={routes.login} />
  }

  return (
    <LoginContainer
      mainTitle="Confirm Password Recovering"
      headerText="Write your new password"
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
                  <p className={styles.info}>Password success updated</p>
                </div>
                <Button bgColor="lightBlue" width="100%" onClick={goToSignIn}>
                  Go to Sign In
                </Button>
              </>
            )}
          </div>
        ) : (
          <form onSubmit={recoverPassword} className={styles.container}>
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

            <Button type="submit" bgColor="lightBlue" width="100%">
              Update password
            </Button>
          </form>
        )}
      </>
    </LoginContainer>
  )
}

export default ConfirmPasswordRecover
