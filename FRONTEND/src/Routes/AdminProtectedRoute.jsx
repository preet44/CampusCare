import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

function AdminProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <p>Checking authentication...</p>;
  }

  if (!user) {
    return <Navigate to="/admin-login" />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/student-dashboard" />;
  }

  return children;
}

export default AdminProtectedRoute;