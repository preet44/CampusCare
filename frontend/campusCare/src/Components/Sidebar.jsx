import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="bg-light border-end p-3">
      <h5 className="mb-4">Student Menu</h5>

      <div className="nav flex-column gap-1">
        <NavLink
          to="/student-dashboard"
          className="nav-link"
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/create-complaint"
          className="nav-link"
        >
          Create Complaint
        </NavLink>

        <NavLink
          to="/my-complaints"
          className="nav-link"
        >
          My Complaints
        </NavLink>
      </div>
    </aside>
  );
}

export default Sidebar;