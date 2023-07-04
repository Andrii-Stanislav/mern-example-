const DB = require('./DB')
const Stripe = require('../helpers/Stripe')

const getStripeInfo = async stripeId => {
  const account = await Stripe.getCustomerInfo(stripeId)
  const paymentMetod = await Stripe.getPaymentMethods(stripeId)
  return { account, paymentMetod }
}

const updateStripeInfo = async (stripeId, updateBody) => {
  return await Stripe.updateCustomerInfo(stripeId, updateBody)
}

const updatePaymentMethod = async (customerId, card, paymentId) => {
  return await Stripe.updatePaymentMethod(customerId, card, paymentId)
}

const getReskin = async userId => {
  const db = new DB()
  const query = `SELECT top 1 * from Reskin where userId='${userId}'`
  const result = await db.ExecuteQuery(query)
  return result.recordset[0]
}

const updateReskin = async (userId, settings) => {
  const db = new DB()
  const exists = await db.ExecuteQuery(
    `SELECT top 1 * FROM RESKIN where userId=${userId}`
  )

  if (exists.recordset[0]) {
    await db.ExecuteQuery(
      `UPDATE Reskin set ElmessengerChatSupport='${settings.ElmessengerChatSupport}', ElmessengerGroupSupport='${settings.ElmessengerGroupSupport}', ElmessengerUnlockUrl = '${settings.ElmessengerUnlockUrl}' where userId = ${userId}`
    )
  } else {
    await db.ExecuteQuery(
      `INSERT INTO Reskin (UserId, ElmessengerChatSupport, ElmessengerGroupSupport, ElmessengerUnlockUrl) values(${userId}, '${settings.ElmessengerChatSupport}', '${settings.ElmessengerGroupSupport}', '${settings.ElmessengerUnlockUrl}')`
    )
  }
}

module.exports = {
  getStripeInfo,
  getReskin,
  updateReskin,
  updateStripeInfo,
  updatePaymentMethod,
}
