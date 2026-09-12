import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = async () => {
        await logout();
        setMenuOpen(false);
        navigate("/login");
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <nav className="navbar navbar-expand-lg campus-navbar fixed-top">
            <div className="container-fluid px-3 px-lg-4">

                {/* Logo */}
                <Link
                    to="/"
                    className="navbar-brand campus-navbar-brand"
                    onClick={closeMenu}
                >
                    <span className="campus-navbar-logo">
                        ✓
                    </span>

                    <span className="campus-navbar-name">
                        Campus<span>Care</span>
                    </span>
                </Link>


                {/* Hamburger Button */}
                <button
                    className={`navbar-toggler campus-navbar-toggler ${
                        menuOpen ? "menu-open" : ""
                    }`}
                    type="button"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle navigation"
                    aria-expanded={menuOpen}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>


                {/* Navigation */}
                <div
                    className={`campus-navbar-menu ${
                        menuOpen ? "show" : ""
                    }`}
                >

                    <div className="campus-navbar-links">

                        {user ? (
                            <>
                                {user.role === "admin" ? (
                                    <>
                                        <Link
                                            to="/admin-dashboard"
                                            className="campus-nav-link"
                                            onClick={closeMenu}
                                        >
                                            Dashboard
                                        </Link>

                                        <Link
                                            to="/manage-complaints"
                                            className="campus-nav-link"
                                            onClick={closeMenu}
                                        >
                                            Manage Complaints
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            to="/student-dashboard"
                                            className="campus-nav-link"
                                            onClick={closeMenu}
                                        >
                                            Dashboard
                                        </Link>

                                        <Link
                                            to="/create-complaint"
                                            className="campus-nav-link"
                                            onClick={closeMenu}
                                        >
                                            Create Complaint
                                        </Link>

                                        <Link
                                            to="/my-complaints"
                                            className="campus-nav-link"
                                            onClick={closeMenu}
                                        >
                                            My Complaints
                                        </Link>
                                    </>
                                )}

                                <button
                                    type="button"
                                    className="campus-nav-logout"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="campus-nav-link"
                                    onClick={closeMenu}
                                >
                                    Login
                                </Link>

                                <Link
                                    to="/register"
                                    className="campus-nav-link"
                                    onClick={closeMenu}
                                >
                                    Register
                                </Link>

                                <Link
                                    to="/admin-login"
                                    className="campus-nav-admin"
                                    onClick={closeMenu}
                                >
                                    Admin
                                </Link>
                            </>
                        )}

                    </div>
                </div>

            </div>
        </nav>
    );
}

export default Navbar;