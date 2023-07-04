const Apps = require('../model/apps')
const { HttpCode } = require('../helpers/Constants')

const getFiltered = async (req, res) => {
  const { body, user } = req

  const manyResults = await Promise.all([
    Apps.getFilteredData({ ...body, userId: user.Id }),
    Apps.getLicensesPlans(),
    Apps.getAppsList(),
  ])

  const result = manyResults[0]
  const licensesPlans = manyResults[1]
  const allApps = manyResults[2]

  // !!! HARDCODE hidden apps without connection on personal DB
  const allActiveApps = allApps.filter(
    app => !['ELMOptimizer', 'ELMatic'].includes(app.Name)
  )
  // !!!

  if (result) {
    const { page, pageSize = 15 } = body
    const totalPages = Math.ceil(result.length / pageSize)

    const responseArr = result?.slice(pageSize * (page - 1), page * pageSize)

    res.status(HttpCode.OK).json({
      message: 'success',
      data: responseArr,
      page,
      total: result.length,
      totalPages,
      licensesPlans,
      allApps: allActiveApps,
    })
  } else {
    res.status(HttpCode.BAD_REQUEST).json({
      message: 'Bad request',
    })
  }
}

const getAll = async (req, res) => {
  const { table } = req.params
  const { user } = req

  const result = await Apps.getAllData(table, user.Id)

  if (!result) {
    res.status(HttpCode.BAD_REQUEST).json({
      message: 'Bad request',
    })
  }
  res.status(HttpCode.OK).json({
    message: 'success',
    data: result,
  })
}

module.exports = {
  getFiltered,
  getAll,
}
