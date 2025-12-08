
// // import { Sidebar } from "lucid";
// import AdminSidebar from "./Sidebar";
// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// // import { logoutuser } from "./path/to/your/thunk"; // Update with the correct path
// import { MdDashboard, MdOutlineBorderColor, MdOutlineProductionQuantityLimits, MdAdminPanelSettings } from "react-icons/md";
// const adminsidebarmenuitems = [
//   { id: "dashboard", label: "Dashboard", link: "/admin/dashboard", icon: <MdDashboard /> },
//   { id: "products", label: "Products", link: "/admin/products", icon: <MdOutlineBorderColor /> },
//   { id: "orders", label: "Orders", link: "/admin/orders", icon: <MdOutlineProductionQuantityLimits /> },
// ];

// const MenuItems = () => {
//   const navigate = useNavigate();
//   return (
//     <nav className="hidden md:flex items-center space-x-8">
//       {adminsidebarmenuitems.map((item) => (
//         <div
//           onClick={() => navigate(item.link)}
//           key={item.id}
//           className="hover:underline"
//         >
//           {item.icon} {/* Directly rendering the icon */}
//           {item.label}
//         </div>
//       ))}
//     </nav>
//   );
// };


// const AdminHeader = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const dispatch = useDispatch();
//     const navigate = useNavigate();
//   const handleLogout = () => {
//     // dispatch(logoutuser())
//     //   .then(() => {
//     //     console.log("User logged out successfully");
//     //     // Optionally, redirect user to the login page
//     //     // window.location.href = '/login';
//     //   })
//     //   .catch((error) => {
//     //     console.error("Logout failed:", error);
//     //   });
//   };

//   return (
//     <header className="flex justify-between items-center p-4 bg-gray-800 text-white shadow-md gap-5">
//       {/* Logo Section */}
//       <div className="flex items-center space-x-2">
//         <h2 className="text-2xl font-semibold">My E-Commerce</h2>
//       </div>

//       {/* Search Bar */}
//       <div className="flex flex-grow justify-center max-w-md">
//         <input
//           type="text"
//           placeholder="Search products..."
//           className="w-full px-4 py-2 text-lg rounded-lg bg-gray-700 text-white focus:outline-none"
//         />
//       </div>

//       {/* Hamburger Menu for Mobile */}
//       <div className="md:hidden flex items-center">
//         <button
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//           className="text-white focus:outline-none"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-6 w-6"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             strokeWidth="2"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M4 6h16M4 12h16M4 18h16"
//             />
//           </svg>
//         </button>
//       </div>

//       {/* Navigation Links for Desktop */}
//       {/* <nav className="hidden md:flex items-center space-x-8">
//         <a href="/dashboard" className="hover:underline">
//           Dashboard
//         </a>
//         <a href="/orders" className="hover:underline">
//           Orders
//         </a>
//         <a href="/users" className="hover:underline">
//           Users
//         </a>
//         <a href="/settings" className="hover:underline">
//           Settings
//         </a>
//       </nav> */}

//         <div >
//             {/* <div onClick={() => navigate("/admin/dashboard")} className="flex items-center justify-center gap-2 cursor-pointer h-min p-4">
//               <span>ADMIN PANEL</span>
//               <MdAdminPanelSettings size={30} />
//             </div> */}
      
//             <MenuItems />
//           </div>

//       {/* User Profile and Logout */}
//       <div className="flex items-center space-x-4 gap-3">
//         <img
//           src="https://via.placeholder.com/40"
//           alt="User"
//           className="w-10 h-10 rounded-full"
//         />
//         <button
//           onClick={handleLogout}
//           className="bg-red-500 px-4 py-2 rounded-md text-white hover:bg-red-600"
//         >
//           Logout
//         </button>
//       </div>

//       {/* Mobile Menu (Only visible on small screens) */}
//       {isMenuOpen && (
//         <nav className=" md:hidden absolute top-16 left-0 w-full bg-gray-800 p-4 flex flex-col space-y-4">
//           {/* <a href="/dashboard" className="hover:underline">
//             Dashboard
//           </a>
//           <a href="/orders" className="hover:underline">
//             Orders
//           </a>
//           <a href="/users" className="hover:underline">
//             Users
//           </a>
//           <a href="/settings" className="hover:underline">
//             Settings
//           </a> */}
//                {/* <AdminSidebar/>       */}
//                <MenuItems/>
//         </nav>
//       )}
//     </header>
//   );
// };

// export default AdminHeader;









import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdDashboard, MdOutlineBorderColor, MdOutlineProductionQuantityLimits, MdAdminPanelSettings } from "react-icons/md";
import { logoutuser } from "@/store/auth-slice";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
const adminsidebarmenuitems = [
  { id: "dashboard", label: "Dashboard", link: "/admin/dashboard", icon: <MdDashboard /> },
  { id: "products", label: "Products", link: "/admin/products", icon: <MdOutlineBorderColor /> },
  { id: "orders", label: "Orders", link: "/admin/orders", icon: <MdOutlineProductionQuantityLimits /> },
];

const MenuItems = () => {
  const navigate = useNavigate();
  return (
    <nav className="flex flex-col md:flex-row md:space-x-8 mt-8 md:mt-0">
      {adminsidebarmenuitems.map((item) => (
        <div
          onClick={() => navigate(item.link)}
          key={item.id}
          className="text-sm font-medium text-gray-700 px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer"
        >
          {item.icon} {/* Directly rendering the icon */}
          {item.label}
        </div>
      ))}
    </nav>
  );
};

const AdminHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
const [message, setMessage] = useState("");


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
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white shadow-md gap-5">
      {/* Logo Section */}
      <div className="flex items-center space-x-2">
        <h2 className="text-2xl font-semibold">My E-Commerce</h2>
      </div>

      {/* Search Bar */}
      <div className="flex flex-grow justify-center max-w-md">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full px-4 py-2 text-lg rounded-lg bg-gray-700 text-white focus:outline-none"
        />
      </div>

      {/* Hamburger Menu for Mobile */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* User Profile and Logout */}
      <div className="flex items-center space-x-4 gap-3">
        <img
          src="https://via.placeholder.com/40"
          alt="User"
          className="w-10 h-10 rounded-full"
        />
        <button
          onClick={handleLogout} // Placeholder for logout functionality
          className="bg-red-500 px-4 py-2 rounded-md text-white hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* Mobile Menu (Only visible on small screens) */}
      {isMenuOpen && (
        <nav className="absolute top-16 left-0 w-full bg-gray-800 p-4 flex flex-col space-y-4 md:hidden">
          <MenuItems />
        </nav>
      )}

      {/* Desktop Menu (Always visible on larger screens) */}
      <div className="hidden md:flex">
        <MenuItems />
      </div>
    </header>
  );
};

export default AdminHeader;
