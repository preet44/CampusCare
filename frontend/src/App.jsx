import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthProvider from "./Context/AuthContext";

import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

import StudentLayout from "./Layouts/StudentLayout";
import AdminLayout from "./Layouts/AdminLayout";

import ProtectedRoute from "./Routes/ProtectedRoute";
import AdminProtectedRoute from "./Routes/AdminProtectedRoute";

import Login from "./Pages/Login";
import Register from "./Pages/Register";
import AdminLogin from "./Pages/AdminLogin";

import StudentDashboard from "./Pages/StudentDashboard";
import CreateComplaint from "./Pages/CreateComplaint";
import MyComplaint from "./Pages/MyComplaint";
import ComplaintDetails from "./Pages/ComplaintDetails";

import AdminDashboard from "./Pages/AdminDashboard";
import ManageComplaint from "./Pages/ManageComplaint";


function App() {
  return (
    <BrowserRouter>

      <AuthProvider>

        <Routes>

          {/* ==================================================
              HOME PAGE
          ================================================== */}

          <Route
            path="/"
            element={
              <>

                <Navbar />

                {/* ================= HERO SECTION ================= */}

                <section className="home-hero">

                  <div className="container">

                    <div className="row align-items-center home-hero-row">

                      {/* LEFT CONTENT */}

                      <div className="col-lg-8">

                        <div className="text-center text-lg-start">

                          <span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-2 mb-4 home-badge">
                            STUDENT COMPLAINT MANAGEMENT SYSTEM
                          </span>


                          <h1 className="display-3 fw-bold lh-sm mb-4 home-title">

                            Your Voice.
                            <br />

                            <span className="text-primary">
                              Your Campus.
                            </span>

                          </h1>


                          <p className="lead text-secondary home-description mb-4">

                            Report campus issues, track your complaints,
                            and stay updated until they are resolved —
                            all through one simple and organized platform.

                          </p>


                          {/* BUTTONS */}

                          <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start">

                            <a
                              href="/login"
                              className="btn btn-primary btn-lg px-4 shadow-sm home-btn"
                            >
                              Submit a Complaint
                            </a>


                            <a
                              href="/admin-login"
                              className="btn btn-outline-dark btn-lg px-4 home-btn"
                            >
                              Admin Portal
                            </a>

                          </div>


                          {/* FEATURES */}

                          <div className="row g-3 mt-5">

                            <div className="col-sm-4">

                              <div className="home-feature">

                                <div className="home-feature-icon">
                                  ✓
                                </div>

                                <div>
                                  <h6 className="fw-bold mb-1">
                                    Easy to Use
                                  </h6>

                                  <small className="text-muted">
                                    Submit complaints easily
                                  </small>
                                </div>

                              </div>

                            </div>


                            <div className="col-sm-4">

                              <div className="home-feature">

                                <div className="home-feature-icon">
                                  ✓
                                </div>

                                <div>
                                  <h6 className="fw-bold mb-1">
                                    Track Status
                                  </h6>

                                  <small className="text-muted">
                                    Follow your complaint
                                  </small>
                                </div>

                              </div>

                            </div>


                            <div className="col-sm-4">

                              <div className="home-feature">

                                <div className="home-feature-icon">
                                  ✓
                                </div>

                                <div>
                                  <h6 className="fw-bold mb-1">
                                    Stay Updated
                                  </h6>

                                  <small className="text-muted">
                                    Know the latest status
                                  </small>
                                </div>

                              </div>

                            </div>

                          </div>

                        </div>

                      </div>


                      {/* RIGHT VISUAL */}

                      <div className="col-lg-4 d-none d-lg-block">

                        <div className="home-visual">

                          <div className="home-visual-circle"></div>

                          <div className="home-visual-content">

                            <div className="home-logo-large">
                              C
                            </div>

                            <h3 className="fw-bold mt-3">
                              CampusCare
                            </h3>

                            <p className="text-muted mb-0">
                              Making campus communication
                              simple and organized.
                            </p>

                          </div>

                        </div>

                      </div>

                    </div>

                  </div>

                </section>


                {/* ================= HOW IT WORKS ================= */}

                <section
                  id="how-it-works"
                  className="py-5 bg-white"
                >

                  <div className="container">

                    {/* Heading */}

                    <div className="text-center mb-5">

                      <span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-2">
                        HOW IT WORKS
                      </span>

                      <h2 className="fw-bold mt-3 mb-2">
                        Simple. Transparent. Organized.
                      </h2>

                      <p className="text-muted mb-0">
                        CampusCare makes reporting campus issues
                        simple for every student.
                      </p>

                    </div>


                    {/* Steps */}

                    <div className="row g-4">

                      {/* STEP 1 */}

                      <div className="col-md-4">

                        <div className="card border-0 shadow-sm h-100 home-step-card">

                          <div className="card-body p-4 text-center">

                            <div className="home-step-number mx-auto mb-4">
                              01
                            </div>

                            <h5 className="fw-bold mb-3">
                              Submit Complaint
                            </h5>

                            <p className="text-muted mb-0">
                              Describe your campus issue,
                              choose a category, and submit
                              your complaint.
                            </p>

                          </div>

                        </div>

                      </div>


                      {/* STEP 2 */}

                      <div className="col-md-4">

                        <div className="card border-0 shadow-sm h-100 home-step-card">

                          <div className="card-body p-4 text-center">

                            <div className="home-step-number mx-auto mb-4">
                              02
                            </div>

                            <h5 className="fw-bold mb-3">
                              Track Progress
                            </h5>

                            <p className="text-muted mb-0">
                              Check whether your complaint
                              is pending, in progress,
                              or resolved.
                            </p>

                          </div>

                        </div>

                      </div>


                      {/* STEP 3 */}

                      <div className="col-md-4">

                        <div className="card border-0 shadow-sm h-100 home-step-card">

                          <div className="card-body p-4 text-center">

                            <div className="home-step-number mx-auto mb-4">
                              03
                            </div>

                            <h5 className="fw-bold mb-3">
                              Get Resolution
                            </h5>

                            <p className="text-muted mb-0">
                              Stay informed while the
                              administration works toward
                              resolving the issue.
                            </p>

                          </div>

                        </div>

                      </div>

                    </div>

                  </div>

                </section>


                {/* ================= WHY CAMPUSCARE ================= */}

                <section className="py-5 bg-light">

                  <div className="container">

                    <div className="row align-items-center g-5">

                      <div className="col-lg-6">

                        <span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-2 mb-3">
                          WHY CAMPUSCARE?
                        </span>

                        <h2 className="fw-bold mb-3">
                          A better way to communicate campus issues.
                        </h2>

                        <p className="text-muted mb-4">
                          CampusCare provides students with a
                          simple platform to report problems and
                          keep track of their complaints without
                          unnecessary communication.
                        </p>

                        <div className="d-flex flex-column gap-3">

                          <div className="d-flex align-items-start gap-3">

                            <div className="text-primary fs-4">
                              ✓
                            </div>

                            <div>
                              <h6 className="fw-bold mb-1">
                                Centralized Complaints
                              </h6>

                              <p className="text-muted mb-0">
                                Keep all complaints organized
                                in one place.
                              </p>
                            </div>

                          </div>


                          <div className="d-flex align-items-start gap-3">

                            <div className="text-primary fs-4">
                              ✓
                            </div>

                            <div>
                              <h6 className="fw-bold mb-1">
                                Transparent Status
                              </h6>

                              <p className="text-muted mb-0">
                                Students can easily understand
                                the current complaint status.
                              </p>
                            </div>

                          </div>


                          <div className="d-flex align-items-start gap-3">

                            <div className="text-primary fs-4">
                              ✓
                            </div>

                            <div>
                              <h6 className="fw-bold mb-1">
                                Simple Experience
                              </h6>

                              <p className="text-muted mb-0">
                                No complicated process or
                                unnecessary distractions.
                              </p>
                            </div>

                          </div>

                        </div>

                      </div>


                      {/* Visual */}

                      <div className="col-lg-6">

                        <div className="card border-0 shadow-sm rounded-4 home-info-card">

                          <div className="card-body p-4 p-md-5">

                            <div className="d-flex align-items-center gap-3 mb-4">

                              <div className="home-logo-small">
                                C
                              </div>

                              <div>

                                <h5 className="fw-bold mb-1">
                                  CampusCare
                                </h5>

                                <small className="text-muted">
                                  Student Support Platform
                                </small>

                              </div>

                            </div>


                            <div className="bg-light rounded-3 p-3 mb-3">

                              <small className="text-muted">
                                YOUR COMPLAINT
                              </small>

                              <div className="d-flex justify-content-between align-items-center mt-2">

                                <span className="fw-semibold">
                                  Campus Issue
                                </span>

                                <span className="badge bg-warning text-dark rounded-pill">
                                  Pending
                                </span>

                              </div>

                            </div>


                            <div className="row g-3">

                              <div className="col-4">

                                <div className="text-center">
                                  <h4 className="fw-bold text-primary mb-1">
                                    01
                                  </h4>

                                  <small className="text-muted">
                                    Submit
                                  </small>
                                </div>

                              </div>


                              <div className="col-4">

                                <div className="text-center">
                                  <h4 className="fw-bold text-primary mb-1">
                                    02
                                  </h4>

                                  <small className="text-muted">
                                    Track
                                  </small>
                                </div>

                              </div>


                              <div className="col-4">

                                <div className="text-center">
                                  <h4 className="fw-bold text-primary mb-1">
                                    03
                                  </h4>

                                  <small className="text-muted">
                                    Resolve
                                  </small>
                                </div>

                              </div>

                            </div>

                          </div>

                        </div>

                      </div>

                    </div>

                  </div>

                </section>


                {/* ================= CTA ================= */}

                <section className="bg-primary text-white py-5 home-cta">

                  <div className="container text-center">

                    <h2 className="fw-bold mb-3">
                      Have an issue on campus?
                    </h2>

                    <p className="lead mb-4">
                      Report it and help make your campus better.
                    </p>

                    <a
                      href="/login"
                      className="btn btn-light btn-lg px-4 shadow-sm home-btn"
                    >
                      Get Started
                    </a>

                  </div>

                </section>


                {/* ================= FOOTER ================= */}

               <Footer/>

              </>
            }
          />


          {/* ==================================================
              AUTH ROUTES
          ================================================== */}

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/admin-login"
            element={<AdminLogin />}
          />


          {/* ==================================================
              STUDENT ROUTES
          ================================================== */}

          <Route element={<StudentLayout />}>

            <Route
              path="/student-dashboard"
              element={
                <ProtectedRoute>
                  <StudentDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/create-complaint"
              element={
                <ProtectedRoute>
                  <CreateComplaint />
                </ProtectedRoute>
              }
            />

            <Route
              path="/my-complaints"
              element={
                <ProtectedRoute>
                  <MyComplaint />
                </ProtectedRoute>
              }
            />

            <Route
              path="/complaint/:id"
              element={
                <ProtectedRoute>
                  <ComplaintDetails />
                </ProtectedRoute>
              }
            />

          </Route>


          {/* ==================================================
              ADMIN ROUTES
          ================================================== */}

          <Route element={<AdminLayout />}>

            <Route
              path="/admin-dashboard"
              element={
                <AdminProtectedRoute>
                  <AdminDashboard />
                </AdminProtectedRoute>
              }
            />

            <Route
              path="/manage-complaints"
              element={
                <AdminProtectedRoute>
                  <ManageComplaint />
                </AdminProtectedRoute>
              }
            />

          </Route>

        </Routes>

      </AuthProvider>

    </BrowserRouter>
  );
}

export default App;