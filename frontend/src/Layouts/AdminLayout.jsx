import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import AdminSidebar from "../Components/AdminSidebar";

function AdminLayout() {
  return (
    <div className="admin-layout">

      <Navbar />

      <div className="admin-layout-body">

        <AdminSidebar />

        <main className="admin-main">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default AdminLayout;