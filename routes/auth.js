const { Router } = require('express')
const router = Router()
const ctrl = require('../controllers/auth')
const guard = require('../helpers/guard')
const ctrlHandler = require('../helpers/controllerHandler')

router.post('/signup', ctrlHandler(ctrl.register))

router.post('/signin', ctrlHandler(ctrl.logIn))

router.post('/recover', ctrlHandler(ctrl.recoverPassword))

router.get('/recover/:code', ctrlHandler(ctrl.verifyRecoverPassword))

router.post('/recover/:code', ctrlHandler(ctrl.setNewPassword))

router.get('/current', guard, ctrlHandler(ctrl.getCurrent))

router.post('/logout', guard, ctrlHandler(ctrl.logOut))

module.exports = router
