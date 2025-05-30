const express = require('express')
const {authCheck,adminCheck} = require('../middlewares/authCheck')
const { joinActivity, getAllParticipations, updateParticipationStatus, getMyParticipations } = require('../controllers/participation')

const router = express.Router()



router.post('/activities/:id/join',authCheck,joinActivity)
router.get('/participants',authCheck,adminCheck,getAllParticipations)
router.put('/participations/:id/status',authCheck,adminCheck,updateParticipationStatus)
router.get('/participations/me',authCheck,getMyParticipations)



module.exports = router