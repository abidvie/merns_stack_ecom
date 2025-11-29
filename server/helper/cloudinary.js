const cloudinary = require('cloudinary').v2;
const multer = require('multer');

cloudinary.config({
  cloud_name: 'dw7lddpyb',
  api_key: '826327612959425',
  api_secret: 'hgSaA65UVi49amPa6Iisn7iJB10',
  secure: true,
});

const storage = new multer.memoryStorage();


async function imageuploadutils(file) {
// console.log("imageuploadutils:",file);


  try {
    const result = await cloudinary.uploader.upload(file, {
      resource_type: 'auto',
    });
    console.log(result);
    return result;
  } catch (error) {
    throw new Error(`Image upload failed: ${error.message}`);
  }
}

const upload = multer({storage: storage });

module.exports = { upload, imageuploadutils };


