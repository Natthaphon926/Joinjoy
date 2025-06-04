const express = require('express')
const { getAllTree } = require('../controllers/tree')

const router = express.Router()



router.get('/tree',getAllTree)




module.exports = router