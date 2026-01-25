import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/Layout";
import AuthLogin from "./pages/auth/Login";
import AuthRegister from "./pages/auth/Register";
import AdminLayout from "./components/admin-view/layout";
import AdminDashboard from "./pages/admin-view/Dashboard";
import AdminOrders from "./pages/admin-view/Orders";
import AdminProducts from "./pages/admin-view/Products";
import ShoppingLayout from "./components/shopping-view/Layout";
import NotFound from "./pages/not-found-page";
import ShoppingAccount from "./pages/shopping-view/Account";
import ShoppingCheckOut from "./pages/shopping-view/CheckOut";
import ShoppingListing from "./pages/shopping-view/Listing";
import ShoppingHome from "./pages/shopping-view/Home";
import CheckAuth from "./components/common/Check-auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkauth } from "./store/auth-slice";
import Logout from "./pages/auth/Logout";
import ProductDetails from "./pages/shopping-view/ProductDetails";
import Cart_page from "./pages/shopping-view/Cart_page";

// import { Car } from "lucide-react";

function App() {

  const {isAuthenticated,user,isLoading}= useSelector((state)=>state.auth);
//  console.log('App.jsx - isAuthenticated:', isAuthenticated);
//  console.log('App.jsx - user role:', user);

 const dispatch=useDispatch();

// const result = await dispatch(checkauth());
 useEffect(() => {
   dispatch(checkauth());
 }, [dispatch]);
 
 if(isLoading){
  return <div className="flex items-center justify-center h-screen">
  <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
</div>
 }

  return (
    <div className="flex flex-col overflow-hidden ">
      <Routes>
        <Route
          path="/auth"
          element={
            <CheckAuth isauthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
          <Route path="logout" element={<Logout />} />
        </Route>

        <Route
          path="/admin"
          element={
            <CheckAuth isauthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<AdminProducts />} />
        </Route>

        <Route
          path="/shop"
          element={
            <CheckAuth isauthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ShoppingHome />} />
          <Route path="cart" element={<Cart_page/>} />
          <Route path="product_details/:id" element={<ProductDetails />} /> 
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="checkout" element={<ShoppingCheckOut />} />
          <Route path="account" element={<ShoppingAccount />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
