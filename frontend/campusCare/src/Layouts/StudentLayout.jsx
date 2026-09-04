import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";

function StudentLayout() {
  return (
    <div className="min-vh-100">

      <Navbar />

      <div className="container-fluid">
        <div className="row">

          <div className="col-md-3 col-lg-2 p-0">
            <Sidebar />
          </div>

          <main className="col-md-9 col-lg-10 py-4">
            <Outlet />
          </main>

        </div>
      </div>

    </div>
  );
}

export default StudentLayout;