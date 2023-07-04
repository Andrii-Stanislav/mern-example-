require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_SECRET)
// const stripe = require('stripe')(process.env.STRIPE_SECRET_LIVE)

const listOptions = { limit: 100 }

// const subscriptionContainsProductInterval = (
//   subscription,
//   productIds,
//   interval = ''
// ) => {
//   for (const item of subscription.items.data) {
//     if (
//       productIds.includes(item.price.product) &&
//       (item.plan.interval === interval || interval === '')
//     ) {
//       return true
//     }
//   }
//   return false
// }

const createCustomer = async (name, email) => {
  return await stripe.customers.create({
    name,
    email,
  })
}

const getAllSubscriptions = async customerId => {
  return (await stripe.subscriptions.list({ customer: customerId })).data
}

const getProductsPrices = async () => {
  return (await stripe.prices.list(listOptions)).data
}

const getSubscriptionItems = async subId => {
  return (
    await stripe.subscriptionItems.list({
      subscription: subId,
    })
  ).data
}

const getAllProducts = async () => {
  return (await stripe.products.list(listOptions)).data
}

const getPriceExact = async (productId, interval, priceCount) => {
  const price = (await getProductsPrices())
    .filter(price => price.product === productId)
    .find(
      price =>
        price.recurring.interval === interval &&
        price.unit_amount === priceCount * 100
    )

  return price
}

const getSubscriptionProducts = async (customerId, productNames) => {
  const subscriptions = await getAllSubscriptions(customerId)
  console.log('stripe subscriptions: ', subscriptions)

  const products = []
  const allProducts = await getAllProducts()

  for (const subscription of subscriptions) {
    const subscriptionItems = await getSubscriptionItems(subscription.id)

    subscriptionItems.forEach(item => {
      if (!productNames) {
        const element = allProducts.find(
          product => product.id === item.price.product
        )

        if (element) {
          element.name += ` ${item.price.recurring.interval}`

          for (let i = 0; i < item.quantity; i++) {
            products.push(element)
          }
        }
      } else {
        const all = allProducts
          .filter(product => productNames.includes(product.name))
          .map(el => el.id)

        if (all.includes(item.price.product)) {
          for (let i = 0; i < item.quantity; i++) {
            products.push(
              allProducts.find(elem => elem.id === item.price.product)
            )
          }
        }
      }
    })
  }
  return products
}

const getCustomerInfo = async customerId => {
  return await stripe.customers.retrieve(customerId)
}

const updateCustomerInfo = async (customerId, body) => {
  return await stripe.customers.update(customerId, {
    ...body,
  })
}

const getPaymentMethods = async (customerId, type = 'card') => {
  const result = await stripe.paymentMethods.list({
    customer: customerId,
    type,
  })
  console.log('getPaymentMethods: ', result)
  return result.data[0]
}

const attachPaymentToCustomer = async (customerId, paymentMethodId) => {
  return await stripe.paymentMethods.attach(paymentMethodId, {
    customer: customerId,
  })
}

const updatePaymentMethod = async (customerId, paymentId) => {
  const attachedCard = await attachPaymentToCustomer(customerId, paymentId)
  await updateCustomerInfo(customerId, {
    invoice_settings: { default_payment_method: paymentId },
  })
  return attachedCard
}

const createBillingAddress = async ({
  customerId,
  street,
  name,
  city,
  state,
  zipCode,
}) => {
  return (
    await stripe.customers.update(customerId, {
      address: { city, line1: street, state, postal_code: zipCode },
      name,
    })
  ).data
  //
}

const changeSubscription = async ({
  customerId,
  prodName,
  price,
  interval,
  quantity = 1,
  paymentMethodId = null,
}) => {
  const allProducts = await getAllProducts()

  const subscritions = await getAllSubscriptions(customerId)

  const subscrition = subscritions.length > 0 ? subscritions[0] : null
  const productId = allProducts.find(prod => prod.name === prodName)?.id

  const priceId = await getPriceExact(productId, interval, price)?.id

  if (paymentMethodId) {
    const paymentMethod = await attachPaymentToCustomer(
      customerId,
      paymentMethodId
    )
    await updateCustomerInfo(customerId, {
      invoice_settings: { default_payment_method: paymentMethod.id },
    })
  }

  console.log('sub before check: ')
  if (!subscrition) {
    // If doesn't exist, create new
    console.log(`If doesn't exist, create new`)
    return await stripe.subscriptions.create({
      customer: customerId,
      items: [
        {
          price: priceId,
          price_data: {
            product: productId,
            currency: 'usd',
            recurring: { interval },
            unit_amount: price * 100,
          },
          quantity,
        },
      ],
    })
  }

  return await stripe.subscriptions.update(subscrition.id, {
    cancel_at_period_end: false,
    proration_behavior: 'always_invoice',
    items: [
      {
        id: subscrition.items.data[0].id,
        price: priceId,
        price_data: {
          product: productId,
          currency: 'usd',
          recurring: { interval },
          unit_amount: price * 100,
        },
      },
    ],
  })
}

const getLatestInvoice = async invoiceId => {
  return await stripe.invoices.retrieve(invoiceId)
}

const deleteSubscription = async subId => {
  return await stripe.subscriptions.del(subId, {
    invoice_now: false,
    prorate: false,
  })
}

module.exports = {
  createCustomer,
  getAllProducts,
  getAllSubscriptions,
  getSubscriptionProducts,
  getCustomerInfo,
  getPaymentMethods,
  updateCustomerInfo,
  updatePaymentMethod,
  getProductsPrices,
  createBillingAddress,
  changeSubscription,
  getLatestInvoice,
  deleteSubscription,
}
