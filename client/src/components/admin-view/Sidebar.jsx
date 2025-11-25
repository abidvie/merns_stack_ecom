// import { MdAdminPanelSettings } from "react-icons/md";
// import { useNavigate } from "react-router-dom";

// const adminsidebarmenuitems = [
//   {
//     id: "dashboard",
//     label: "Dashboard",
//     link: "/admin/dashboard",
//     icon: "fa-solid fa-table-columns",
//   },

//   {
//     id: "products",
//     label: "products",
//     link: "/admin/products",
//     icon: "fa-solid fa-table-columns",
//   },

//   {
//     id: "orders",
//     label: "orders",
//     link: "/admin/orders",
//     icon: "fa-solid fa-table-columns",
//   },

// ];

// const MenuItems=()=>{
//     const navigate=useNavigate();
//     return (
//         <nav className="mt-8 flex flex-col gap-2">
//             {adminsidebarmenuitems.map((item)=>{
//                 return(
//                     <div onClick={()=>{navigate(item.link)}}  key={item.id} className="flex items-center gap-2 text-sm font-medium text-gray-700 px-4 py-2 hover:bg-gray-100 rounded-md">
//                         <i className={item.icon}></i>
//                         {item.label}
//                     </div>
//                 )
//             })}
//         </nav>
//     ) 
// }

// function AdminSidebar(){
//     const navigate=useNavigate()
//     return(
//         <div className="w-[15%] flex text-black h-screen   bg-amber-400">
//         <div onClick={()=>{navigate('/admin/dashboard')}} className="flex justify-evenly w-full cursor-pointer h-min">
//              ADMIN PANEL
//          <MdAdminPanelSettings size={30}  />
//         </div>
//         <MenuItems/>
//         </div>
//     )
// }

// export default AdminSidebar;






import { useNavigate } from "react-router-dom";
import { MdDashboard, MdOutlineBorderColor, MdOutlineProductionQuantityLimits, MdAdminPanelSettings } from "react-icons/md";

const adminsidebarmenuitems = [
  { id: "dashboard", label: "Dashboard", link: "/admin/dashboard", icon: <MdDashboard /> },
  { id: "products", label: "Products", link: "/admin/products", icon: <MdOutlineBorderColor /> },
  { id: "orders", label: "Orders", link: "/admin/orders", icon: <MdOutlineProductionQuantityLimits /> },
];

const MenuItems = () => {
  const navigate = useNavigate();
  return (
    <nav className="mt-8 flex flex-col gap-2">
      {adminsidebarmenuitems.map((item) => (
        <div
          onClick={() => navigate(item.link)}
          key={item.id}
          className="flex items-center gap-2 text-sm font-medium text-gray-700 px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer"
        >
          {item.icon} {/* Directly rendering the icon */}
          {item.label}
        </div>
      ))}
    </nav>
  );
};

function AdminSidebar() {
  const navigate = useNavigate();
  return (
    <div className="w-[15%] flex text-black h-screen bg-amber-400 flex-col">
      <div onClick={() => navigate("/admin/dashboard")} className="flex items-center justify-center gap-2 cursor-pointer h-min p-4">
        <span>ADMIN PANEL</span>
        <MdAdminPanelSettings size={30} />
      </div>

      <MenuItems />
    </div>
  );
}

export default AdminSidebar;
