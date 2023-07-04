import axios from 'axios'
const CancelToken = axios.CancelToken

const clientApi = axios.create({
  baseURL: 'http://localhost:5000',
})
// const clientApi = axios.create({
//   baseURL: 'https://new-cloudki.glitch.me',
// })

const token = {
  set(token) {
    clientApi.defaults.headers.common.Authorization = `Bearer ${token}`
  },
  unset() {
    clientApi.defaults.headers.common.Authorization = ''
  },
}

/* AUTHORIZATION */

// auth

const singUp = body => clientApi.post('/api/auth/signup', body)

const singIn = body => clientApi.post('/api/auth/signin', body)

const recoverPassord = email => clientApi.post('/api/auth/recover', { email })

const verifyRecoverPassword = code => clientApi.get(`/api/auth/recover/${code}`)

const setNewPassord = (password, code) =>
  clientApi.post(`/api/auth/recover/${code}`, { password })

const getCurrent = () => clientApi.get('/api/auth/current')

const logOut = () => clientApi.post('/api/auth/logout')

// user

const editUserInfo = newInfo => clientApi.patch(`/api/user`, newInfo)

const getLicenses = () => clientApi.get('/api/user/licenses')

const sendToSupport = body => clientApi.post(`/api/user/support`, body)

const getPlans = () => clientApi.get('/api/billing/plan')

const getProducts = () => clientApi.get('/api/billing/product')

const getCurrentPlan = stripeId => clientApi.get(`/api/user/plan/${stripeId}`)

const getAllPlansInfo = async stripeId => {
  const result = await Promise.all([
    getPlans(),
    getProducts(),
    getCurrentPlan(stripeId),
  ])
  return {
    plans: result[0].data,
    products: result[1].data,
    currentSubscription: result[2].data.currentSubscription,
  }
}

// settings
const getStripeInfo = stripeId =>
  clientApi.get(`/api/settings/stripe/${stripeId}`)

const getReskinInfo = () => clientApi.get(`/api/settings/reskin`)

const updateReskinInfo = reskin =>
  clientApi.post(`/api/settings/reskin`, reskin)

const getSettingsInfo = async stripeId => {
  const result = await Promise.all([getStripeInfo(stripeId), getReskinInfo()])
  return { stripeInfo: result[0].data, reskinInfo: result[1].data.reskin }
}

const updateStripeInfo = (stripeId, body) =>
  clientApi.post(`/api/settings/stripe/${stripeId}`, body)

const updatePaymentInfo = (stripeId, body) =>
  clientApi.post(`/api/settings/stripe/payment/${stripeId}`, body)

const auth = {
  singUp,
  singIn,
  recoverPassord,
  verifyRecoverPassword,
  setNewPassord,
  getCurrent,
  sendToSupport,
  logOut,
  editUserInfo,
  getLicenses,
  getAllPlansInfo,
  getSettingsInfo,
  updateStripeInfo,
  updateReskinInfo,
  updatePaymentInfo,
}

/* TABLE DATA */

// all table data

let cancelPrevApps
const cancelMessage = 'Operation canceled due to new request.'
const cancelPrevAppsRequest = () => {
  if (typeof cancelPrevApps != typeof undefined) {
    cancelPrevApps.cancel(cancelMessage)
  }
  cancelPrevApps = CancelToken.source()
}

const getFiltered = filter =>
  clientApi.post('/api/apps', filter, {
    cancelToken: cancelPrevApps.token,
  })

const getAllForDownload = table => clientApi.get(`/api/apps/${table}`)

// licenses
const addLicense = newLicense => clientApi.post('/api/license', newLicense)

// upgradeLicensesPlan(name, plan)
const upgradeLicensesPlan = (id, plan) =>
  clientApi.patch('/api/license', { plan, id })

const changeLicensesStatus = (status, licenses) =>
  clientApi.post('/api/license/status', { status, licenses })

const deleteLicenses = arrLicenses => {
  const hash = arrLicenses.reduce((acc, id) => (acc += `${id}&`), '')
  return clientApi.delete(`/api/license?${hash}`)
}

// sub-partners
const addSubPartner = newSubPartner =>
  clientApi.post('/api/subpartners', newSubPartner)

const updateSubPartnersLicenses = body =>
  clientApi.patch('/api/subpartners', body)

const changeSubPartnrsStatus = (status, subPartners) =>
  clientApi.post('/api/subpartners/status', { status, subPartners })

const deleteSubPartners = arrUsersId => {
  const hash = arrUsersId.reduce((acc, id) => (acc += `${id}&`), '')
  return clientApi.delete(`/api/subpartners?${hash}`)
}

const table = {
  getFiltered,
  cancelMessage,
  cancelPrevAppsRequest,
  getAllForDownload,
  addLicense,
  addSubPartner,
  changeLicensesStatus,
  upgradeLicensesPlan,
  deleteLicenses,
  updateSubPartnersLicenses,
  changeSubPartnrsStatus,
  deleteSubPartners,
}

/* SUBSCRIPTION */

const create = (userid, body) =>
  clientApi.post(`/api/billing/subscription/${userid}`, body)

const unsubscribe = userid =>
  clientApi.delete(`/api/billing/subscription/${userid}`)

const skip = userid => clientApi.get(`/api/billing/subscription/skip/${userid}`)

const subscription = { create, unsubscribe, skip }

/* AFFILATE */

const getStats = () => clientApi.get('/api/affiliate')

const getUser = affiliateNick =>
  clientApi.get(`/api/affiliate/${affiliateNick}`)

const affiliate = { getStats, getUser }

// eslint-disable-next-line
export default {
  token,
  auth,
  table,
  subscription,
  affiliate,
}
