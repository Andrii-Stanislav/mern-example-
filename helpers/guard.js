const { HttpCode } = require('./Constants')
const Auth = require('../model/auth')
const compareDates = require('./compareDates')

const guard = async (req, res, next) => {
  try {
    const { authorization } = req.headers

    if (!authorization) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        message: 'UNAUTHORIZED',
      })
    }
    const token = authorization.split(' ')[1]
    const user = await Auth.getUserByToken(token)

    if (!user) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        message: 'UNAUTHORIZED',
      })
    }

    const expired = String(user.ExpiredTime)
    const currentDate = String(new Date(Date.now()).toISOString())

    const checkExpires = compareDates(expired, currentDate)

    if (!checkExpires) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        message: 'Token expired',
      })
    }

    req.user = user
    return next()
  } catch (error) {
    return res.status(HttpCode.UNAUTHORIZED).json({
      message: 'UNAUTHORIZED',
    })
  }
}

module.exports = guard
