const express = require('express')
const {authCheck,adminCheck} = require('../middlewares/authCheck')
const { uploadActivityImage, deleteImage, getAllImages } = require('../controllers/image')
const router = express.Router()



router.post('/activities/:id/images',authCheck,adminCheck,uploadActivityImage)
router.delete('/images/:imageId',authCheck,adminCheck,deleteImage)
router.get('/images', getAllImages);



module.exports = router