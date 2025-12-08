const { imageuploadutils } = require("../../helper/cloudinary");
const { Product } = require("../../models/Products");

const handleimageupload = async (req, res) => {
  try {
    console.log("handleimageupload:", req.file);
    const b64 = Buffer.from(req.file.buffer).toString("base64");

    const url = "data:" + req.file.mimetype + ";base64," + b64;

    const result = await imageuploadutils(url);
    //  console.log(result);
    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "image server error",
    });
  }
};

const addproduct = async (req, res) => {
  try {
    const {
      title,
      image,
      description,
      category,
      brand,
      price,
      saleprice,
      totalstock,
    } = req.body;
    const newlycreatedproduct = new Product({
      title,
      image,
      description,
      category,
      brand,
      price,
      saleprice,
      totalstock,
    });

    await newlycreatedproduct.save();
    res
      .status(201)
      .json({
        success: true,
        message: "product added successfully",
        data: newlycreatedproduct,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "server error" });
  }
};

const fetchallproducts = async (req, res) => {
  try {
    const listofproducts = await Product.find({});
    res
      .status(200)
      .json({
        success: true,
        message: "all data is fatched",
        data: listofproducts,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "server error" });
  }
};

const editproduct = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Editing product with ID:", id);
    const {
      title,
      image,
      description,
      category,
      brand,
      price,
      saleprice,
      totalstock,
    } = req.body;

    // Update product and return the updated product
    const updatedproduct = await Product.findByIdAndUpdate(
      id,
      {
        title,
        image,
        description,
        category,
        brand,
        price,
        saleprice,
        totalstock,
      },
      { new: true } // Returns the updated document
    );

    // If product was not found, return 404
    if (!updatedproduct) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Send the updated product as response
    res.status(201).json({ success: true, data: updatedproduct });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


const deleteproduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Attempt to delete the product by ID
    const deletedProduct = await Product.findByIdAndDelete(id);

    // If no product was found with the provided ID, return a 404
    if (!deletedProduct) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Respond with a success message and the deleted product details
    res.status(200).json({ success: true, message: 'Product deleted successfully', data: deletedProduct });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


// module.exports ={handleimageupload};

module.exports = {
  handleimageupload,
  addproduct,
  fetchallproducts,
  editproduct,
  deleteproduct,
};
