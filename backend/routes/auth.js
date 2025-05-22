const express = require('express')
const { register, login , getUser} = require('../controllers/auth')
const {authCheck,adminCheck} = require('../middlewares/authCheck')
const router = express.Router()



router.post('/register',register)
router.post('/login',login)
router.get('/me',authCheck,getUser)


module.exports = router