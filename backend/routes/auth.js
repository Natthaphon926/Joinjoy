const express = require('express')
const { register, login , getUser,getUserCount} = require('../controllers/auth')
const {authCheck,adminCheck} = require('../middlewares/authCheck')
const router = express.Router()



router.post('/register',register)
router.post('/login',login)
router.get('/me',authCheck,getUser)
router.get('/user-count',getUserCount)


module.exports = router