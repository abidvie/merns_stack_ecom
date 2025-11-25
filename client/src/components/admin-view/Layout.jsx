import { Outlet } from 'react-router-dom'
import AdminHeader from './Header';
import AdminSidebar from './Sidebar';
function AdminLayout(){
    return (
        <div className="flex min-h-screen w-full bg-red-400">
           {/* <AdminSidebar/> */}
            <div className="flex flex-1 flex-col bg-amber-50">
              <AdminHeader/>
                <main className='flex flex-1 bg-muted-40 p-4 md:p-6'>
                    <Outlet/>
                </main>
            </div>
        </div>
    )
}

export default AdminLayout;