const express = require('express');
const router = express.Router();
const { upload } = require('../../helper/cloudinary');
const { handleimageupload,addproduct,fetchallproducts,editproduct,deleteproduct } = require('../../controllers/admincontroller/products_controller');


router.post('/upload_image', upload.single('my_file'), handleimageupload);
router.post('/addproducts', addproduct);
router.get('/fetchallproducts', fetchallproducts);
router.put('/editproduct/:id', editproduct);
router.delete('/deleteproduct/:id', deleteproduct);


module.exports = router;