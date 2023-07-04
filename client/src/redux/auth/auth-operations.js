import api from '../../services/api'
import {
  registerRequest,
  registerSuccess,
  registerError,
  loginRequest,
  loginSuccess,
  loginNewPasswordSuccess,
  loginError,
  skipSubscriptionRequest,
  skipSubscriptionSuccess,
  skipSubscriptionError,
  recoverPasswordRequest,
  recoverPasswordSuccess,
  recoverPasswordError,
  verifyRecoverPasswordRequest,
  verifyRecoverPasswordSuccess,
  verifyRecoverPasswordError,
  setNewPasswordRequest,
  setNewPasswordSuccess,
  setNewPasswordError,
  supportRequest,
  supportSuccess,
  supportError,
  logoutRequest,
  logoutSuccess,
  logoutError,
  editUserInfoRequest,
  editUserInfoSuccess,
  editUserInfoError,
  getPlansRequest,
  getPlansSuccess,
  getPlansError,
  getCurrentUserRequest,
  getCurrentUserSuccess,
  getCurrentUserError,
  getSettingsInfoRequest,
  getSettingsInfoSuccess,
  getSettingsInfoError,
  updateStripeInfoRequest,
  updateStripeInfoSuccess,
  updateStripeInfoError,
  updateReskinRequest,
  updateReskinSuccess,
  updateReskinError,
  updatePaymentInfoRequest,
  updatePaymentInfoSuccess,
  updatePaymentInfoError,
  //
  getAffiliateUserRequest,
  getAffiliateUserSuccess,
  getAffiliateUserError,
  getAffiliateStatsRequest,
  getAffiliateStatsSuccess,
  getAffiliateStatsError,
} from './auth-actions'

import errorHeandler from '../../services/errorHeandler'

const registerUser = newUser => async dispatch => {
  dispatch(registerRequest())
  try {
    const { data } = await api.auth.singUp(newUser)
    api.token.set(data.token)

    dispatch(registerSuccess(data))
  } catch (error) {
    const err = errorHeandler(error)
    if (err) {
      dispatch(registerError(err.response?.data.message))
    }
    dispatch(registerError(null))
  }
}

const logIn = user => async dispatch => {
  dispatch(loginRequest())
  try {
    const { data } = await api.auth.singIn(user)

    if (!data.token) {
      // user without newPasswoed
      dispatch(loginNewPasswordSuccess(data))
      return
    }

    api.token.set(data.token)
    dispatch(loginSuccess(data))
  } catch (error) {
    const err = errorHeandler(error)
    if (err) {
      return dispatch(loginError(err.response?.data.message))
    }
    return dispatch(loginError(null))
  }
}

const recoverPassword = email => async dispatch => {
  dispatch(recoverPasswordRequest())
  try {
    const { data } = await api.auth.recoverPassord(email)
    dispatch(recoverPasswordSuccess(data))
  } catch (error) {
    const err = errorHeandler(error)
    if (err) {
      return dispatch(recoverPasswordError(err.response?.data.message))
    }
    return dispatch(recoverPasswordError(null))
  }
}

const verifyRecoverPassword = code => async dispatch => {
  dispatch(verifyRecoverPasswordRequest())
  try {
    const { data } = await api.auth.verifyRecoverPassword(code)
    dispatch(verifyRecoverPasswordSuccess(data))
  } catch (error) {
    const err = errorHeandler(error)
    if (err) {
      return dispatch(verifyRecoverPasswordError(err.response?.data.message))
    }
    return dispatch(verifyRecoverPasswordError(null))
  }
}

const setNewPassword = (password, code) => async dispatch => {
  dispatch(setNewPasswordRequest())
  try {
    const { data } = await api.auth.setNewPassord(password, code)
    dispatch(setNewPasswordSuccess(data))
  } catch (error) {
    const err = errorHeandler(error)
    if (err) {
      return dispatch(setNewPasswordError(err.response?.data.message))
    }
    return dispatch(setNewPasswordError(null))
  }
}

const sendSupport = body => async dispatch => {
  dispatch(supportRequest())
  try {
    await api.auth.sendToSupport(body)
    dispatch(supportSuccess())
  } catch (error) {
    const err = errorHeandler(error)
    if (err) {
      return dispatch(supportError(err.response?.data.message))
    }
    return dispatch(supportError(null))
  }
}

const logOut = () => async dispatch => {
  dispatch(logoutRequest())
  try {
    await api.auth.logOut()
    api.token.unset()
    dispatch(logoutSuccess())
  } catch (error) {
    const err = errorHeandler(error)
    if (err) {
      return dispatch(logoutError(err.response?.data.message))
    }
    return dispatch(logoutError(null))
  }
}

const editUserInfo = newInfo => async dispatch => {
  dispatch(editUserInfoRequest())
  try {
    await api.auth.editUserInfo(newInfo)
    dispatch(editUserInfoSuccess(newInfo))
  } catch (error) {
    const err = errorHeandler(error)
    if (err) {
      return dispatch(editUserInfoError(err.response?.data.message))
    }
    return dispatch(editUserInfoError(null))
  }
}

