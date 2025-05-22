const express = require('express')
const {authCheck,adminCheck} = require('../middlewares/authCheck')
const { uploadActivityImage, deleteImage } = require('../controllers/image')
const router = express.Router()



router.post('/activities/:id/images',authCheck,adminCheck,uploadActivityImage)
router.delete('/images/:imageId',authCheck,adminCheck,deleteImage)



module.exports = router