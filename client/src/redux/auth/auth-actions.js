import { createAction } from '@reduxjs/toolkit'

const setAuthError = createAction('auth/setAuthError')

const resetAuthError = createAction('auth/resetAuthError')

const registerRequest = createAction('auth/registerRequest')
const registerSuccess = createAction('auth/registerSuccess')
const registerError = createAction('auth/registerError')

const loginRequest = createAction('auth/loginRequest')
const loginSuccess = createAction('auth/loginSuccess')
const loginNewPasswordSuccess = createAction('auth/loginNewPasswordSuccess')
const loginError = createAction('auth/loginError')

const skipSubscriptionRequest = createAction('auth/skipSubscriptionRequest')
const skipSubscriptionSuccess = createAction('auth/skipSubscriptionSuccess')
const skipSubscriptionError = createAction('auth/skipSubscriptionError')

const recoverPasswordRequest = createAction('auth/recoverPasswordRequest')
const recoverPasswordSuccess = createAction('auth/recoverPasswordSuccess')
const recoverPasswordError = createAction('auth/recoverPasswordError')

const verifyRecoverPasswordRequest = createAction(
  'auth/verifyRecoverPasswordRequest'
)
const verifyRecoverPasswordSuccess = createAction(
  'auth/verifyRecoverPasswordSuccess'
)
const verifyRecoverPasswordError = createAction(
  'auth/verifyRecoverPasswordError'
)

const setNewPasswordRequest = createAction('auth/setNewPasswordRequest')
const setNewPasswordSuccess = createAction('auth/setNewPasswordSuccess')
const setNewPasswordError = createAction('auth/setNewPasswordError')

const supportRequest = createAction('auth/supportRequest')
const supportSuccess = createAction('auth/supportSuccess')
const supportError = createAction('auth/supportError')

const logoutRequest = createAction('auth/logoutRequest')
const logoutSuccess = createAction('auth/logoutSuccess')
const logoutError = createAction('auth/logoutError')

const editUserInfoRequest = createAction('auth/editUserInfoRequest')
const editUserInfoSuccess = createAction('auth/editUserInfoSuccess')
const editUserInfoError = createAction('auth/editUserInfoError')

const getPlansRequest = createAction('auth/getPlansRequest')
const getPlansSuccess = createAction('auth/getPlansSuccess')
const getPlansError = createAction('auth/getPlansError')

const getCurrentUserRequest = createAction('auth/getCurrentUserRequest')
const getCurrentUserSuccess = createAction('auth/getCurrentUserSuccess')
const getCurrentUserError = createAction('auth/getCurrentUserError')

const getSettingsInfoRequest = createAction('auth/getSettingsInfoRequest')
const getSettingsInfoSuccess = createAction('auth/getSettingsInfoSuccess')
const getSettingsInfoError = createAction('auth/getSettingsInfoError')

const updateStripeInfoRequest = createAction('auth/updateStripeInfoRequest')
const updateStripeInfoSuccess = createAction('auth/updateStripeInfoSuccess')
const updateStripeInfoError = createAction('auth/updateStripeInfoError')

const updateReskinRequest = createAction('auth/updateReskinRequest')
const updateReskinSuccess = createAction('auth/updateReskinSuccess')
const updateReskinError = createAction('auth/updateReskinError')

const updatePaymentInfoRequest = createAction('auth/updatePaymentInfoRequest')
const updatePaymentInfoSuccess = createAction('auth/updatePaymentInfoSuccess')
const updatePaymentInfoError = createAction('auth/updatePaymentInfoError')

// Affiliate

const getAffiliateUserRequest = createAction('affiliate/getUserRequest')
const getAffiliateUserSuccess = createAction('affiliate/getUserSuccess')
const getAffiliateUserError = createAction('affiliate/getUserError')

const getAffiliateStatsRequest = createAction('affiliate/getStatsRequest')
const getAffiliateStatsSuccess = createAction('affiliate/getStatsSuccess')
const getAffiliateStatsError = createAction('affiliate/getStatsError')

export {
  setAuthError,
  resetAuthError,
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
}
