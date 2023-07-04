const { Router } = require('express')
const router = Router()
const ctrl = require('../controllers/settings')
const guard = require('../helpers/guard')
const ctrlHandler = require('../helpers/controllerHandler')

router.get('/stripe/:stripeId', guard, ctrlHandler(ctrl.getStripeInfo))
router.post('/stripe/:stripeId', guard, ctrlHandler(ctrl.updateStripeInfo))

router.post(
  '/stripe/payment/:stripeId',
  guard,
  ctrlHandler(ctrl.updatePaymentMethod)
)

router.get('/reskin', guard, ctrlHandler(ctrl.getReskinInfo))
router.post('/reskin', guard, ctrlHandler(ctrl.updateReskinInfo))

//

module.exports = router
