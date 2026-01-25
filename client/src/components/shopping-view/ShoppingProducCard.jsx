import React from "react";
import "./ShoppingProducCard.css";
import { Link } from "react-router-dom";
import { addToCart_home } from "@/store/client/product_slice/cart_slice/cart_index";
import { useDispatch } from "react-redux";
const ShoppingProductCard = ({ product }) => {
  const {
    brand,
    category,
    description,
    image,
    price,
    saleprice,
    title,
    totalstock,
  } = product;
const dispatch = useDispatch();

  const handleAddToCartHome = async () => {

    if (!product?._id) return;
    if (product.totalstock <= 0) return;

    // setAdding(true);
    // setAddErr("");

    try {
      // calls your thunk: addToCart({ productId, quantity })
      await dispatch(
        addToCart_home({ productId: product._id })
      ).unwrap();

      // optional: sync cart state after add
       dispatch(fetchCart());
    } catch (err) {
      const msg =
        typeof err === "string"
          ? err
          : err?.message || err?.error || "Failed to add to cart";
      // setAddErr(msg);
    } finally {
      // setAdding(false);
    }
  };






  return (
    <div className="product-card">
      <Link key={product._id} to={`/shop/product_details/${product._id}`} > <img src={image} alt={title} className="product-image" /></Link> 
      {/* <img src={image} alt={title} className="product-image" /> */}
      <div className="product-details">
        <Link key={product._id} to={`/shop/product_details/${product._id}`} >  <h2 className="product-title">{title}</h2></Link> 
       
        <p className="product-brand">Brand: {brand}</p>
        <p className="product-category">Category: {category}</p>
        {/* <p className="product-description">{description}</p> */}
        <div className="product-price">
          <span className="product-price-original">${price}</span>
          {saleprice && (
            <span className="product-price-sale">${saleprice}</span>
          )}
        </div>
        <p className="product-stock">Stock: {totalstock} items</p>
        <button
          onClick={handleAddToCartHome}
          className="bg-blue-500 text-white text-lg py-2 rounded-lg w-full hover:bg-blue-600"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ShoppingProductCard;

// import React from 'react';

// const ShoppingProductCard = ({ product }) => {
//   const {
//     brand,
//     category,
//     description,
//     image,
//     price,
//     saleprice,
//     title,
//     totalstock,
//   } = product;

//   return (
//     <div className="flex flex-col border border-gray-300 rounded-lg w-64 shadow-lg overflow-hidden">
//       <img src={image} alt={title} className="w-full h-48 object-cover" />
//       <div className="p-4 flex flex-col justify-between flex-grow">
//         <h2 className="text-lg font-bold mb-2">{title}</h2>
//         <p className="text-sm text-gray-600">Brand: {brand}</p>
//         <p className="text-sm text-gray-600 mb-2">Category: {category}</p>
//         {/* <p className="text-sm text-gray-600">{description}</p> */}
//         <div className="flex justify-between mb-4">
//           <span className="line-through text-gray-500">${price}</span>
//           {saleprice && <span className="text-red-600 font-semibold">${saleprice}</span>}
//         </div>
//         <p className="text-sm text-gray-600 mb-4">Stock: {totalstock} items</p>
//         <button className="bg-blue-500 text-white text-lg py-2 rounded-lg w-full hover:bg-blue-600">
//           Add to Cart
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ShoppingProductCard;
