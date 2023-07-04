const Billing = require('../model/billing')
const User = require('../model/user')
const { HttpCode, ELMessengerId } = require('../helpers/Constants')
const Stripe = require('../helpers/Stripe')
// TODO it is for ELMessenger plans
// const Licenses = require('../model/license');
// const PasswordHasher = require('../helpers/PasswordHasher');
// todo

const getPlans = async (req, res) => {
  const plans = await Billing.getPlans()
  return res.status(HttpCode.OK).json([...plans])
}

const getProducts = async (req, res) => {
  const products = await Billing.getProducts()
  return res.status(HttpCode.OK).json([...products])
}

const createSubscription = async (req, res) => {
  const { user } = req
  const {
    paymentMethodId,
    plan,
    price,
    interval,
    quantity = 1,
    productType = 'membership',
    name,
    city,
    state,
    street,
    zipCode,
  } = req.body

  // TODO it is for ELMessenger plans
  // const password = PasswordHasher.generate();
  // const hashPassword = PasswordHasher.hashWithSalt(password);
  // if (plan.includes('ELMessenger')) {
  //   const vetifyPhone = await Licenses.getLicensesByPhone(
  //     'some phone',
  //     ELMessengerId,
  //   );
  // }
  // todo

  const [subscription] = await Promise.all([
    Stripe.changeSubscription({
      customerId: user.StripeId,
      prodName: plan,
      price,
      interval,
      quantity,
      paymentMethodId,
    }),
    User.checkAccountType(user),
    await Stripe.createBillingAddress({
      customerId: user.StripeId,
      street,
      name,
      city,
      state,
      zipCode,
    }),
  ])

  // await Stripe.createBillingAddress({
  //   customerId: user.StripeId,
  //   street,
  //   name,
  //   city,
  //   state,
  //   zipCode,
  // })

  // const subscription = await Stripe.changeSubscription({
  //   customerId: user.StripeId,
  //   prodName: plan,
  //   price,
  //   interval,
  //   quantity,
  //   paymentMethodId,
  // })

  const [invoice] = await Promise.all([
    Stripe.getLatestInvoice(subscription.latest_invoice),
    User.activatedUser(user.Id, plan),
  ])

  // const invoice = await Stripe.getLatestInvoice(subscription.latest_invoice)
  // await User.activatedUser(user.Id, plan)

  // TODO it is for ELMessenger plans
  // if (plan.includes('ELMessenger')) {
  // }
  // todo

  return res.status(HttpCode.CREATED).json({ subscription, invoice })
}

// TODO cancelSubscription
const cancelSubscription = async (req, res) => {
  // TODO cancelSubscription
  return res.status(HttpCode.NO_CONTENT).json({})
}

const skipSubscription = async (req, res) => {
  const { user } = req
  await User.activatedUser(user.Id)
  return res.status(HttpCode.CREATED).json({ message: 'User activated' })
}

module.exports = {
  getPlans,
  getProducts,
  createSubscription,
  cancelSubscription,
  skipSubscription,
}
