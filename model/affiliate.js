const DB = require('./DB')
const {
  firstLevelAffiliateMultiplier,
  secondLevelAffiliateMultiplier,
  commissionDueDays,
} = require('../helpers/Constants')

const getVisitors = async userId => {
  const db = new DB()
  const query = `SELECT Id from AffiliateStatistics where AffiliateId=${userId} and Time >= DATEADD(day, -7, getDate())`
  const result = await db.ExecuteQuery(query)
  return result.recordset.length
}

const getPaid = async userId => {
  const db = new DB()
  const query = `SELECT * from AffiliatePayment where UserId = ${userId}`
  const result = await db.ExecuteQuery(query)
  return result.recordset.reduce((acc, payment) => (acc += payment.Total), 0)
}

const getEarned = async userId => {
  const db = new DB()
  const query = `SELECT inv.[Id], [Created], [Description], Convert(int , [Total]) * ${firstLevelAffiliateMultiplier} [Total], [Name], [Email] FROM [Invoice] 
                        inv inner join [User] u ON u.StripeId  = inv.CustomerId
                        where u.Affiliate = ${userId}`
  const result = await db.ExecuteQuery(query)
  return result.recordset
    .map(payment => payment.Total)
    .reduce((acc, total) => (acc += total), 0)
}

const getDue = async userId => {
  const db = new DB()
  const query = `SELECT inv.[Id], [Created], [Description], Convert(int , [Total]) * ${firstLevelAffiliateMultiplier} [Total], [Name], [Email] FROM [Invoice] 
                        inv inner join [User] u ON u.StripeId  = inv.CustomerId
                        where u.Affiliate = ${userId}
                        and Created <= DATEADD(DAY, - ${commissionDueDays}, GETDATE())`
  const result = await db.ExecuteQuery(query)
  const due = result.recordset
    .map(payment => payment.Total)
    .reduce((acc, total) => (acc += total), 0)

  const querySecondLevel = `SELECT inv.[Id], [Created], [Description], Convert(int , [Total]) * ${secondLevelAffiliateMultiplier} [Total], [Name], [Email] FROM [Invoice] 
                        inv inner join [User] u ON u.StripeId  = inv.CustomerId
                        where u.Affiliate IN (select Id from [User] where Affiliate = ${userId})
                        and Created <= DATEADD(DAY, - ${commissionDueDays}, GETDATE())`
  const resultSecondLevel = await db.ExecuteQuery(querySecondLevel)
  const dueSecondLevel = resultSecondLevel.recordset
    .map(payment => payment.Total)
    .reduce((acc, total) => (acc += total), 0)

  return due + dueSecondLevel
}

module.exports = { getVisitors, getPaid, getEarned, getDue }
