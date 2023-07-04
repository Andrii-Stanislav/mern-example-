const { Router } = require('express')
const router = Router()
const ctrl = require('../controllers/billing')
const guard = require('../helpers/guard')
const ctrlHandler = require('../helpers/controllerHandler')

router.get('/plan', ctrlHandler(ctrl.getPlans))

router.get('/product', ctrlHandler(ctrl.getProducts))

router.post(
  '/subscription/:userId',
  guard,
  ctrlHandler(ctrl.createSubscription)
)
router.delete(
  '/subscription/:userId',
  guard,
  ctrlHandler(ctrl.cancelSubscription)
)

router.get(
  '/subscription/skip/:userId',
  guard,
  ctrlHandler(ctrl.skipSubscription)
)

module.exports = router
