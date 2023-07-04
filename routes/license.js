const { Router } = require('express')
const router = Router()
const ctrl = require('../controllers/license')
const guard = require('../helpers/guard')
const ctrlHandler = require('../helpers/controllerHandler')

router.post('/', guard, ctrlHandler(ctrl.addLicense))
router.patch('/', guard, ctrlHandler(ctrl.upgradePlan))
router.delete('/', guard, ctrlHandler(ctrl.remove))

router.post('/status', guard, ctrlHandler(ctrl.changeStatus))

module.exports = router
