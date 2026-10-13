import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <p>Checking authentication...</p>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;

/*ProtectedRoute()
Protects student/private pages from users who are not logged in.
useContext(AuthContext)
Gets user and loading from AuthContext.
user → currently logged-in user.
loading → authentication check status.
if (loading)
Shows "Checking authentication..." while checking the login status.
if (!user)
If no user is logged in → redirects to /login.
return children
If the user is logged in → allows access to the requested protected page.*/