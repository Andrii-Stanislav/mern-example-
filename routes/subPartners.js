const { Router } = require('express')
const router = Router()
const ctrl = require('../controllers/subPartners')
const guard = require('../helpers/guard')
const ctrlHandler = require('../helpers/controllerHandler')

router.post('/', guard, ctrlHandler(ctrl.addSubPartner))
router.patch('/', guard, ctrlHandler(ctrl.updateSubPartnerLicenses))
router.delete('/', guard, ctrlHandler(ctrl.remove))

router.post('/status', guard, ctrlHandler(ctrl.changeStatus))

module.exports = router
