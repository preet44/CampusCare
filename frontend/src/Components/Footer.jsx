import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

function Footer() {
  const { user } = useContext(AuthContext);

  return (
    <footer className="bg-dark text-white">

      <div className="container py-5">

        <div className="row g-4">

          {/* ================= BRAND ================= */}

          <div className="col-lg-5 col-md-6">

            <Link
              to="/"
              className="text-decoration-none d-inline-flex align-items-center gap-2 mb-3"
            >

              <span className="campus-logo">
                <span className="logo-check">✓</span>
              </span>

              <span className="fw-bold fs-4 text-white">
                Campus<span className="text-primary">Care</span>
              </span>

            </Link>

            <p className="text-secondary mb-0 footer-description">
              A simple and organized platform for students
              to report campus issues, track complaints,
              and stay updated on their resolution.
            </p>

          </div>


          {/* ================= QUICK LINKS ================= */}

          <div className="col-6 col-md-3 col-lg-2">

            <h6 className="fw-bold mb-3">
              Quick Links
            </h6>

            <ul className="list-unstyled mb-0">

              <li className="mb-2">
                <Link
                  to="/"
                  className="footer-link"
                >
                  Home
                </Link>
              </li>

              <li className="mb-2">
                <a
                  href="/#how-it-works"
                  className="footer-link"
                >
                  How It Works
                </a>
              </li>

              <li className="mb-2">
                <Link
                  to="/login"
                  className="footer-link"
                >
                  Student Login
                </Link>
              </li>

              <li>
                <Link
                  to="/register"
                  className="footer-link"
                >
                  Register
                </Link>
              </li>

            </ul>

          </div>


          {/* ================= STUDENT ================= */}

          <div className="col-6 col-md-3 col-lg-2">

            <h6 className="fw-bold mb-3">
              Student
            </h6>

            <ul className="list-unstyled mb-0">

              <li className="mb-2">
                <Link
                  to="/student-dashboard"
                  className="footer-link"
                >
                  Dashboard
                </Link>
              </li>

              <li className="mb-2">
                <Link
                  to="/create-complaint"
                  className="footer-link"
                >
                  Create Complaint
                </Link>
              </li>

              <li>
                <Link
                  to="/my-complaints"
                  className="footer-link"
                >
                  My Complaints
                </Link>
              </li>

            </ul>

          </div>


          {/* ================= ADMIN ================= */}

          <div className="col-6 col-md-3 col-lg-3">

            <h6 className="fw-bold mb-3">
              Administration
            </h6>

            <ul className="list-unstyled mb-0">

              <li className="mb-2">
                <Link
                  to="/admin-login"
                  className="footer-link"
                >
                  Admin Login
                </Link>
              </li>

              {user?.role === "admin" && (
                <li>
                  <Link
                    to="/admin-dashboard"
                    className="footer-link"
                  >
                    Admin Dashboard
                  </Link>
                </li>
              )}

            </ul>

          </div>

        </div>


        {/* ================= DIVIDER ================= */}

        <hr className="border-secondary my-4" />


        {/* ================= BOTTOM ================= */}

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">

          <small className="text-secondary text-center text-md-start">
            © 2026 CampusCare. Student Complaint Management System.
          </small>

          <small className="text-secondary">
            Built for a better campus experience.
          </small>

        </div>

      </div>

    </footer>
  );
}

export default Footer;