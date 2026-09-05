import { NavLink } from "react-router-dom";

function AdminSidebar() {
  return (
    <aside className="admin-sidebar">

      <div className="admin-sidebar-header">

        <div className="admin-sidebar-logo">
          <span>✓</span>
        </div>

        <div>
          <h6>Admin Portal</h6>
          <small>CampusCare</small>
        </div>

      </div>

      <div className="admin-sidebar-section">

        <small className="admin-sidebar-heading">
          MENU
        </small>

        <nav className="nav flex-column gap-1">

          <NavLink
            to="/admin-dashboard"
            className={({ isActive }) =>
              `admin-sidebar-link ${
                isActive ? "active" : ""
              }`
            }
          >
            <span className="admin-sidebar-icon">
              ▦
            </span>

            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/manage-complaints"
            className={({ isActive }) =>
              `admin-sidebar-link ${
                isActive ? "active" : ""
              }`
            }
          >
            <span className="admin-sidebar-icon">
              ≡
            </span>

            <span>Manage Complaints</span>
          </NavLink>

        </nav>

      </div>

      <div className="admin-sidebar-bottom">

        <div className="admin-help-box">

          <div className="admin-help-icon">
            ?
          </div>

          <div>
            <h6>Admin Panel</h6>

            <small>
              Monitor and manage student
              complaints from here.
            </small>
          </div>

        </div>

      </div>

    </aside>
  );
}

export default AdminSidebar;