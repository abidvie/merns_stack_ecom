const { imageuploadutils } = require("../../helper/cloudinary");


const handleimageupload=async (req,res)=>{
    try {
     console.log("handleimageupload:",req.file)
      const b64=Buffer.from(req.file.buffer).toString('base64');
      

      const url="data:"+req.file.mimetype+";base64,"+b64;
      

          
    const result=await imageuploadutils(url);
    //  console.log(result);
    res.json(
        {success:true,  result}
    )
    
        // res.status(200).json({message:"Image uploaded successfully"});
    } catch (error) {
        
        res.status(500).json({
            success:false,
            message:"image server error"});
    }       
}

module.exports ={handleimageupload};





// const { imageuploadutils } = require("../../helper/cloudinary");

// const handleimageupload = async (req, res) => {
//   try {
//     // Check if file exists in the request
//     if (!req.file) {
//       return res.status(400).json({ success: false, message: 'No file uploaded' });
//     }

//     // You can skip the base64 conversion, just pass the file buffer directly to Cloudinary
//     const result = await imageuploadutils(req.file.buffer);

//     // Send the successful response
//     res.json({ success: true, result });
//   } catch (error) {
//     // Log the error for debugging
//     console.error('Error uploading image:', error);

//     // Send a failure response
//     res.status(500).json({
//       success: false,
//       message: "Image server error",
//       error: error.message,  // You can include the error message for debugging purposes
//     });
//   }
// };

module.exports = { handleimageupload };
