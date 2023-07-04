const Licenses = require('../model/license')
const { HttpCode, AppTypes } = require('../helpers/Constants')
const PasswordHasher = require('../helpers/PasswordHasher')
const webAppService = require('../services/webAppService')
const EmailServise = require('../services/email')
require('dotenv').config()

const addLicense = async (req, res, next) => {
  const { name, email, phone, appId, planId, appName } = req.body
  const { user } = req

  const [vetifyEmail, vetifyPhone] = await Promise.all([
    Licenses.getLicensesByEmail(email, appId),
    Licenses.getLicensesByPhone(phone, appId),
  ])

  if (vetifyEmail) {
    return res.status(HttpCode.CONFLICT).json({
      message: 'This email already exsists for this app',
    })
  }

  if (vetifyPhone) {
    return res.status(HttpCode.CONFLICT).json({
      message: 'This phone number already exsists for this app',
    })
  }

  const [appPlan, licenses, appInfo] = await Promise.all([
    Licenses.getAppPlan(planId),
    Licenses.getUserAvailableLicensesCount(user),
    Licenses.getAppInfo(appId),
  ])

  if (licenses < appPlan.LicenseCost) {
    return res.status(HttpCode.CONFLICT).json({
      message: 'Not enough licenses on your account',
    })
  }

  const password = PasswordHasher.generate()
  const hashPassword = PasswordHasher.hashWithSalt(password)
  let remoteUserId

  if (appInfo.TypeName === AppTypes.WebApp) {
    try {
      remoteUserId = await webAppService.add(appId, {
        name,
        email,
        password,
      })
      if (!remoteUserId) {
        remoteUserId = '0'
      }
    } catch (error) {
      console.log('error from webAppService addLicense: ', error)
      return next(error)
    }
  }

  await Licenses.addLicense({
    name,
    email,
    phone,
    appId,
    planId,
    hashPassword,
    remoteUserId,
    userId: user.Id,
  })

  try {
    const emailServise = new EmailServise(process.env.NODE_ENV)
    await emailServise.sendEmail({
      templateName: 'CloudKii App License Create Notification',
      recipientEmail: email,
      email,
      appName,
      link: appInfo.Link,
      password,
      name,
    })
  } catch (error) {
    console.log('Error in licenses emailServise.sendEmail')
  }

  return res.status(HttpCode.CREATED).json({
    message: 'success',
    userLicenses: licenses - appPlan.LicenseCost,
  })
}

const upgradePlan = async (req, res, next) => {
  const { plan, id } = req.body

  const { user } = req

  const [appPlan, licenses, license] = await Promise.all([
    Licenses.getAppPlan(plan.id),
    Licenses.getUserAvailableLicensesCount(user),
    Licenses.getLicensesById(id),
  ])

  if (appPlan.Free != 1 && licenses <= 0) {
    return res.status(HttpCode.CONFLICT).json({
      message: 'No licenses on your account',
    })
  }

  if (licenses < appPlan.LicenseCost) {
    return res.status(HttpCode.CONFLICT).json({
      message: 'Not enough licenses on your account',
    })
  }

  if (license.RemoteId !== 0) {
    try {
      const result = await webAppService.updatePlan(
        license.AppId,
        license.RemoteId,
        appPlan.Name
      )
      console.log('upgradePlan, licenses RemoteId: ', result)
    } catch (error) {
      console.log('error from webAppService upgradePlan: ', error)
      return next(error)
    }
  }

  await Licenses.updateLicensesPlan(plan.id, id)

  return res.status(HttpCode.OK).json({
    message: 'success',
  })
}

const remove = async (req, res, next) => {
  const { query } = req
  const licensesId = Object.keys(query).map(id => Number(id))

  let totalCost = 0
  for (const id of licensesId) {
    const license = await Licenses.getLicensesById(id)
    if (!license) {
      continue
    }

    if (license.RemoteId !== 0) {
      try {
        const result = await webAppService.delete(
          license.AppId,
          license.RemoteId
        )
      } catch (error) {
        console.log('error from webAppService remove: ', error)
        return next(error)
      }
    }

    await Licenses.removeLicense(id)
    totalCost += license.LicenseCost
  }

  return res.status(HttpCode.OK).json({
    message: 'Licenses deleted',
    totalCost,
  })
}

const changeStatus = async (req, res, next) => {
  const { licenses, status } = req.body

  for (const updatedLicensesId of licenses) {
    const lic = await Licenses.getLicensesById(updatedLicensesId)
    if (!lic) {
      continue
    }

    const license = await Licenses.getLicensesById(updatedLicensesId)

    if (license.RemoteId !== 0) {
      try {
        const result = await webAppService.changeStatus(
          license.AppId,
          license.RemoteId,
          status
        )
        console.log('changeStatus, licenses RemoteId: ', result)
      } catch (error) {
        console.log('error from webAppService changeStatus: ', error)
        return next(error)
      }
    }
    //
    await Licenses.updateLicensesStatus(updatedLicensesId, status)
  }

  return res.status(HttpCode.OK).json({
    message: 'Licenses status updated',
    data: { licenses, status },
  })
}

module.exports = { addLicense, changeStatus, upgradePlan, remove }
