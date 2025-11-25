


import React, { use, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser, registerUser } from "@/store/auth-slice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner"
function AuthLogin(){
  const [formData, setFormData] = useState({
    
    email: "",
    password: "",
  });

    const { isLoading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );


  const [message, setMessage] = useState("");
  const dispatch =useDispatch();   

const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
     
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Log_in_Form data before dispatch:', formData);

      try {
        const result = await dispatch(LoginUser(formData));
        // console.log('Response log in abid:', result); // Log the full result
        
        if (result.payload.success) {
            setMessage(result.payload.message);

            setFormData({  email: "", password: "" });
            toast(result.payload.message);
         

        } else  {
          toast(result.payload.message);
            setMessage(result.error.message);
        }
    } catch (error) {
        // console.error('Error:', error);
         
       setMessage('Log in  failed');
    }  
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">LOG IN</h2>
        {message && <p className="text-center mb-4 text-red-500">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
        
          <div>
            <label className="block mb-1 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-amber-950 text-white py-2 rounded hover:bg-amber-900 transition"
          >
            {isLoading ? "Processsing" : "LOG IN"}
            
          </button>
        </form>
      </div>
    </div>
  );
}

export default AuthLogin;
