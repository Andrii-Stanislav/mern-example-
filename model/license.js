const DB = require('./DB')
const Stripe = require('../helpers/Stripe')

const addLicense = async body => {
  const db = new DB()
  const {
    userId,
    name,
    email,
    appId,
    phone,
    planId,
    hashPassword,
    remoteUserId = '0',
  } = body

  const query = `insert into License ( UserId, Name, Email, Password, AppId, Status, Phone, PlanId, RemoteId ) values ( ${userId}, '${name}', '${email}', '${hashPassword}', ${appId}, 1, '${phone}', ${planId}, ${remoteUserId} )`

  return await db.ExecuteQuery(query)
}

const getAppInfo = async appId => {
  const db = new DB()
  const query = `Select app.Name, app.Link, appType.Type [TypeName] from App app 
                            left join AppType appType on appType.Id = app.Type
                            where app.Id=${appId}`
  const result = await db.ExecuteQuery(query)
  return result.recordset[0]
}

const getLicensesByEmail = async (email, appId) => {
  const db = new DB()
  const query = `Select * from License where Email='${email}' and AppId=${appId}`
  const result = await db.ExecuteQuery(query)
  return result.recordset[0]
}

const getLicensesByPhone = async (phone, appId) => {
  const db = new DB()
  const query = `Select * from License where Phone='${phone}' and AppId=${appId}`
  const result = await db.ExecuteQuery(query)
  return result.recordset[0]
}

const getLicensesById = async id => {
  const db = new DB()
  const query = `select lic.*, appPlan.LicenseCost from License lic
                  inner join AppPlan appPlan on appPlan.Id = lic.PlanId
                    where lic.Id=${id}`

  const result = await db.ExecuteQuery(query)
  return result.recordset[0]
}

const updateLicensesStatus = async (id, status) => {
  const db = new DB()
  let query
  switch (status) {
    case 'Active':
      query = `update License set Status=1 where Id=${id}`
      break
    case 'Inactive':
      query = `update License set Status=2 where Id=${id}`
      break
  }
  await db.ExecuteQuery(query)
}

const updateLicensesPlan = async (planId, id) => {
  const db = new DB()
  const query = `UPDATE [License] SET PlanId=${planId} WHERE Id = ${id}`
  await db.ExecuteQuery(query)
}

const getUserById = async userId => {
  const db = new DB()
  const query = `Select * From [User] where id=${userId}`
  const result = await db.ExecuteQuery(query)
  return result.recordset[0]
}

const getUserAvailableLicensesCount = async user => {
  if (user.UnlimitedPartner > 0) {
    return 10000
  }
  const db = new DB()

  const subscriptionProducts = (
    await db.ExecuteQuery('SELECT * FROM SubscriptionProduct')
  ).recordset

  const products = await Stripe.getSubscriptionProducts(user.StripeId)
  console.log('products: ', products)
  const licenses = products
    .map(product => {
      const item = subscriptionProducts.find(
        el => el.Product.toLowerCase() === product.name.toLowerCase()
      )
      if (!item) {
        return 0
      }
      return item.Licenses
    })

    .reduce((acc, license) => (acc += license), 0)
  //
  const usedLicensesResponse =
    await db.ExecuteScalar(`select top 1 u.Licenses - isnull(usedLicenses.Count, 0) - isnull(subPartner.Licenses, 0) as Licenses
                                from [User] u

								cross apply(
									select SUM(aplan.LicenseCost) [Count]
									from License l
                                    left join AppPlan aplan ON aplan.Id = l.PlanId
									where l.UserId = u.Id AND aplan.Free != 1
								) usedLicenses
								
                                cross apply(
									select Sum(sub.Licenses) [Licenses]
									from [User] sub
									where sub.Creator = u.Id
								) subPartner
                                where u.Id=${user.Id}`)
  const usedLicenses = usedLicensesResponse.recordset[0].Licenses

  return licenses + usedLicenses
}

const getAppPlan = async appPlanId => {
  const db = new DB()
  const query = `select * from AppPlan where Id = ${appPlanId}`
  const result = await db.ExecuteQuery(query)
  return result.recordset[0]
}

const removeLicense = async id => {
  const db = new DB()
  const query = `delete from License where Id=${id}`
  return await db.ExecuteQuery(query)
}

const updateLicensesUserId = async (userId, prevUserId) => {
  const db = new DB()
  const query = `UPDATE [License] SET UserId=${userId} WHERE UserId=${prevUserId}`
  await db.ExecuteQuery(query)
}

module.exports = {
  addLicense,
  getAppInfo,
  getLicensesByEmail,
  getLicensesByPhone,
  getLicensesById,
  updateLicensesStatus,
  updateLicensesPlan,
  getAppPlan,
  removeLicense,
  getUserById,
  getUserAvailableLicensesCount,
  updateLicensesUserId,
}
