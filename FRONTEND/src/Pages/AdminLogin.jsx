import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import API from "../Services/Api";
import { AuthContext } from "../Context/AuthContext";


function AdminLogin() {

  const navigate = useNavigate();

  const { setUser } = useContext(AuthContext);


  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });


  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);


  // ==================================================
  // HANDLE INPUT
  // ==================================================

  function handleChange(e) {

    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }


  // ==================================================
  // ADMIN LOGIN
  // ==================================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setMessage("");
    setLoading(true);

    try {

      const response = await API.post(
        "/admin/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );


      console.log(
        "Admin Login:",
        response.data
      );


      // Backend returns the admin
      // inside response.data.user

      setUser(response.data.user);


      // Go to admin dashboard

      navigate(
        "/admin-dashboard",
        {
          replace: true,
        }
      );

    } catch (error) {

      console.log(
        "Admin Login Error:",
        error.response?.data
      );

      setMessage(
        error.response?.data?.message ||
        "Admin login failed. Please try again."
      );

    } finally {

      setLoading(false);
    }
  };


  return (
    <div className="container py-5">

      <div className="row justify-content-center">

        <div className="col-md-6 col-lg-5">

          <div className="card shadow-sm">

            <div className="card-body p-4">

              <h2 className="text-center mb-2">
                Admin Login
              </h2>

              <p className="text-center text-muted mb-4">
                Login to manage student complaints
              </p>


              {message && (
                <div className="alert alert-danger">
                  {message}
                </div>
              )}


              <form onSubmit={handleSubmit}>

                {/* EMAIL */}

                <div className="mb-3">

                  <label className="form-label">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter admin email"
                    required
                  />

                </div>


                {/* PASSWORD */}

                <div className="mb-4">

                  <label className="form-label">
                    Password
                  </label>

                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter admin password"
                    required
                  />

                </div>


                {/* LOGIN BUTTON */}

                <button
                  type="submit"
                  className="btn btn-dark w-100"
                  disabled={loading}
                >

                  {loading
                    ? "Logging in..."
                    : "Admin Login"
                  }

                </button>

              </form>


              <div className="text-center mt-3">

                <Link to="/login">
                  Student Login
                </Link>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}


export default AdminLogin;