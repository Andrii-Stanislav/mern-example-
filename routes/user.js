const { Router } = require('express')
const router = Router()
const ctrl = require('../controllers/user')
const guard = require('../helpers/guard')
const ctrlHandler = require('../helpers/controllerHandler')

router.patch('/', guard, ctrlHandler(ctrl.editPersonalInfo))

router.get('/plan/:stripeId', guard, ctrlHandler(ctrl.getCurrentPlan))

router.get('/licenses', guard, ctrlHandler(ctrl.getUserLicense))

router.post('/support', ctrlHandler(ctrl.support))

module.exports = router
