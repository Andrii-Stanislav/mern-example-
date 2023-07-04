const DB = require('./DB')
const Stripe = require('../helpers/Stripe')

const getPlans = async (prodType = 'membership') => {
  const db = new DB()
  const query =
    'select Id, Product, ProductType, SortIndex from SubscriptionProduct'
  const plansFromDb = await db.ExecuteQuery(query)

  const planNames = plansFromDb.recordset
    .filter(plan =>
      plan.ProductType.toLowerCase().includes(prodType.toLowerCase())
    )
    .sort((elA, elB) => elA.SortIndex - elB.SortIndex)
    .map(el => el.Product)

  return planNames
}

const getProducts = async (prodType = 'membership') => {
  const db = new DB()
  const query = 'select Id, Product, ProductType from SubscriptionProduct'
  const { recordset: prNames } = await db.ExecuteQuery(query)
  const productNames = prNames
    .filter(prod => prod.ProductType.toLowerCase() === prodType.toLowerCase())
    .map(prod => prod.Product)

  const allProducts = await Stripe.getAllProducts()
  const products = allProducts.filter(product =>
    productNames.includes(product.name)
  )

  const allPrices = await Stripe.getProductsPrices()

  const plans = products.map(product => {
    const prices = allPrices
      .filter(price => price.product === product.id)
      .filter(price => price.active)
      .reduce((acc, price) => {
        const sameIntervalPrice = acc.find(
          savedPrice =>
            savedPrice.recurring.interval === price.recurring.interval
        )
        if (!sameIntervalPrice) {
          return [...acc, price]
        }
        if (sameIntervalPrice.unit_amount > price.unit_amount) {
          return [...acc.filter(prc => prc.id !== sameIntervalPrice.id), price]
        }
        return acc
      }, [])
      // ** middleware console.log() all chousen plans
      // .map(price => {
      //   console.log('product: ', product.name);
      //   console.log('price: ', price);
      //   return price;
      // })
      .map(price => ({
        id: price.id,
        interval: price.recurring.interval,
        price: (price.unit_amount / 100).toFixed(2),
        oldPrice:
          product.metadata[`old_price_${price.recurring.interval}`] || '',
      }))

    const description = product.description?.split('~').map(desc => desc.trim())

    const image = product.images.length > 0 ? product.images[0] : null
    const color = product.metadata.color || ''

    return {
      id: product.id,
      name: product.name,
      prices,
      description,
      image,
      color,
      otherInfo: product,
    }
  })

  return plans
}

const getProductsByType = async (prodType = 'membership') => {
  const db = new DB()
  const query = `select Id, Product from SubscriptionProduct where ProductType='${prodType}'`
  const result = await db.ExecuteQuery(query)
  return result.recordset
}

module.exports = { getPlans, getProducts, getProductsByType }
