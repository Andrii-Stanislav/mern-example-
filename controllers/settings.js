const Settings = require('../model/settings')
const { HttpCode } = require('../helpers/Constants')

const getStripeInfo = async (req, res) => {
  const { stripeId } = req.params
  const { account, paymentMetod } = await Settings.getStripeInfo(stripeId)

  return res.status(HttpCode.OK).json({
    account,
    paymentMetod,
  })
}

const updateStripeInfo = async (req, res) => {
  const { stripeId } = req.params
  const { body } = req

  const updatedAccount = await Settings.updateStripeInfo(stripeId, body)

  return res.status(HttpCode.OK).json({
    ...updatedAccount,
  })
}

const updatePaymentMethod = async (req, res) => {
  const { stripeId } = req.params
  const { paymentId } = req.body
  const result = await Settings.updatePaymentMethod(stripeId, paymentId)

  return res.status(HttpCode.OK).json({
    result,
  })
}

const getReskinInfo = async (req, res) => {
  const { user } = req
  const reskin = await Settings.getReskin(user.Id)

  return res.status(HttpCode.OK).json({
    reskin,
  })
}

const updateReskinInfo = async (req, res) => {
  const { user, body } = req
  await Settings.updateReskin(user.Id, body)

  return res.status(HttpCode.OK).json({})
}

module.exports = {
  getStripeInfo,
  getReskinInfo,
  updateStripeInfo,
  updateReskinInfo,
  updatePaymentMethod,
}
