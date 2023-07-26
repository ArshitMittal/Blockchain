//const auth = require('../middleware/auth')
const express = require('express')
const router = new express.Router()
const controlUser = require('../controller/user')

router.post('/block',controlUser.createUser)
router.get('/block',controlUser.blockInfo)
router.get('/block/status', controlUser.chainInfo)

module.exports = router