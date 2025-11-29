const express = require('express');
const router = express.Router();
const { upload } = require('../../helper/cloudinary');
const { handleimageupload } = require('../../controllers/admincontroller/products_controller');


router.post('/upload_image', upload.single('my_file'), handleimageupload);

module.exports = router;