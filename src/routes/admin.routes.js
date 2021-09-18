const { Router } = require('express')
const controllers = require('../controllers')

const router = Router()

router.post('/sign-in', controllers.admin.signIn)
router.post('/sign-up', controllers.admin.signUp)
router.post('/logout', controllers.admin.logout)

module.exports = router