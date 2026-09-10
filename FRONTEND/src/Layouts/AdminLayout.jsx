import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import AdminSidebar from "../Components/AdminSidebar";

import PageTransition from "../Components/PageTransition";

function AdminLayout() {
  return (
    <div className="admin-layout">

      <Navbar />

      <div className="admin-layout-body">

        <AdminSidebar />

        <main className="admin-main">
        <PageTransition>
            <Outlet />
          </PageTransition>
        </main>

      </div>

    </div>
  );
}

export default AdminLayout;