const getCurrentUser = () => async (dispatch, getState) => {
  const {
    auth: { token: persistedToken },
  } = getState()

  if (!persistedToken) {
    return
  }

  api.token.set(persistedToken)
  dispatch(getCurrentUserRequest())
  try {
    const { data } = await api.auth.getCurrent()
    dispatch(getCurrentUserSuccess(data.user))
  } catch (error) {
    const err = errorHeandler(error)
    if (err) {
      return dispatch(getCurrentUserError(err.response?.data.message))
    }
    return dispatch(getCurrentUserError(null))
  }
}

const getPlans = () => async (dispatch, getState) => {
  const {
    auth: { user },
  } = getState()

  dispatch(getPlansRequest())
  try {
    const plans = await api.auth.getAllPlansInfo(user.StripeId)
    dispatch(getPlansSuccess(plans))
  } catch (error) {
    const err = errorHeandler(error)
    if (err) {
      return dispatch(getPlansError(err.response?.data.message))
    }
    return dispatch(getPlansError(null))
  }
}

const getSettingsInfo = () => async (dispatch, getState) => {
  const {
    auth: { user },
  } = getState()

  dispatch(getSettingsInfoRequest())
  try {
    const settings = await api.auth.getSettingsInfo(user.StripeId)
    dispatch(getSettingsInfoSuccess(settings))
  } catch (error) {
    const err = errorHeandler(error)
    if (err) {
      return dispatch(getSettingsInfoError(err.response?.data.message))
    }
    return dispatch(getSettingsInfoError(null))
  }
}

const updateStripeInfo = body => async (dispatch, getState) => {
  const {
    auth: { user },
  } = getState()

  dispatch(updateStripeInfoRequest())
  try {
    const { data } = await api.auth.updateStripeInfo(user.StripeId, body)
    console.log(data)
    dispatch(updateStripeInfoSuccess(data))
  } catch (error) {
    const err = errorHeandler(error)
    if (err) {
      return dispatch(updateStripeInfoError(err.response?.data.message))
    }
    return dispatch(updateStripeInfoError(null))
  }
}

const updateReskinInfo = body => async (dispatch, getState) => {
  const {
    auth: { user },
  } = getState()

  dispatch(updateReskinRequest())
  try {
    await api.auth.updateReskinInfo(user.Id, body)
    dispatch(updateReskinSuccess(body))
  } catch (error) {
    const err = errorHeandler(error)
    if (err) {
      return dispatch(updateReskinError(err.response?.data.message))
    }
    return dispatch(updateReskinError(null))
  }
}

const updatePaymentInfo = body => async (dispatch, getState) => {
  const {
    auth: { user },
  } = getState()

  dispatch(updatePaymentInfoRequest())
  try {
    await api.auth.updatePaymentInfo(user.StripeId, body)
    dispatch(updatePaymentInfoSuccess(body))
  } catch (error) {
    const err = errorHeandler(error)
    if (err) {
      return dispatch(updatePaymentInfoError(err.response?.data.message))
    }
    return dispatch(updatePaymentInfoError(null))
  }
}

const skipSubscription = () => async (dispatch, getState) => {
  const {
    auth: { user },
  } = getState()

  dispatch(skipSubscriptionRequest())
  try {
    await api.subscription.skip(user.Id)
    dispatch(skipSubscriptionSuccess())
  } catch (error) {
    const err = errorHeandler(error)
    if (err) {
      return dispatch(skipSubscriptionError(err.response?.data.message))
    }
    return dispatch(skipSubscriptionError(null))
  }
}

const getAffiliateUser = affiliateNick => async (dispatch, getState) => {
  dispatch(getAffiliateUserRequest())

  try {
    const { data } = await api.affiliate.getUser(affiliateNick)

    dispatch(getAffiliateUserSuccess(data))
  } catch (error) {
    const err = errorHeandler(error)
    if (err) {
      dispatch(getAffiliateUserError(err.response?.data.message))
    }
    dispatch(getAffiliateUserError(null))
  }
}

const getAffiliateStats = () => async (dispatch, getState) => {
  const {
    auth: { token: persistedToken },
  } = getState()

  if (!persistedToken) {
    return
  }

  api.token.set(persistedToken)
  dispatch(getAffiliateStatsRequest())

  try {
    const { data } = await api.affiliate.getStats()

    dispatch(getAffiliateStatsSuccess(data))
  } catch (error) {
    const err = errorHeandler(error)
    if (err) {
      dispatch(getAffiliateStatsError(err.response?.data.message))
    }
    dispatch(getAffiliateStatsError(null))
  }
}

const authOperations = {
  registerUser,
  logIn,
  recoverPassword,
  verifyRecoverPassword,
  setNewPassword,
  sendSupport,
  logOut,
  editUserInfo,
  getPlans,
  getCurrentUser,
  getSettingsInfo,
  updateStripeInfo,
  updateReskinInfo,
  updatePaymentInfo,
  skipSubscription,
  getAffiliateUser,
  getAffiliateStats,
}

export default authOperations
