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
/*AdminProtectedRoute()
Protects admin-only pages from unauthorized users.
useContext(AuthContext)
Gets user and loading from AuthContext.
user → current logged-in user.
loading → whether authentication is still being checked.
if (loading)
Shows "Checking authentication..." while checking login status.
if (!user)
If no user is logged in → redirects to /admin-login.
if (user.role !== "admin")
If the logged-in user is not an admin → redirects to /student-dashboard.
return children
If the user is logged in and has admin role, the requested admin page is displayed.*/