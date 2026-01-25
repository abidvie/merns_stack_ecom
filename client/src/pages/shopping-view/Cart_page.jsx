



// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { BsCart3 } from "react-icons/bs"; // Using React Icons
// import {
//   fetchCart,
//   updateCartQuantity,
//   removeCartItem,
//   clearCart,
// } from "../../store/client/product_slice/cart_slice/cart_index";

// const CartPage = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
  
//   const { cart, loading, error } = useSelector((state) => state.cartSlice);
//   console.log("cart", cart);
  
//   const [quantity, setQuantity] = useState({}); // To track quantities dynamically

//   const items = cart?.items || [];

//   useEffect(() => {
//     dispatch(fetchCart()); // Fetch cart when component mounts
//   }, [dispatch]);

//   const handleUpdateQuantity = (productId, newQuantity) => {
//     if (newQuantity < 1) return; // Prevent negative quantities
//     dispatch(updateCartQuantity({ productId, quantity: newQuantity }));
//   };

//   const handleRemoveItem = (productId) => {
//     dispatch(removeCartItem(productId));
//   };

//   const handleClearCart = () => {
//     dispatch(clearCart());
//   };

//   if (loading) return <div className="p-4 text-center">Loading...</div>;

//   return (
//     <div className=" mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold text-center my-8">Your Cart</h1>
//       {error && <div className="error-message text-red-600">{error}</div>}
      
//       {items.length === 0 ? (
//         <div className="text-center text-xl text-gray-500">Your cart is empty</div>
//       ) : (
//         <div className="space-y-6">
//           {items.map((item) => (
//             <div key={item.productId} className="flex items-center justify-between p-4 border-b border-gray-200">
//               <div className="flex items-center space-x-4">
//                 <img src={item.image} alt={item.title} className="w-24 h-24 object-cover rounded-md" />
//                 <div>
//                   <h3 className="text-xl font-semibold">{item.title}</h3>
//                   <p className="text-sm text-gray-500">{item.brand}</p>
//                   <p className="text-lg text-gray-800">Price: ৳{item.price}</p>
//                 </div>
//               </div>

//               <div className="flex items-center space-x-4">
//                 <div className="flex items-center space-x-2">
//                   <input
//                     type="number"
//                     min="1"
//                     value={quantity[item.productId] || item.quantity}
//                     onChange={(e) => {
//                       setQuantity({
//                         ...quantity,
//                         [item.productId]: parseInt(e.target.value, 10),
//                       });
//                     }}
//                     className="w-16 p-2 text-center border rounded-md"
//                   />
//                   <button
//                     onClick={() =>
//                       handleUpdateQuantity(item.productId, quantity[item.productId] || item.quantity)
//                     }
//                     className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
//                   >
//                     Update
//                   </button>
//                 </div>

//                 <button
//                   onClick={() => handleRemoveItem(item.productId)}
//                   className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
//                 >
//                   Remove
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       <div className="flex justify-between items-center mt-6">
//         <div className="space-y-2">
//           <p className="text-xl font-semibold">Total Items: {cart?.totalItems || 0}</p>
//           <p className="text-lg text-gray-700">Subtotal: ৳{cart?.subtotal || 0}</p>
//         </div>

//         <div className="flex space-x-4">
//           <button
//             onClick={handleClearCart}
//             className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300"
//           >
//             Clear Cart
//           </button>
//           <button
//             onClick={() => navigate("/checkout")}
//             className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
//           >
//             Proceed to Checkout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartPage;







import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BsCart3 } from "react-icons/bs"; // React Icons for Cart Icon
import {
  fetchCart,
  updateCartQuantity,
  removeCartItem,
  clearCart,
} from "../../store/client/product_slice/cart_slice/cart_index";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cart, loading, error } = useSelector((state) => state.cartSlice);

  const [quantity, setQuantity] = useState({}); // To track quantities dynamically

  const items = cart?.items || [];

  useEffect(() => {
    dispatch(fetchCart()); // Fetch cart when component mounts
  }, [dispatch]);

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return; // Prevent negative quantities
    dispatch(updateCartQuantity({ productId, quantity: newQuantity }));
  };

  const handleRemoveItem = (productId) => {
    dispatch(removeCartItem(productId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (loading) return <div className="p-4 text-center">Loading...</div>;

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Your Cart</h1>
      
      {error && (
        <div className="bg-red-100 text-red-600 p-4 rounded-md text-center mb-6">
          {error}
        </div>
      )}

      {items.length === 0 ? (
        <div className="text-center text-xl text-gray-500">Your cart is empty</div>
      ) : (
        <div className="space-y-6">
          {items.map((item) => (
            <div key={item.productId} className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center space-x-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.brand}</p>
                  <p className="text-lg text-gray-800">Price: ৳{item.price}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    min="1"
                    value={quantity[item.productId] || item.quantity}
                    onChange={(e) => {
                      setQuantity({
                        ...quantity,
                        [item.productId]: parseInt(e.target.value, 10),
                      });
                    }}
                    className="w-16 p-2 text-center border rounded-md"
                  />
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item.productId, quantity[item.productId] || item.quantity)
                    }
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                  >
                    Update
                  </button>
                </div>

                <button
                  onClick={() => handleRemoveItem(item.productId)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-between items-center mt-6">
        <div className="space-y-2">
          <p className="text-xl font-semibold">Total Items: {cart?.totalItems || 0}</p>
          <p className="text-lg text-gray-700">Subtotal: ৳{cart?.subtotal || 0}</p>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={handleClearCart}
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300"
          >
            Clear Cart
          </button>
          <button
            onClick={() => navigate("/checkout")}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
