import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="student-sidebar">

      {/* ================= SIDEBAR HEADER ================= */}

      <div className="sidebar-header">

        <div className="sidebar-logo">
          <span>✓</span>
        </div>

        <div>
          <h6 className="fw-bold mb-0">
            Student Portal
          </h6>

          <small className="text-muted">
            CampusCare
          </small>
        </div>

      </div>


      {/* ================= MENU ================= */}

      <div className="sidebar-section">

        <small className="sidebar-heading">
          MENU
        </small>


        <nav className="nav flex-column gap-1">

          <NavLink
            to="/student-dashboard"
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <span className="sidebar-icon">
              ▦
            </span>

            <span>
              Dashboard
            </span>
          </NavLink>


          <NavLink
            to="/create-complaint"
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <span className="sidebar-icon">
              +
            </span>

            <span>
              Create Complaint
            </span>
          </NavLink>


          <NavLink
            to="/my-complaints"
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <span className="sidebar-icon">
              ≡
            </span>

            <span>
              My Complaints
            </span>
          </NavLink>

        </nav>

      </div>


      {/* ================= HELP CARD ================= */}

      <div className="sidebar-bottom">

        <div className="sidebar-help">

          <div className="sidebar-help-icon">
            ?
          </div>

          <div>

            <h6 className="fw-semibold mb-1">
              Need help?
            </h6>

            <small className="text-muted">
              Submit a complaint and
              track its progress here.
            </small>

          </div>

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;