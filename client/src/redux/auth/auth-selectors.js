// import { createSelector } from '@reduxjs/toolkit';

const name = state => state.auth.user.Name
const nickName = state => state.auth.user.Nickname
const id = state => state.auth.user.Id
const plan = state => state.auth.user.AccountType
const email = state => state.auth.user.Email
const api = state => state.auth.user.AccessKey
const licenses = state => state.auth.user.LicensesAvailable
const phone = state => state.auth.user.Phone
const userActivated = state => state.auth.user.Activated === 1
//
const possibleProds = state => state.auth.possibleProducts
const currentSubscription = state => state.auth.currentSubscription?.name
//
const billingName = state => state.auth.stripe.account?.name
const billingEmail = state => state.auth.stripe.account?.email

const city = state => state.auth.stripe.account?.address.city
const state = state => state.auth.stripe.account?.address.state
const street = state => state.auth.stripe.account?.address.line1
const postalCode = state => state.auth.stripe.account?.address.postal_code
//
const cardBrand = state => state.auth.stripe.paymentMetod?.card.brand
const cardCountry = state => state.auth.stripe.paymentMetod?.card.country
const cardNumberLast = state => state.auth.stripe.paymentMetod?.card.last4
const cardExpiryYear = state => state.auth.stripe.paymentMetod?.card.exp_year
const cardExpiryMonth = state => state.auth.stripe.paymentMetod?.card.exp_month
const cardStripeId = state => state.auth.stripe.paymentMetod?.id

//
const elMessengerChat = state => state.auth.reskin.ElmessengerChatSupport
const elMessengerGroup = state => state.auth.reskin.ElmessengerGroupSupport
const elMessengerUnlockUrl = state => state.auth.reskin.ElmessengerUnlockUrl
//
const affiliateUser = state => state.auth?.affiliate?.affiliateUser

const visitors = state => state.auth?.affiliate.visitors
const paid = state => state.auth?.affiliate.paid
const earned = state => state.auth?.affiliate.earned
const due = state => state.auth?.affiliate.due

//
const logo = state => state.auth.user.logo
//
const isLoading = state => state.auth.loading

const isAuthenticated = state => state.auth.isAuthenticated

const authError = state => state.auth.error

const token = state => state.auth.token

const needRedirect = state =>
  !isAuthenticated(state) && !isLoading(state) && !token(state)

const authSelectors = {
  name,
  nickName,
  id,
  plan,
  city,
  state,
  street,
  postalCode,
  userActivated,
  api,
  licenses,
  logo,
  phone,
  email,
  isLoading,
  isAuthenticated,
  authError,
  billingName,
  billingEmail,
  elMessengerChat,
  elMessengerGroup,
  elMessengerUnlockUrl,
  cardBrand,
  cardCountry,
  cardStripeId,
  cardNumberLast,
  cardExpiryYear,
  cardExpiryMonth,
  possibleProds,
  currentSubscription,
  token,
  needRedirect,
  affiliate: {
    affiliateUser,
    visitors,
    paid,
    earned,
    due,
  },
}

export default authSelectors
