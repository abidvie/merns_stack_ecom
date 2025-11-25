// function AuthRegister(){
//     return(
//         <div className="bg-amber-950">Register</div>
//     )
// }
// export default AuthRegister;






// src/components/AuthRegister.jsx
import React, { use, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "@/store/auth-slice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner"
function AuthRegister() {
  const [formData, setFormData] = useState({
    name: "",
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
    // console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data before dispatch:', formData);

      try {
        const result = await dispatch(registerUser(formData));
        console.log('Response abid:', result); // Log the full result
        
        if (result.payload.success) {
            setMessage(result.payload.message);

            setFormData({ name: "", email: "", password: "" });
            toast(result.payload.message);
          navigate('/auth/login'); // Redirect to login page after successful registration

        } else  {
          toast(result.payload.message);
            setMessage(result.error.message);
        }
    } catch (error) {
        // console.error('Error:', error);
         
       setMessage('Registration failed');
    }  
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        {message && <p className="text-center mb-4 text-red-500">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
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
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AuthRegister;
