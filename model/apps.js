const DB = require('./DB')
const CreateQuery = require('../helpers/CreateQuery')

const getFilteredData = async body => {
  const db = new DB()

  const query = CreateQuery({
    table: body.table,
    userId: body.userId,
    search: body.filterText,
    sortField: body.sortField,
    // filterApp: body.app,
    start_date: body.startDate,
    end_date: body.endDate,
    sortDir: (() => {
      switch (body.sortDirGrow) {
        case true:
          return 'ASC'
        case false:
          return 'DESC'
        default:
          return null
      }
    })(),
  })

  const result = await db.ExecuteQuery(query)
  return result.recordset
}

const getAllData = async (table, userId) => {
  const db = new DB()
  const query = CreateQuery({ table, userId })
  const result = await db.ExecuteQuery(query)
  return result.recordset
}

const getLicensesPlans = async () => {
  const db = new DB()
  const query = `select * from AppPlan`
  const plans = await db.ExecuteQuery(query)
  return plans.recordset.reduce((acc, plan) => {
    if (acc[plan.AppId]) {
      acc[plan.AppId] = [
        ...acc[plan.AppId],
        { id: plan.Id, name: plan.Name, price: plan.LicenseCost },
      ]
    } else {
      acc[plan.AppId] = [
        { id: plan.Id, name: plan.Name, price: plan.LicenseCost },
      ]
    }
    return acc
  }, {})
}

const getAppsList = async () => {
  const db = new DB()
  const query = `select * from App where Enabled=1`
  const response = await db.ExecuteQuery(query)
  return response.recordset
}

module.exports = { getFilteredData, getAllData, getLicensesPlans, getAppsList }
