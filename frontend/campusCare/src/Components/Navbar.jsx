import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="container">
        <Link to="/" className="navbar-brand fw-bold">
          CampusCare
        </Link>

        <div className="navbar-nav ms-auto align-item-center">
          {!user && (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link">Register</Link>
              <Link to="/admin-login" className="nav-link">Admin</Link>
            </>
          )}

          {user && user.role !== "admin" && (
            <>
              <Link to="/student-dashboard" className="nav-link">Dashboard</Link>
              <Link to="/my-complaints" className="nav-link">My Complaints</Link>

              <button onClick={logout} className="btn btn-outline-light btn-sm ms-2">
                Logout
              </button>
            </>
          )}

          {user && user.role === "admin" && (
            <>
              <Link to="/admin-dashboard" className="nav-link">Dashboard</Link>
              <Link to="/manage-complaint" className="nav-link">
                Manage Complaints
              </Link>

              <button onClick={logout} className="btn btn-outline-light btn-sm ms-2">
                Logout
              </button>
            </>
          )}
        </div>
        </div>
    </nav>
  );
}

export default Navbar;