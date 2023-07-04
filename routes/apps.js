const { Router } = require('express')
const router = Router()
const ctrl = require('../controllers/apps')
const guard = require('../helpers/guard')
const ctrlHandler = require('../helpers/controllerHandler')

router.post('/', guard, ctrlHandler(ctrl.getFiltered))
router.get('/:table', guard, ctrlHandler(ctrl.getAll))

module.exports = router
