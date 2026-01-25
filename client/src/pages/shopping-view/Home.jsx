import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import { useState } from "react";
import "./shopping_style/home_style.css";

import { FaAward, FaRegNewspaper, FaTag } from "react-icons/fa"; // Importing React icons for each category
import {
  FaCheckCircle,
  FaShippingFast,
  FaDollarSign,
  FaTools,
} from "react-icons/fa"; // Importing icons for each feature
import ProductFilter from "@/components/shopping-view/ProductFilter";
import SortBy from "./SortBy";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import {
  addNewProducts,
  deleteProduct,
  editAProduct,
  fetchAllProducts,
} from "@/store/admin/products_sliec";


import ShoppingProductCard from "@/components/shopping-view/ShoppingProducCard";
function ShoppingHome() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);
  // Track which dropdown is currently active
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { products } = useSelector((state) => state.AdminProducts);
  console.log("home ", products);
const navigate = useNavigate();

//search bar


  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Handle the search logic here, e.g., filter products or navigate to search results page
    console.log("Searching for:", searchQuery);
    navigate(`/shop/listing?query=${searchQuery}`);
  };
//search bar


  return (
    <>
      <div
        className=" w-full  bg-amber-300"
        onMouseLeave={() => setActiveDropdown(null)}
      >
     




         <div className="header_below_section">
      <div className="div1">
        <span
          onMouseEnter={() => setActiveDropdown("all-categories")}
          className="mr-6 element"
        >
          All Categories
        </span>
        <span
          onMouseEnter={() => setActiveDropdown("featured-selections")}
          className="mr-6 element"
        >
          Featured Selections
        </span>
        <span
          onMouseEnter={() => setActiveDropdown("order-protection")}
          className="mr-6 element"
        >
          Order Protection
        </span>
      </div>

      <div className="search-bar-container">
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
            placeholder="Search for products, categories..."
          />
          <button type="submit" className="search-btn">
            🔍
          </button>
        </form>
      </div>

      <div className="div2">
        <span
          onMouseEnter={() => setActiveDropdown("buyer-central")}
          className="mr-6 element"
        >
          Buyer Central
        </span>
        <span
          onMouseEnter={() => setActiveDropdown("help-central")}
          className="mr-6 element"
        >
          Help Central
        </span>
        <span
          onMouseEnter={() => setActiveDropdown("app-extensions")}
          className="mr-6 element"
        >
          App & Extensions
        </span>
      </div>
    </div>

        {/* Dropdown Container - Only shows if activeDropdown is not null */}
        {activeDropdown && (
          <div className="dropdown-container">
            {activeDropdown === "all-categories" && (
              <div className="dropdown-item">
                <h2>All Categories Content</h2>
              </div>
            )}
            {activeDropdown === "featured-selections" && (
              //
              <div className="dropdown-item">
                <h2>Featured Selections Content</h2>
                <div className="featured-selections">
                  <div className="selection-card">
                    <FaAward size={40} />
                    <p>Top ranking</p>
                  </div>
                  <div className="selection-card">
                    <FaRegNewspaper size={40} />
                    <p>New arrivals</p>
                  </div>
                  <div className="selection-card">
                    <FaTag size={40} />
                    <p>Top deals</p>
                  </div>
                </div>
              </div>
            )}
            {activeDropdown === "order-protection" && (
              // <div className="dropdown-item"><h2>Order Protection Content</h2></div>
              <div className="dropdown-item">
                <h2>Order Protection Content</h2>
                <p>Enjoy protection from payment to delivery</p>
                <div className="order-protection-cards">
                  <div className="order-card">
                    <FaCheckCircle size={40} color="#FFBB33" />
                    <p>Safe & easy payments</p>
                    <span className="arrow">→</span>
                  </div>
                  <div className="order-card">
                    <FaDollarSign size={40} color="#FFBB33" />
                    <p>Money-back policy</p>
                    <span className="arrow">→</span>
                  </div>
                  <div className="order-card">
                    <FaShippingFast size={40} color="#FFBB33" />
                    <p>Shipping & logistics services</p>
                    <span className="arrow">→</span>
                  </div>
                  <div className="order-card">
                    <FaTools size={40} color="#FFBB33" />
                    <p>After-sales protections</p>
                    <span className="arrow">→</span>
                  </div>
                </div>
              </div>
            )}
            {activeDropdown === "buyer-central" && (
              <div className="dropdown-item">
                <h2>buyer-central</h2>
              </div>
            )}
            {activeDropdown === "help-central" && (
              <div className="dropdown-item">
                <h2>help-central</h2>
              </div>
            )}
            {activeDropdown === "app-extensions" && (
              <div className="dropdown-item">
                <h2>app-extensions</h2>
              </div>
            )}
            {/* ... Repeat for other items ... */}
          </div>
        )}
      </div>

      <div className="container">
        {/* <div className="bg-amber-950">
          <ProductFilter />
        </div> */}

        <div className="bg-amber-400">
        

          <div className="flex justify-between">
            <div className="font-bold font-extrabold">All Products</div>
            <div>
              <SortBy />
            </div>
          </div>

          <div>
            {/* <ShoppingProductCard product={products}/> */}
            <div className="product-grid grid grid-cols-3">
              {products.map((product) => (
                // console.log(product._id),
              // <Link key={product._id} to={`/shop/product_details/${product._id}`} ><ShoppingProductCard product={product} /></Link>
              <ShoppingProductCard product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShoppingHome;
