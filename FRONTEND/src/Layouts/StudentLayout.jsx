import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import { Outlet } from "react-router-dom";
import PageTransition from "../Components/PageTransition";

function StudentLayout() {
  return (
    <div className="student-layout">
      <Navbar />

      <div className="student-layout-body">
        <Sidebar />

        <main className="student-main">
         <PageTransition>
            <Outlet />
          </PageTransition>
        </main>
      </div>
    </div>
  );
}

export default StudentLayout;

