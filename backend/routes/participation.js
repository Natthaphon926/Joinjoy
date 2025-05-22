const express = require('express')
const {authCheck,adminCheck} = require('../middlewares/authCheck')
const { joinActivity, getParticipantsByActivity, updateParticipationStatus, getMyParticipations } = require('../controllers/participation')

const router = express.Router()



router.post('/activities/:id/join',authCheck,joinActivity)
router.get('/activities/:id/participants',authCheck,adminCheck,getParticipantsByActivity)
router.put('/participations/:id/status',authCheck,adminCheck,updateParticipationStatus)
router.get('/participations/me',authCheck,getMyParticipations)



module.exports = router