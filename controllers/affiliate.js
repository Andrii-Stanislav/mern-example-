const Affiliate = require('../model/affiliate')
const Auth = require('../model/auth')
const { HttpCode } = require('../helpers/Constants')

const getAffiliateStats = async (req, res) => {
  const { user } = req

  const manyResults = await Promise.all([
    Affiliate.getVisitors(user.Id),
    Affiliate.getPaid(user.Id),
    Affiliate.getEarned(user.Id),
    Affiliate.getDue(user.Id),
  ])

  const visitors = manyResults[0]
  const paid = manyResults[1]
  const earned = manyResults[2]
  const due = manyResults[3]

  // const visitors = await Affiliate.getVisitors(user.Id)
  // const paid = await Affiliate.getPaid(user.Id)
  // const earned = await Affiliate.getEarned(user.Id)
  // const due = await Affiliate.getDue(user.Id)

  return res
    .status(HttpCode.OK)
    .json({ visitors, paid, earned: earned - paid, due: due - 2 * paid })
}

const getAffiliateUser = async (req, res) => {
  const { affiliateNick } = req.params

  const affiliate = await Auth.getUserByNickname(affiliateNick)

  return res.status(HttpCode.OK).json({
    affiliateUser: {
      Id: affiliate.Id,
      Email: affiliate.Email,
      Name: affiliate.Name,
      Nickname: affiliate.Nickname,
    },
  })
}

module.exports = { getAffiliateStats, getAffiliateUser }
