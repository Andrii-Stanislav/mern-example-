const DB = require('../model/DB')

const controllerHandler = controller => {
  return async (req, res, next) => {
    try {
      const db = new DB()

      await controller(req, res, next)

      await db.closeConnection()
    } catch (error) {
      const db = new DB()
      db.closeConnection()
      next(error)
    }
  }
}

module.exports = controllerHandler
