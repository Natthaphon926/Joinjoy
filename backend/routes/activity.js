const express = require('express')
const {authCheck,adminCheck} = require('../middlewares/authCheck')
const { createActivity,getAllActivities, getActivityById, updateActivity , deleteActivity,  } = require('../controllers/activity')
const router = express.Router()



router.post('/activities',authCheck,adminCheck,createActivity)
router.get('/activities',getAllActivities)
router.get('/activities/:id',getActivityById)
router.put('/activities/:id',authCheck,adminCheck,updateActivity)
router.delete('/activities/:id',authCheck,adminCheck,deleteActivity)




module.exports = router