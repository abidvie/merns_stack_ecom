




import React, { useEffect, useState } from 'react';
import { Button, TextField, MenuItem, Select, FormControl, InputLabel, Drawer } from '@mui/material';
import { MdAdd } from 'react-icons/md';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addNewProducts, deleteProduct, fetchAllProducts } from '@/store/admin/products_sliec';
import { toast } from "sonner"
import ProductAdminCard from './ProductAdminCard';
function AdminProducts() {
  const [productsFormData, setProductsFormData] = useState({
    title: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    salePrice: "",
    image: "", // Initially null
    totalstock: "",
  });

  const [uploadedImageUrl, setUploadedImageUrl] = useState(null); // For image preview
  const [open, setOpen] = useState(false);
  const [imagefile, setImagefile] = useState(null); // To store the image file
  const [imageloading, setimageloading] = useState(false);
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.AdminProducts);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  // Toggle sidebar open/close
  const toggleSidebar = () => {
    setOpen(!open);
  };

  // Handle form data change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductsFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file change for the image
  const handleFileChange = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setImagefile(file);
    const previewUrl = URL.createObjectURL(file); // Create preview URL for image
    setUploadedImageUrl(previewUrl); // Display the uploaded image
  };

  // Upload image to Cloudinary when the form is submitted
  async function uploadimagecloudinary() {
    const data = new FormData();
    data.append("my_file", imagefile); // Append the image file to FormData

    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/products/upload_image",
        data
      );
      console.log("Image uploaded successfully:", response.data);
      if (response.data.success) {
        setimageloading(false);
        return response.data.result.url; // Return the uploaded image URL
      } else {
        setimageloading(true);
        throw new Error('Image upload failed');
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  }

  // Handle form submission (this is where you upload the image)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate if image file is selected
    if (!imagefile) {
      alert("Please upload an image.");
      return;
    }

    console.log('Product Form Data before image upload:', productsFormData);

    // Upload image to Cloudinary
    try {
      const imageUrl = await uploadimagecloudinary();
      console.log('Image URL from Cloudinary:', imageUrl); // Log the image URL

      // After uploading, update the form data with the image URL
    await  setUploadedImageUrl(imageUrl); // Set the image URL to the state
     await setProductsFormData((prev) => ({
        ...prev,
        image: imageUrl, // Add the image URL to the form data
      }));

      dispatch(addNewProducts({... productsFormData,image:imageUrl})).then((data)=>{
        if(data.payload.success){
          dispatch(fetchAllProducts());
          toast("Product added successfully");
          
        }
        console.log(data)})

      console.log('Updated Product Form Data with image URL:', productsFormData);
    } catch (error) {
      alert('Failed to upload image. Please try again.');
      return;
    }

    // Reset the form
    setUploadedImageUrl(null);
    setProductsFormData({
      title: "",
      description: "",
      category: "",
      brand: "",
      price: "",
      salePrice: "",
      image: "",
      totalstock: "",
    });
  };

  // Use react-dropzone for drag-and-drop functionality
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleFileChange,
    multiple: false,
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.gif'] }, // Accept only image files
  });

  console.log('Products Form productlist:', products);

  const deleteitem=(id)=>{
    dispatch(deleteProduct(id)).then((data)=>{
      if(data.payload.success){
        dispatch(fetchAllProducts());
        toast("Product deleted successfully");
      }
      console.log(data)})
  }

  

  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 '>
 {products && products.map((product)=><ProductAdminCard key={product.id} product={product} onDelete={deleteitem} />)}
      </div>
      
       {/* {products && products.map((product)=><ProductAdminCard product={product} />)} */}

      {/* Button to open the sidebar */}
      <Button
        variant="contained"
        color="primary"
        onClick={toggleSidebar}
        startIcon={<MdAdd />}
        sx={{ position: 'fixed' , right: 20, bottom: 20}}
      >
        Add New Product
      </Button>

      {/* Sidebar */}
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleSidebar}
        sx={{
          width: '400px',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: '400px',
            padding: '20px',
            boxSizing: 'border-box',
          },
        }}
      >
        <h2>Add New Product</h2>
        <form onSubmit={handleSubmit}>
          {/* Image Upload */}
          <div
            {...getRootProps()}
            className="mb-2.5 relative w-full h-52 bg-gray-100 border-2 border-dashed border-gray-400 rounded-lg text-center cursor-pointer hover:border-blue-500"
          >
            <input {...getInputProps()} name="image" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
            <div className="flex flex-col justify-center items-center h-full">
              <AiOutlineCloudUpload className="text-6xl text-blue-500" />
              <p className="text-lg font-semibold text-gray-700">Upload a File</p>
              <p className="text-sm text-gray-500">Drag and drop files here</p>
            </div>
          </div>

          {/* Image Preview */}
          {uploadedImageUrl && (
            <div className="mt-3">
              <img src={uploadedImageUrl} alt="Uploaded Preview" className="w-full h-auto rounded-md" />
            </div>
          )}

          {/* Title */}
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            name="title"
            value={productsFormData.title}
            onChange={handleChange}
            sx={{ marginBottom: '10px' }}
          />

          {/* Description */}
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            name="description"
            value={productsFormData.description}
            onChange={handleChange}
            sx={{ marginBottom: '10px' }}
          />

          {/* Category */}
          <FormControl fullWidth sx={{ marginBottom: '10px' }}>
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={productsFormData.category}
              onChange={handleChange}
              label="Category"
            >
              <MenuItem value="electronics">Electronics</MenuItem>
              <MenuItem value="clothing">Clothing</MenuItem>
              <MenuItem value="home">Home</MenuItem>
            </Select>
          </FormControl>

          {/* Brand */}
          <TextField
            label="Brand"
            variant="outlined"
            fullWidth
            name="brand"
            value={productsFormData.brand}
            onChange={handleChange}
            sx={{ marginBottom: '10px' }}
          />

          {/* Price */}
          <TextField
            label="Price"
            variant="outlined"
            fullWidth
            type="number"
            name="price"
            value={productsFormData.price}
            onChange={handleChange}
            sx={{ marginBottom: '10px' }}
          />

          {/* Sale Price */}
          <TextField
            label="Sale Price"
            variant="outlined"
            fullWidth
            type="number"
            name="salePrice"
            value={productsFormData.salePrice}
            onChange={handleChange}
            sx={{ marginBottom: '10px' }}
          />

          {/* Total Stock */}
          <TextField
            label="Total Stock"
            variant="outlined"
            fullWidth
            type="number"
            name="totalstock"
            value={productsFormData.totalstock}
            onChange={handleChange}
            sx={{ marginBottom: '10px' }}
          />

          {/* Submit Button */}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Add Product
          </Button>
        </form>
      </Drawer>
    </div>
  );
}

export default AdminProducts;
