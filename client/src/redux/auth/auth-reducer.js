import { createReducer } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import {
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
} from './auth-actions'

import {
  initialUserState,
  initialAffiliate,
  initialSubscription,
} from './userState'

const user = createReducer(initialUserState, {
  [registerSuccess]: (_, { payload }) => payload.user,
  [loginSuccess]: (_, { payload }) => payload.user,
  [loginNewPasswordSuccess]: (_, { payload }) => payload.user,
  [logoutSuccess]: () => initialUserState,
  [editUserInfoSuccess]: (state, { payload }) => ({ ...state, ...payload }),
  [getCurrentUserSuccess]: (_, { payload }) => payload,
  [skipSubscriptionSuccess]: (state, _) => ({ ...state, Activated: 1 }),
})

const plans = createReducer(null, {
  [getPlansSuccess]: (_, { payload }) => payload.plans,
})

const currentSubscription = createReducer(initialSubscription, {
  [getPlansSuccess]: (_, { payload }) => payload.currentSubscription,
})

const possibleProducts = createReducer(null, {
  [getPlansSuccess]: (_, { payload }) => payload.products,
})

const stripe = createReducer(
  {},
  {
    [getSettingsInfoSuccess]: (_, { payload }) => payload.stripeInfo,
    [updateStripeInfoSuccess]: (state, { payload }) => ({
      ...state,
      account: payload,
    }),
    [updatePaymentInfoSuccess]: (state, { payload }) => ({
      ...state,
      paymentMetods: payload,
    }),
    [logoutSuccess]: () => {},
  }
)

const reskin = createReducer(
  {},
  {
    [getSettingsInfoSuccess]: (_, { payload }) => payload.reskinInfo,
    [updateReskinSuccess]: (state, { payload }) => ({ ...state, ...payload }),
    [logoutSuccess]: () => {},
  }
)

const affiliate = createReducer(initialAffiliate, {
  [getAffiliateStatsSuccess]: (state, { payload }) => ({
    ...state,
    ...payload,
  }),
  [getAffiliateUserSuccess]: (state, { payload }) => ({
    ...state,
    ...payload,
  }),
})

const isAuthenticated = createReducer(false, {
  [registerSuccess]: () => true,
  [loginSuccess]: () => true,
  [loginError]: () => false,
  [getCurrentUserSuccess]: () => true,
  [getCurrentUserError]: () => false,
  [logoutSuccess]: () => false,
})

const token = createReducer(null, {
  [registerSuccess]: (_, { payload }) => payload.token,
  [loginSuccess]: (_, { payload }) => payload.token,
  [getCurrentUserError]: () => null,
  [logoutSuccess]: () => null,
})

const errorFunc = (_, { payload }) => {
  console.log(payload)
  return payload
}
const error = createReducer(null, {
  [setAuthError]: (_, { payload }) => payload,
  [resetAuthError]: (_, __) => null,
  [registerError]: errorFunc,
  [loginError]: errorFunc,
  [skipSubscriptionError]: errorFunc,
  [recoverPasswordError]: errorFunc,
  [verifyRecoverPasswordError]: errorFunc,
  [setNewPasswordError]: errorFunc,
  [supportError]: errorFunc,
  [logoutError]: errorFunc,
  [editUserInfoError]: errorFunc,
  [getPlansError]: errorFunc,
  [getCurrentUserError]: errorFunc,
  [getSettingsInfoError]: errorFunc,
  [updateReskinError]: errorFunc,
  [updatePaymentInfoError]: errorFunc,
  [getAffiliateStatsError]: errorFunc,
  [getAffiliateUserError]: errorFunc,
})

const loading = createReducer(false, {
  [registerRequest]: () => true,
  [registerSuccess]: () => false,
  [registerError]: () => false,
  [loginRequest]: () => true,
  [loginSuccess]: () => false,
  [loginNewPasswordSuccess]: () => false,
  [loginError]: () => false,
  [skipSubscriptionRequest]: () => true,
  [skipSubscriptionSuccess]: () => false,
  [skipSubscriptionError]: () => false,
  [recoverPasswordRequest]: () => true,
  [recoverPasswordSuccess]: () => false,
  [recoverPasswordError]: () => false,
  [verifyRecoverPasswordRequest]: () => true,
  [verifyRecoverPasswordSuccess]: () => false,
  [verifyRecoverPasswordError]: () => false,
  [setNewPasswordRequest]: () => true,
  [setNewPasswordSuccess]: () => false,
  [setNewPasswordError]: () => false,
  [supportRequest]: () => true,
  [supportSuccess]: () => false,
  [supportError]: () => false,
  [logoutRequest]: () => true,
  [logoutSuccess]: () => false,
  [logoutError]: () => false,
  [editUserInfoRequest]: () => true,
  [editUserInfoSuccess]: () => false,
  [editUserInfoError]: () => false,
  [getPlansRequest]: () => true,
  [getPlansSuccess]: () => false,
  [getPlansError]: () => false,
  [getCurrentUserRequest]: () => true,
  [getCurrentUserSuccess]: () => false,
  [getCurrentUserError]: () => false,
  [getSettingsInfoRequest]: () => true,
  [getSettingsInfoSuccess]: () => false,
  [getSettingsInfoError]: () => false,
  [updateStripeInfoRequest]: () => true,
  [updateStripeInfoSuccess]: () => false,
  [updateStripeInfoError]: () => false,
  [updateReskinRequest]: () => true,
  [updateReskinSuccess]: () => false,
  [updateReskinError]: () => false,
  [updatePaymentInfoRequest]: () => true,
  [updatePaymentInfoSuccess]: () => false,
  [updatePaymentInfoError]: () => false,

  [getAffiliateUserRequest]: () => true,
  [getAffiliateUserSuccess]: () => false,
  [getAffiliateUserError]: () => false,
  [getAffiliateStatsRequest]: () => true,
  [getAffiliateStatsSuccess]: () => false,
  [getAffiliateStatsError]: () => false,
})

export default combineReducers({
  user,
  plans,
  possibleProducts,
  currentSubscription,
  stripe,
  reskin,
  affiliate,
  isAuthenticated,
  token,
  error,
  loading,
})
