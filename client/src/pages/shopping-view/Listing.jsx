// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import { fetch_All_filter_Products } from "@/store/client/product_slice";
// import React from "react";
// import { useLocation } from "react-router-dom";
// import "./shopping_style/listing_style.css";
// import ProductFilter from "@/components/shopping-view/ProductFilter";
// import SortBy from "./SortBy";
// import ShoppingProductCard from "@/components/shopping-view/ShoppingProducCard";


// function ShoppingListing() {
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [selectedBrands, setSelectedBrands] = useState([]);

//   const handle_selecteSubmit = () => {
//     console.log("Selected Categories:", selectedCategories);
//     console.log("Selected Brands:", selectedBrands);
//   };
//   const location = useLocation();
//   console.log(location);
//   const queryParams = new URLSearchParams(location.search);
//   const searchQuery = queryParams.get("query"); 
//   const [loading, setLoading] = useState(false);
//   const dispatch = useDispatch();

//   const { filter_products } = useSelector((state) => state.clientProductSlice);
//   console.log("filter_products", filter_products);
//   useEffect(() => {
//     if (searchQuery !== "") {
//       setLoading(true); 
//       dispatch(fetch_All_filter_Products(searchQuery))
//         .then((data) => {
//           console.log("amar name", data);
         
//         })
//         .then(() => {
//           setLoading(false);
//         }) 
//         .catch(() => setLoading(false)); 
//     }
//   }, [searchQuery, dispatch]);



//   if (loading) {
//     return <div>Loading...</div>; 
//   }
//   return (
//     <div>
//       <h1>Shopping Listing</h1>
//       <p>Searching for: {searchQuery}</p>

//       <div className="listing_container">
//         <div className="bg-amber-950">
//           {/* <ProductFilter /> */}
//           <ProductFilter
//             selectedBrands={selectedBrands}
//             selectedCategories={selectedCategories}
//             setSelectedBrands={setSelectedBrands}
//             setSelectedCategories={setSelectedCategories}
//             handle_selecteSubmit={handle_selecteSubmit}
//           />
//         </div>

//         <div className="bg-amber-400">
//           <div className="flex justify-between">
//             <div className="font-bold font-extrabold">All Products</div>
//             <div>
//               {/* <SortBy /> */}
//               <SortBy />
//             </div>
//           </div>

//           <div>
//             <div className="product-grid grid grid-cols-3">
            

//               {filter_products.length == 0 ? (
//                 <div>No results found</div>
//               ) : (
//                 filter_products.map((product) => (
//                   <ShoppingProductCard key={product.id} product={product} />
//                 ))
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ShoppingListing;















import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetch_All_filter_Products } from "@/store/client/product_slice";
import React from "react";
import { useLocation } from "react-router-dom";
import "./shopping_style/listing_style.css";
import ProductFilter from "@/components/shopping-view/ProductFilter";
import SortBy from "./SortBy";
import ShoppingProductCard from "@/components/shopping-view/ShoppingProducCard";

function ShoppingListing() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Add this to store the search query
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { filter_products } = useSelector((state) => state.clientProductSlice);
  console.log("filter_products", filter_products);

  const location = useLocation();
  console.log(location);

  // Get query parameters from the URL
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query"); // 'query' for the search term
  const categories = queryParams.get("categories"); // 'categories' filter
  const brands = queryParams.get("brands"); // 'brands' filter

  // Set state based on query params
  useEffect(() => {
    if (query) setSearchQuery(query); // Set search query from URL
    if (categories) setSelectedCategories(categories.split(',')); // Parse categories if available
    if (brands) setSelectedBrands(brands.split(',')); // Parse brands if available

    // If a search query exists, fetch filtered products
    if (query || categories || brands) {
      setLoading(true);
      dispatch(fetch_All_filter_Products({ query, categories, brands }))
        .then(() => {
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [query, categories, brands, dispatch]);

  const handle_selecteSubmit =async () => {
    console.log("sjkdfhksjfhjskdf")
    console.log("Selected Categories:", selectedCategories);
    console.log("Selected Brands:", selectedBrands);
    await dispatch(fetch_All_filter_Products({ query: searchQuery, categories: selectedCategories, brands: selectedBrands }))
    // dispatch(fetch_All_filter_Products({ query: searchQuery, categories: selectedCategories, brands: selectedBrands }));
  
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Shopping Listing</h1>
      <p>Searching for: {searchQuery}</p>

      <div className="listing_container">
        <div className="bg-amber-950">
          <ProductFilter
            selectedBrands={selectedBrands}
            selectedCategories={selectedCategories}
            setSelectedBrands={setSelectedBrands}
            setSelectedCategories={setSelectedCategories}
            handle_selecteSubmit={handle_selecteSubmit}
          />
        </div>

        <div className="bg-amber-400">
          <div className="flex justify-between">
            <div className="font-bold font-extrabold">All Products</div>
            <div>
              <SortBy />
            </div>
          </div>

          <div>
            <div className="product-grid grid grid-cols-3">
              {filter_products.length === 0 ? (
                <div>No results found</div>
              ) : (
                filter_products.map((product) => (
                  <ShoppingProductCard key={product.id} product={product} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingListing;
