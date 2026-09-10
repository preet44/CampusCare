import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg campus-navbar">

      <div className="container">

        {/* ================= LOGO ================= */}

        <Link
          to="/"
          className="navbar-brand campus-brand d-flex align-items-center gap-2"
        >

          <span className="campus-logo">
            <span className="logo-check">✓</span>
          </span>

          <span className="fw-bold fs-4 text-white">
            Campus<span className="text-primary">Care</span>
          </span>

        </Link>


        {/* ================= MOBILE MENU ================= */}

        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#campusNavbar"
          aria-controls="campusNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >

          <span className="navbar-toggler-icon"></span>

        </button>


        {/* ================= NAVIGATION ================= */}

        <div
          className="collapse navbar-collapse"
          id="campusNavbar"
        >

          <div className="navbar-nav ms-auto align-items-lg-center gap-lg-1">


            {/* =================================================
                PUBLIC NAVIGATION
            ================================================= */}

            {!user && (
              <>

                <Link
                  to="/"
                  className="nav-link campus-nav-link"
                >
                  Home
                </Link>


                <a
                  href="/#how-it-works"
                  className="nav-link campus-nav-link"
                >
                  How It Works
                </a>


                <Link
                  to="/login"
                  className="nav-link campus-nav-link"
                >
                  Login
                </Link>


                <Link
                  to="/register"
                  className="btn btn-primary rounded-pill px-4 ms-lg-2 campus-nav-btn"
                >
                  Get Started
                </Link>


                <Link
                  to="/admin-login"
                  className="btn btn-outline-light rounded-pill px-4 ms-lg-2 campus-nav-btn"
                >
                  Admin
                </Link>

              </>
            )}


            {/* =================================================
                STUDENT NAVIGATION
            ================================================= */}

            {user && user.role !== "admin" && (
              <>

                <Link
                  to="/student-dashboard"
                  className="nav-link campus-nav-link"
                >
                  Dashboard
                </Link>


                <Link
                  to="/my-complaints"
                  className="nav-link campus-nav-link"
                >
                  My Complaints
                </Link>


                <Link
                  to="/create-complaint"
                  className="btn btn-primary rounded-pill px-4 ms-lg-2 campus-nav-btn"
                >
                  New Complaint
                </Link>


                <button
                  type="button"
                  onClick={logout}
                  className="btn btn-outline-light rounded-pill px-4 ms-lg-2 campus-nav-btn"
                >
                  Logout
                </button>

              </>
            )}


            {/* =================================================
                ADMIN NAVIGATION
            ================================================= */}

            {user && user.role === "admin" && (
              <>

                <Link
                  to="/admin-dashboard"
                  className="nav-link campus-nav-link"
                >
                  Dashboard
                </Link>


                <Link
                  to="/manage-complaints"
                  className="nav-link campus-nav-link"
                >
                  Manage Complaints
                </Link>


                <button
                  type="button"
                  onClick={logout}
                  className="btn btn-outline-light rounded-pill px-4 ms-lg-2 campus-nav-btn"
                >
                  Logout
                </button>

              </>
            )}

          </div>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;