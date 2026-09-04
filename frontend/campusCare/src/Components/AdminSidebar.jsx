import { NavLink } from "react-router-dom";

function AdminSidebar() {
  return (
    <aside className="bg-light border-end p-3">
      <h5 className="mb-4">Admin Menu</h5>

      <div className="nav flex-column gap-1">
        <NavLink
          to="/admin-dashboard"
          className="nav-link"
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/manage-complaints"
          className="nav-link"
        >
          Manage Complaints
        </NavLink>
      </div>
    </aside>
  );
}

export default AdminSidebar;