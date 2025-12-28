const { Product } = require('../../models/Products')




// const fetch_all_filtered_products = async (req, res) => {
//    const searchQuery = req.query.query;
 
//     console.log("Search Query in Backend:", searchQuery);
 
//   try {
//     const listofproducts = await Product.find({});
//     res
//       .status(200)
//       .json({
//         success: true,
//         message: "all filtered data is fatched",
//         data: listofproducts,
//       });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: "server error" });
//   }
// };





// const fetch_all_filtered_products = async (req, res) => {
//   const searchQuery = req.query.query;
//   console.log("Search Query in Backend:", searchQuery);

//   try {
   
//     let filterCriteria = {};

    
//     if (searchQuery) {
//       filterCriteria = {
//         $or: [
//           { title: { $regex: searchQuery, $options: 'i' } },
//           { description: { $regex: searchQuery, $options: 'i' } },
//           { brand: { $regex: searchQuery, $options: 'i' } }, 
//         ],
//       };
//     }

    
//     const listofproducts = await Product.find(filterCriteria);

//     res.status(200).json({
//       success: true,
//       message: "All filtered data fetched",
//       data: listofproducts,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };




// const fetch_all_filtered_products = async (req, res) => {
//   const { query, categories, brands } = req.query; // Access query parameters from the URL
//   console.log("Search Query in Backend:", query);
//   console.log("Category:", categories);
//   console.log("Brand:", brands);

//   try {
//     // let filterCriteria = {};

//     // // If searchQuery is provided, filter products by title or description (or other fields you want)
//     // if (query) {
//     //   console.log("Search Query in Backend:", query);
//     //   filterCriteria = {
//     //     $or: [
//     //       { title: { $regex: query, $options: 'i' } }, // Case-insensitive search in 'title'
//     //       { description: { $regex: query, $options: 'i' } },
//     //     ],
//     //   };
//     // }

   
//     // if (categories) {
//     //   filterCriteria.categories = { $regex: categories, $options: 'i' }; 
//     // }

  
//     // if (brands) {
//     //   filterCriteria.brand = { $regex: brands, $options: 'i' }; 
//     // }

   
//     // const listofproducts = await Product.find(filterCriteria);

//    let filterCriteria = {}; // Initialize filter criteria

//     // If searchQuery is provided, filter products by title or description (or other fields you want)
//     if (query) {
//       filterCriteria.$or = [
//         { title: { $regex: query, $options: 'i' } }, // Case-insensitive search in 'title'
//         { description: { $regex: query, $options: 'i' } }, // Case-insensitive search in 'description'
//       ];
//     }

//     // Optionally filter by category if it exists (handling single category as a string)
//     if (categories) {
//       filterCriteria.category = { $regex: categories, $options: 'i' }; // Case-insensitive search for category
//     }

//     // Optionally filter by brand if it exists (handling single brand as a string)
//     if (brands) {
//       filterCriteria.brand = { $regex: brands, $options: 'i' }; // Case-insensitive search for brand
//     }

   
//     console.log("Constructed filterCriteria:", filterCriteria);

   
//     const listofproducts = await Product.find(filterCriteria);

//     if (listofproducts.length === 0) {
//       console.log("No products found with the given filters.");
//     }
//     res.status(200).json({
//       success: true,
//       message: "Filtered products fetched",
//       data: listofproducts,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };




// const fetch_all_filtered_products = async (req, res) => {
//   const { query, categories, brands } = req.query; // Access query parameters from the URL
//   console.log("Search Query in Backend:", query);
//   console.log("Categories in Backend:", categories);
//   console.log("Brands in Backend:", brands);

//   try {
//     let filterCriteria = {}; // Initialize filter criteria

//     // If searchQuery is provided, filter products by title or description (or other fields you want)
//     if (query) {
//       filterCriteria.$or = [
//         { title: { $regex: query, $options: 'i' } }, // Case-insensitive search in 'title'
//         { description: { $regex: query, $options: 'i' } }, // Case-insensitive search in 'description'
//       ];
//     }

//     // Optionally filter by category if it exists (handling single category as a string)
//     // if (categories) {
//     //   console.log("Applying category filter:", categories);
//     //   filterCriteria.category = { $regex: categories, $options: 'i' }; // Case-insensitive search for category
//     // }

//     // // Optionally filter by brand if it exists (handling single brand as a string)
//     // if (brands) {
//     //   console.log("Applying brand filter:", brands);
//     //   filterCriteria.brand = { $regex: brands, $options: 'i' }; // Case-insensitive search for brand
//     // }

//     // Debugging the constructed filterCriteria
//     console.log("Constructed filterCriteria:", filterCriteria);

//     // Fetch the products from MongoDB based on the filter criteria
//     const listofproducts = await Product.find(filterCriteria);

//     // Debug the result
//     if (listofproducts.length === 0) {
//       console.log("No products found with the given filters.");
//     }

//     // Respond with filtered products
//     res.status(200).json({
//       success: true,
//       message: "Filtered products fetched successfully",
//       data: listofproducts,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };






const fetch_all_filtered_products = async (req, res) => {
  const { query, categories, brands } = req.query; // Access query parameters from the URL
  console.log("Search Query in Backend:", query);
  console.log("Categories in Backend:", categories);
  console.log("Brands in Backend:", brands);

  try {
    let filterCriteria = {}; // Initialize filter criteria

    // If searchQuery is provided, filter products by title or description
    if (query) {
      filterCriteria.$or = [
        { title: { $regex: query, $options: 'i' } }, // Case-insensitive search in 'title'
        { description: { $regex: query, $options: 'i' } }, // Case-insensitive search in 'description'
      ];
    }

    // Optionally filter by category if it exists and is not null or empty
    if (categories && categories !== 'null' && categories.trim() !== '') {
      console.log("Applying category filter:", categories);
      filterCriteria.category = { $regex: categories, $options: 'i' }; // Case-insensitive search for category
    }

    // Optionally filter by brand if it exists and is not null or empty
    if (brands && brands !== 'null' && brands.trim() !== '') {
      console.log("Applying brand filter:", brands);
      filterCriteria.brand = { $regex: brands, $options: 'i' }; // Case-insensitive search for brand
    }

    
    console.log("Constructed filterCriteria:", filterCriteria);

    
    const listofproducts = await Product.find(filterCriteria);

    if (listofproducts.length === 0) {
      console.log("No products found with the given filters.");
    }

    res.status(200).json({
      success: true,
      message: "Filtered products fetched successfully",
      data: listofproducts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};



module.exports = {
  fetch_all_filtered_products,
  
};