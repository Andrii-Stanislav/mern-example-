const User = require('../model/user')
const Licenses = require('../model/license')
const { HttpCode } = require('../helpers/Constants')

const editPersonalInfo = async (req, res, next) => {
  const { user, body } = req
  await User.editUserInfo(user.Id, body)
  return res.status(HttpCode.OK).json({
    message: 'Edit user info',
  })
}

const getCurrentPlan = async (req, res, next) => {
  const { stripeId } = req.params

  const plan = await User.getCurrentPlan(stripeId)

  return res.status(HttpCode.OK).json({
    currentSubscription: plan,
  })
}

const getUserLicense = async (req, res, next) => {
  const { user } = req

  const licenses = await Licenses.getUserAvailableLicensesCount(user)

  return res.status(HttpCode.OK).json({
    licenses,
  })
}

// TODO Support
const support = async (req, res, next) => {
  const { name, email, query } = req.body
  console.log('support')
  console.log('name: ', name)
  console.log('email: ', email)
  console.log('query: ', query)

  return res.status(HttpCode.OK).json({
    message: 'Yor message saved',
  })
}

module.exports = {
  editPersonalInfo,
  getCurrentPlan,
  getUserLicense,
  support,
}
