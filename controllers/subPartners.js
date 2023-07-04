const { v4: uuidv4 } = require('uuid')
const User = require('../model/user')
const SubPartners = require('../model/subPartners')
const Licenses = require('../model/license')
const EmailServise = require('../services/email')
const Stripe = require('../helpers/Stripe')
require('dotenv').config()

const { HttpCode, accountTypes } = require('../helpers/Constants')
const PasswordHasher = require('../helpers/PasswordHasher')

const addSubPartner = async (req, res) => {
  const { name, email, phone, licenses } = req.body
  const { user } = req

  const accountType = await User.checkAccountType(user)

  if (
    !(
      accountType === accountTypes.Partner ||
      accountType === accountTypes.GodMode
    )
  ) {
    return res.status(HttpCode.BAD_REQUEST).json({
      message: 'Only partners can create sub-partners',
    })
  }

  const [vetifyEmail, vetifyPhone] = await Promise.all([
    SubPartners.getUserByEmail(email),
    SubPartners.getUserByPhone(phone),
  ])

  // const vetifyEmail = await SubPartners.getUserByEmail(email)
  if (vetifyEmail) {
    return res.status(HttpCode.CONFLICT).json({
      message: 'This email already exsists',
    })
  }

  // const vetifyPhone = await SubPartners.getUserByPhone(phone)
  if (vetifyPhone) {
    return res.status(HttpCode.CONFLICT).json({
      message: 'This phone number already exsists',
    })
  }

  const userLicenses = await Licenses.getUserAvailableLicensesCount(user)

  if (!(userLicenses >= licenses || accountType === accountTypes.GodMode)) {
    return res.status(HttpCode.CONFLICT).json({
      message: "You don't have enough licenses",
    })
  }

  let nickname = email.split('@')[0]
  let i = 1

  while (true) {
    const user = await SubPartners.getUserByNickname(nickname)
    if (user) {
      nickname = email.split('@')[0] + i++
    } else {
      break
    }
  }

  const password = PasswordHasher.generate()
  const hashPassword = PasswordHasher.hashWithSalt(password)
  const accessKey = uuidv4()

  const { id: stripeId } = await Stripe.createCustomer(name, email)

  await SubPartners.addSubPartner({
    nickname,
    email,
    name,
    hashPassword,
    accessKey,
    licenses,
    stripeId,
    creatorId: user.Id,
    phone,
  })

  try {
    const emailServise = new EmailServise(process.env.NODE_ENV)
    await emailServise.sendEmail({
      templateName: 'CloudKii Subpartner Create Notification',
      recipientEmail: email,
      email,
      password,
      name,
      partner: email,
    })
  } catch (error) {
    console.log('Error in licenses emailServise.sendEmail')
  }

  return res.status(HttpCode.OK).json({
    message: 'Sub-partner added',
    userLicenses: userLicenses - licenses,
  })
}

const updateSubPartnerLicenses = async (req, res) => {
  const { subPartnerId, count } = req.body
  const { user } = req

  const [subPartner, userLicenses] = await Promise.all([
    SubPartners.getUserById(subPartnerId),
    Licenses.getUserAvailableLicensesCount(user),
  ])

  if (count - subPartner.Licenses > userLicenses) {
    return res.status(HttpCode.CONFLICT).json({
      message: "You don't have enough licenses",
    })
  }

  const subPartnerAvailableLicenses =
    await Licenses.getUserAvailableLicensesCount(subPartner)

  if (0 > subPartnerAvailableLicenses - (subPartner.Licenses - count)) {
    return res.status(HttpCode.CONFLICT).json({
      message: `This sub-partner use this licenses. Available Licenses can't be less than zero`,
    })
  }

  // !!! We check it on Front
  // else if (count === subPartner.Licenses) {
  //   return res.status(HttpCode.CONFLICT).json({
  //     message: 'You send same licenses value',
  //   })
  // }

  await SubPartners.updateLicenses(subPartnerId, count)

  return res.status(HttpCode.OK).json({
    message: `Your Sub-Partner now has ${count} licenses`,
    userLicenses: userLicenses - (count - subPartner.Licenses),
  })
}

const remove = async (req, res) => {
  const { query } = req
  const creatorId = req.user.Id
  const usersId = Object.keys(query).map(id => Number(id))

  const arrOfCallbacks = []
  for (const id of usersId) {
    const deleteSubPartner = async id => {
      const user = await SubPartners.getUserById(id)

      console.log('user.Id: ', user.Id)
      console.log('creatorId: ', creatorId)

      if (!user) {
        return
      }

      await Promise.all([
        await Licenses.updateLicensesUserId(creatorId, id),
        await SubPartners.removeUser(id),
      ])
    }

    arrOfCallbacks.push(deleteSubPartner(id))
  }

  await Promise.all(arrOfCallbacks)

  return res.status(HttpCode.OK).json({
    message: 'Users deleted',
  })
}

const changeStatus = async (req, res) => {
  const { subPartners, status } = req.body

  for (const updatedSubPartnersId of subPartners) {
    const subPartners = await SubPartners.getUserById(updatedSubPartnersId)
    if (!subPartners) {
      continue
    }
    await SubPartners.updateUserStatus(updatedSubPartnersId, status)
  }

  return res.status(HttpCode.OK).json({
    message: 'Status updated',
    data: { subPartners, status },
  })
}

module.exports = {
  addSubPartner,
  changeStatus,
  remove,
  updateSubPartnerLicenses,
}
