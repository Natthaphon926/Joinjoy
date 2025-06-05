const express = require('express')
const { getAllTree,getCarbonLeaderboard,getTotalCarbon } = require('../controllers/tree')

const router = express.Router()



router.get('/tree',getAllTree)
router.get("/leaderboard/carbon", getCarbonLeaderboard);
router.get("/totalcarbon", getTotalCarbon);




module.exports = router