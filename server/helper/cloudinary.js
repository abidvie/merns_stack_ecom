const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier'); 
const multer = require('multer');


cloudinary.config({
  cloud_name: "dw7lddpyb",
  api_key: "826327612959425",
  api_secret: "hgSaA65UVi49amPa6Iisn7iJB10",
});

const storage = multer.memoryStorage();

async function handleimageupload(file){
    const result=await cloudinary.uploader.upload(file,{
        resource_type:'auto',
    })
        return result;   
}

const upload=multer({storage})
module.exports={upload,handleimageupload};


