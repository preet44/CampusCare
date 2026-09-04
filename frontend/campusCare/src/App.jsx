import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthProvider from "./Context/AuthContext";

import Navbar from "./Components/Navbar";

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

          {/* Home */}
          <Route
            path="/"
            element={
              <>
                <Navbar />

                <div className="container py-5 text-center">
                  <h1 className="display-4 fw-bold">
                    Welcome to CampusCare
                  </h1>

                  <p className="lead text-muted">
                    Student Complaint Management System
                  </p>

                  <div className="mt-4">
                    <a
                      href="/login"
                      className="btn btn-primary me-2"
                    >
                      Student Login
                    </a>

                    <a
                      href="/admin-login"
                      className="btn btn-outline-dark"
                    >
                      Admin Login
                    </a>
                  </div>
                </div>
              </>
            }
          />

          {/* Authentication */}
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

          {/* Student Routes */}
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

          {/* Admin Routes */}
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