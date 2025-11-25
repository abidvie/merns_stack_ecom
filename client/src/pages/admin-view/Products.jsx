
// import Button from '@mui/material';
// import React from 'react';
// function AdminProducts() {
//   return (
//    <div className="mb-5 w-full flex justify-end">
//     <Button variant="contained">Contained</Button>
//    </div>
//   )
// }
// export default AdminProducts;
 // Correct import path
// import React from 'react';
// import { Button } from "@/components/ui/button"

// function AdminProducts() {
//   return (
//     <div className="mb-5 w-full flex justify-end">
//      {/* <Button >Add New Products</Button> */}
      
//     </div>
//   );
// }

// export default AdminProducts;








// import React, { useState } from 'react';
// import { Button, TextField, MenuItem, Select, FormControl, InputLabel, Drawer } from '@mui/material';
// import { MdAdd } from 'react-icons/md';

// function AdminProducts() {
//    const [productsformData, setproductsFormData] = useState({
//      tittle: "",
//      description: "",
//      category: "",
//      brand: "",
//      price: "",
//      salePrice: "",
//      image: null,
//    });

//   const [open, setOpen] = useState(false);
//   // const [title, setTitle] = useState('');
//   // const [description, setDescription] = useState('');
//   // const [category, setCategory] = useState('');
//   // const [brand, setBrand] = useState('');
//   // const [price, setPrice] = useState('');
//   // const [salePrice, setSalePrice] = useState('');

//   // Toggle sidebar open/close
//   const toggleSidebar = () => {
//     setOpen(!open);
//   };

//   //Form submit (to be implemented with API call)
//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   // Add logic to handle form submission (e.g., sending data to the server)
//   //   console.log('Product Added', { title, description, category, brand, price, salePrice });
//   // };
//     const handleChange = (e) => {
//     const { name, value } = e.target;
//     setproductsFormData((prev) => ({ ...prev, [name]: value }));
//     //  console.log(productsformData);
//   };


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log('products Form data:', productsformData);

     
//   };



//   return (
//     <div>
//       {/* Button to open the sidebar */}
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={toggleSidebar}
//         startIcon={<MdAdd />}
//         sx={{ position: 'fixed', bottom: 20, right: 20 }}
//       >
//         Add New Product
//       </Button>

//       {/* Sidebar */}
//       <Drawer
//         anchor="right"
//         open={open}
//         onClose={toggleSidebar}
//         sx={{
//           width: '400px',
//           flexShrink: 0,
//           '& .MuiDrawer-paper': {
//             width: '400px',
//             padding: '20px',
//             boxSizing: 'border-box',
//           },
//         }}
//       >
//         <h2>Add New Product</h2>
//         <form onSubmit={handleSubmit}>
//           {/* Image Upload */}
//           <div>
//             <input type="file" />
//             <p>Drag & drop or click to upload image</p>
//           </div>

//           {/* Title */}
//           <TextField
//             label="Title"
//             variant="outlined"
//             fullWidth
//             value={productsformData.tittle}
//             onChange={ handleChange}
//             sx={{ marginBottom: '10px' }}
//           />

//           {/* Description */}
//           <TextField
//             label="Description"
//             variant="outlined"
//             fullWidth
//             multiline
//             rows={4}
//             value={productsformData.description}
//             onChange={handleChange }
//             sx={{ marginBottom: '10px' }}
//           />

//           {/* Category */}
//           <FormControl fullWidth sx={{ marginBottom: '10px' }}>
//             <InputLabel>Category</InputLabel>
//             <Select
//               value={productsformData.category}
//               onChange={handleChange }
//               label="Category"
//             >
//               <MenuItem value="electronics">Electronics</MenuItem>
//               <MenuItem value="clothing">Clothing</MenuItem>
//               <MenuItem value="home">Home</MenuItem>
//             </Select>
//           </FormControl>

//           {/* Brand */}
//           <TextField
//             label="Brand"
//             variant="outlined"
//             fullWidth
//             value={productsformData.brand}
//             onChange={handleChange }
//             sx={{ marginBottom: '10px' }}
//           />

//           {/* Price */}
//           <TextField
//             label="Price"
//             variant="outlined"
//             fullWidth
//             type="number"
//             value={productsformData.price}
//             onChange={handleChange }
//             sx={{ marginBottom: '10px' }}
//           />

//           {/* Sale Price */}
//           <TextField
//             label="Sale Price"
//             variant="outlined"
//             fullWidth
//             type="number"
//             value={productsformData.salePrice}
//             onChange={handleChange }
//             sx={{ marginBottom: '10px' }}
//           />

//           {/* Submit Button */}
//           <Button type="submit" variant="contained" color="primary" fullWidth>
//             Add Product
//           </Button>
//         </form>
//       </Drawer>
//     </div>
//   );
// }

// export default AdminProducts;





// import React, { useState } from 'react';
// import { Button, TextField, MenuItem, Select, FormControl, InputLabel, Drawer } from '@mui/material';
// import { MdAdd } from 'react-icons/md';
// import { AiOutlineCloudUpload } from 'react-icons/ai'; // React Icon for the cloud upload icon

// function AdminProducts() {
//   const [productsformData, setproductsFormData] = useState({
//     tittle: "",
//     description: "",
//     category: "",
//     brand: "",
//     price: "",
//     salePrice: "",
//     image: null,
//   });
// const [imagefile, setImagefile] = useState(null);
// const [uploadedimageUrl, setUploadedImageUrl] = useState(null); 
//   const [open, setOpen] = useState(false);

