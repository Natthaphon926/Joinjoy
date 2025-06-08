const express = require('express')
const { getAllTree,getCarbonLeaderboard,getTotalCarbon,carbonAbsorption } = require('../controllers/tree')
const {authCheck,} = require('../middlewares/authCheck')
const router = express.Router()



router.get('/tree',getAllTree)
router.get("/leaderboard/carbon", getCarbonLeaderboard);
router.get("/totalcarbon", getTotalCarbon);
router.get("/leaderboard/me",authCheck,carbonAbsorption);




module.exports = router