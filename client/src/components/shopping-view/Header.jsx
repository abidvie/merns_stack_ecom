import React, { useState } from "react";
import { BsCart3 } from "react-icons/bs"; // Shopping Cart Icon
import { FaUserCircle } from "react-icons/fa"; // User Icon
import { GiGlobe } from "react-icons/gi"; // Globe Icon for language selector
import { Link } from "react-router-dom";
import "./header_style.css";
import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { toast } from "sonner"
import { logoutuser } from '@/store/auth-slice';
function ShoppingHeader() {
  const [message, setMessage] = useState("");
  const { isLoading, error, isAuthenticated, username, email } = useSelector(
    (state) => state.auth
  );
  console.log("Header value from Redux store:", username);


const dispatch = useDispatch();
const handleLogout=async()=>{
      try {
        const result = await dispatch(logoutuser());
         console.log('Response log in logoutpage:', result); // Log the full result
        
        if (result.payload.success) {
            setMessage(result.payload.message);
        
        
            toast(result.payload.message);
          navigate('/auth/login'); 

        } else  {
          toast(result.payload.message);
            setMessage(result.error.message);
        }
    } catch (error) {
        // console.error('Error:', error);
         
       setMessage('Log out  failed');
    }    
     
}


  return (
    <header className="flex justify-between items-center p-4 shadow-md ">
      {/* Logo */}
      <div className="text-3xl font-bold text-orange-500 cursor-pointer">
        <Link to="/shop/home" className="text-blue-500">
          {" "}
          Alibaba.com
        </Link>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center space-x-6">
        {/* Country Selector */}
        <div className="flex items-center space-x-2 border p-2 rounded-md bg-gray-100">
          <span className="text-gray-800">Deliver to:</span>
          <select className="bg-transparent text-gray-800">
            <option value="BD">🇧🇩 BD</option>
            <option value="US">🇺🇸 US</option>
          </select>
        </div>

        {/* Language and Currency Icon */}
        <div className="p-2 cursor-pointer text-gray-800 hover:text-orange-500">
          <GiGlobe size={20} />
        </div>

        {/* Shopping Cart Icon */}
        <div>
          <BsCart3
            size={24}
            className="text-gray-800 cursor-pointer hover:text-orange-500"
          />
        </div>

        {/* User Profile Icon */}
        <div className="mega_menu_container p-2 cursor-pointer text-gray-800 hover:text-orange-500 font-bold bg-gray-200 rounded-full">
          {/* <FaUserCircle size={20} /> */}
          {username ? (
            username.charAt(0).toUpperCase()+username.charAt(1).toUpperCase()
          ) : (
            <FaUserCircle size={20} />
          )}
          <div className="mega_drop ">
            <div className="mega_grid">
              <div className="mega_child_div  ">
                <div className="flex justify-center items-center p-4 ">
                  <div className="bg-white  w-80 p-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-full flex justify-center items-center text-xl text-white font-semibold">
                        {username ? username.charAt(0).toUpperCase() : "U"}
                      </div>

                      <div>
                        <p className="text-lg font-semibold text-gray-700 ">
                          {username}
                        </p>
                        <p className="text-sm text-gray-500">
                          {email ? email : "XXXXXXXXXXXXXX"}
                        </p>
                      </div>
                    </div>
                    <div className="border-b-4 border-solid mt-2.5 "></div>

                    <div className="mt-4">
                      <a
                        href="#"
                        className="text-blue-500 hover:underline text-sm mt-1.5"
                      >
                        My Alibaba
                      </a>
                      <br />
                      <a
                        href="#"
                        className="text-blue-500 hover:underline text-sm mt-1.5"
                      >
                        Orders
                      </a>
                      <br />
                      <a
                        href="#"
                        className="text-blue-500 hover:underline text-sm mt-1.5"
                      >
                        Messages
                      </a>
                      <br />
                      <p className="text-blue-500 hover:underline text-sm mt-1.5">
                        Favorites
                      </p>
                      <p className="text-blue-500 hover:underline text-sm mt-1.5 cursor-pointer">
                        <Link to={'/shop/account'}>Accoun</Link>t
                      </p>
                     
                        <button onClick={handleLogout} className="cursor-auto logout-btn text-blue-500 hover:underline text-sm mt-10.5 border-t  pt-2">Log Out</button>
                     
                    </div>

                    {/* <div className="mt-4">
                      <p className="text-sm text-gray-700">Other Chrome profiles</p>
                      <p className="text-sm text-blue-500 cursor-pointer">
                        ABID SARKER DIPTO (student.cuet.ac.bd)
                      </p>
                      <div className="flex space-x-4 mt-2">
                        <button className="text-blue-500 text-sm hover:underline">
                          Add Chrome profile
                        </button>
                        <button className="text-blue-500 text-sm hover:underline">
                          Open Guest profile
                        </button>
                        <button className="text-blue-500 text-sm hover:underline">
                          Manage Chrome profiles
                        </button>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mega_menu_container p-2 cursor-pointer text-gray-800 hover:text-orange-500">
          About
          <div className="mega_drop">
            <div className="mega_grid">
              <div className="mega_child_div">
                Links
                <ul>
                  <li>PortFolio</li>
                  <li>Teams</li>
                </ul>
              </div>
              <div className="mega_child_div">
                <spam className="font-bold">Social_Media</spam>
                <ul>
                  <li>
                    <FaFacebook size={20} />
                  </li>
                  <li>
                    <FaGithub size={20} />
                  </li>
                </ul>
              </div>
              <div className="mega_child_div">
                <p className="font-bold">Links</p>
                <ul>
                  <li>PortFolio</li>
                  <li>Teams</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <button className="px-4 py-2 text-white bg-orange-500 rounded-md text-sm hover:bg-orange-600">
          Create Account
        </button>
      </div>
    </header>
  );
}

export default ShoppingHeader;
