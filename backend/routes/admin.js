const express = require('express')
const {authCheck,adminCheck} = require('../middlewares/authCheck')
const { getAllUsers } = require('../controllers/admin')
const router = express.Router()



router.get('/admin/users',authCheck,adminCheck,getAllUsers)




module.exports = router