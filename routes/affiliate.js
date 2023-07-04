const { Router } = require('express')
const router = Router()
const ctrl = require('../controllers/affiliate')
const guard = require('../helpers/guard')
const ctrlHandler = require('../helpers/controllerHandler')

router.get('/', guard, ctrlHandler(ctrl.getAffiliateStats))

router.get('/:affiliateNick', ctrlHandler(ctrl.getAffiliateUser))

module.exports = router
