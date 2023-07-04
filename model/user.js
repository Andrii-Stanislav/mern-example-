const DB = require('./DB')
const { accountTypes } = require('../helpers/Constants')
const Stripe = require('../helpers/Stripe')

const checkAccountType = async user => {
  if (user.UnlimitedPersonal > 0) {
    return accountTypes.UnlimitedPersonal
  }
  if (user.UnlimitedPartner > 0) {
    return accountTypes.GodMode
  }

  const db = new DB()

  const query = `SELECT * FROM SubscriptionProduct where ProductType='Membership' OR ProductType='Membership Plan'`
  const memberProducts = await db.ExecuteQuery(query)

  const prodNames = memberProducts.recordset.map(prod => prod.Product)
  console.log('prodNames in checkAccountType: ', prodNames)

  const products = await Stripe.getSubscriptionProducts(
    user.StripeId,
    prodNames
  )

  console.log('products: ', products)

  return products.length > 0
    ? products[0].name
        .replace('year', '')
        .replace('Year', '')
        .replace('month', '')
        .replace('Month', '')
    : accountTypes.BasicAccount
}

const getUserById = async userId => {
  const db = new DB()
  const query = `select top 1 u.Email as Email, IsAdmin, u.Id, u.Name, AccessKey, u.Zapier, u.Activated, u.Nickname, u.Phone, u.StripeId, u.Licenses, u.AccountType, u.UnlimitedPersonal, u.UnlimitedPartner  
                                from [User] u      
								cross apply(
									select Count(l.Id) [Count]
									from License l
									where l.UserId = u.Id
								) usedLicenses
								
                                where u.Id=${userId}`
  const result = await db.ExecuteQuery(query)
  const user = result.recordset[0]

  user.AccountType = await checkAccountType(user)

  return user
}

const editUserInfo = async (userId, newInfo) => {
  const db = new DB()
  const { Email, Phone, Name } = newInfo

  const query = `UPDATE [User] set Name='${Name}', Email='${Email}', Phone='${Phone}' where Id=${userId}`
  const result = await db.ExecuteQuery(query)
  return result.recordset
}

const getCurrentPlan = async (stripeId, productType = 'membership') => {
  const subscriptions = await Stripe.getAllSubscriptions(stripeId)

  if (subscriptions.length === 0) {
    return { name: 'No subscription', type: null, quantity: 0, interval: null }
  } else {
    const allProducts = await Stripe.getAllProducts()

    const currentSubscription = subscriptions.map(
      sub =>
        sub.items.data.map(item => {
          const targetProduct = allProducts.find(
            prod => prod.id === item.price.product
          )

          const name = targetProduct.name
          const type = productType.toLowerCase()
          const { quantity } = item
          const { interval } = item.price.recurring

          return { name, type, quantity, interval }
        })[0]
    )

    return currentSubscription[0]
  }
}

const activatedUser = async (userId, plan = 2) => {
  const db = new DB()
  const planId = plan === 'Partner' ? 1 : 2
  const query = `UPDATE [User] set Activated=1, AccountType=${planId} where Id = ${userId}`
  await db.ExecuteQuery(query)
}

module.exports = {
  checkAccountType,
  getUserById,
  editUserInfo,
  getCurrentPlan,
  activatedUser,
}