//   // Toggle sidebar open/close
//   const toggleSidebar = () => {
//     setOpen(!open);
//   };

//   // Handle form data change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setproductsFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log('Product Form data:', productsformData);
//     // You can add logic here to send the form data to an API
//   };

//   return (
//     <div>
//       {/* Button to open the sidebar */}
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={toggleSidebar}
//         startIcon={<MdAdd />}
//         sx={{ position: 'fixed', bottom: 20, right: 20 }}
//       >
//         Add New Product
//       </Button>

//       {/* Sidebar */}
//       <Drawer
//         anchor="right"
//         open={open}
//         onClose={toggleSidebar}
//         sx={{
//           width: '400px',
//           flexShrink: 0,
//           '& .MuiDrawer-paper': {
//             width: '400px',
//             padding: '20px',
//             boxSizing: 'border-box',
//           },
//         }}
//       >
//         <h2>Add New Product</h2>
//         <form onSubmit={handleSubmit}>
//           {/* Image Upload */}
//           {/* <div>
//             <input type="file" name="image" onChange={handleChange} />
//             <p>Drag & drop or click to upload image</p>
//           </div> */}


//               <div className="mb-2.5 relative w-full h-52 bg-gray-100 border-2 border-dashed border-gray-400 rounded-lg text-center cursor-pointer hover:border-blue-500">
//       {/* File Input (hidden, covering the entire container) */}
//       <input
//         type="file"
//         name="image"
//         id="file-input"
//         // onChange={handleChange}
//         className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//       />

//       {/* Content inside the container */}
//       <div className="flex flex-col justify-center items-center h-full">
//         {/* Cloud upload icon from React Icons */}
//         <AiOutlineCloudUpload className="text-6xl text-blue-500" />
        
//         <p className="text-lg font-semibold text-gray-700">Upload a File</p>
//         <p className="text-sm text-gray-500">Drag and drop files here</p>
//       </div>
//     </div>

//           {/* Title */}
//           <TextField
//             label="Title"
//             variant="outlined"
//             fullWidth
//             name="tittle"
//             value={productsformData.tittle}
//             onChange={handleChange}
//             sx={{ marginBottom: '10px' }}
//           />

//           {/* Description */}
//           <TextField
//             label="Description"
//             variant="outlined"
//             fullWidth
//             multiline
//             rows={4}
//             name="description"
//             value={productsformData.description}
//             onChange={handleChange}
//             sx={{ marginBottom: '10px' }}
//           />

//           {/* Category */}
//           <FormControl fullWidth sx={{ marginBottom: '10px' }}>
//             <InputLabel>Category</InputLabel>
//             <Select
//               name="category"
//               value={productsformData.category}
//               onChange={handleChange}
//               label="Category"
//             >
//               <MenuItem value="electronics">Electronics</MenuItem>
//               <MenuItem value="clothing">Clothing</MenuItem>
//               <MenuItem value="home">Home</MenuItem>
//             </Select>
//           </FormControl>

//           {/* Brand */}
//           <TextField
//             label="Brand"
//             variant="outlined"
//             fullWidth
//             name="brand"
//             value={productsformData.brand}
//             onChange={handleChange}
//             sx={{ marginBottom: '10px' }}
//           />

//           {/* Price */}
//           <TextField
//             label="Price"
//             variant="outlined"
//             fullWidth
//             type="number"
//             name="price"
//             value={productsformData.price}
//             onChange={handleChange}
//             sx={{ marginBottom: '10px' }}
//           />

//           {/* Sale Price */}
//           <TextField
//             label="Sale Price"
//             variant="outlined"
//             fullWidth
//             type="number"
//             name="salePrice"
//             value={productsformData.salePrice}
//             onChange={handleChange}
//             sx={{ marginBottom: '10px' }}
//           />

//           {/* Submit Button */}
//           <Button type="submit" variant="contained" color="primary" fullWidth>
//             Add Product
//           </Button>
//         </form>
//       </Drawer>
//     </div>
//   );
// }

// export default AdminProducts;











import React, { useState } from 'react';
import { Button, TextField, MenuItem, Select, FormControl, InputLabel, Drawer } from '@mui/material';
import { MdAdd } from 'react-icons/md';
import { AiOutlineCloudUpload } from 'react-icons/ai'; // React Icon for the cloud upload icon
import { useDropzone } from 'react-dropzone'; // Import react-dropzone

function AdminProducts() {
  const [productsFormData, setProductsFormData] = useState({
    title: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    salePrice: "",
    image: null,
  });

  const [uploadedImageUrl, setUploadedImageUrl] = useState(null); // URL for image preview
  const [open, setOpen] = useState(false);

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
    console.log("file:",file)
    const previewUrl = URL.createObjectURL(file); // Create preview URL for image
    setUploadedImageUrl(previewUrl);
    setProductsFormData((prev) => ({ ...prev, image: file }));
  };

  // Use react-dropzone for drag-and-drop functionality
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleFileChange,
    multiple: false,
     accept: '.jpg, .jpeg, .png, .gif, .pdf', // Accept only image files
  });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Product Form Data:', productsFormData);
    console.log('Uploaded Image:', productsFormData.image);
     setUploadedImageUrl(null);
    setProductsFormData({
    title: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    salePrice: "",
    image: null,
  })


    // You can add logic here to send the form data to an API
  };

  return (
    <div>
      {/* Button to open the sidebar */}
      <Button
        variant="contained"
        color="primary"
        onClick={toggleSidebar}
        startIcon={<MdAdd />}
        sx={{ position: 'fixed', bottom: 20, right: 20 }}
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
            {/* Content inside the container */}
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
