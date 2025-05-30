const express = require('express')
const {authCheck,adminCheck} = require('../middlewares/authCheck')
const { createActivity,getAllActivities, getActivityById, updateActivity , deleteActivity,  } = require('../controllers/activity')
const { upload } = require('../config/cloudinary');
const router = express.Router()

 


router.post('/activities',authCheck,adminCheck,upload.single('image'),createActivity)
router.get('/activities',getAllActivities)
router.get('/activities/:id',getActivityById)
router.put('/activities/:id',authCheck,adminCheck,updateActivity)
router.delete('/activities/:id',authCheck,adminCheck,deleteActivity)




module.exports = router