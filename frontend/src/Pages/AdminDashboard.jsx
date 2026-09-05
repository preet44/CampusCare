import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../Services/Api";

function AdminDashboard() {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const getStats = async () => {
      try {
        const response = await API.get("/admin/dashboard");

        setStats(response.data.stats);
      } catch (error) {
        console.log(error.response?.data);
      }
    };

    getStats();
  }, []);

  const handleLogout = async () => {
    try {
      await API.post("/admin/logout");

      navigate("/admin-login");
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  return (
    <div className="dashboard-page">

      {/* HEADER */}
      <div className="dashboard-header mb-4">

        <small className="dashboard-label">
          ADMIN DASHBOARD
        </small>

        <h1 className="display-5 fw-bold mt-2 mb-2">
          Admin Dashboard
        </h1>

        <p className="lead text-secondary mb-4">
          Manage and monitor student complaints.
        </p>

        <div className="d-flex flex-wrap gap-2">

          <Link
            to="/manage-complaints"
            className="btn btn-primary btn-lg dashboard-action-btn"
          >
            Manage Complaints
          </Link>

          <button
            type="button"
            className="btn btn-outline-secondary btn-lg"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </div>


      {/* STATISTICS */}
      <div className="row g-4">

        {/* TOTAL */}
        <div className="col-12 col-sm-6 col-xl-3">

          <div className="card dashboard-stat-card h-100 border-0 shadow-sm">

            <div className="card-body">

              <div className="dashboard-stat-icon">
                ≡
              </div>

              <p className="text-secondary mb-1">
                Total Complaints
              </p>

              <h2 className="fw-bold mb-0">
                {stats.total}
              </h2>

            </div>

          </div>

        </div>


        {/* PENDING */}
        <div className="col-12 col-sm-6 col-xl-3">

          <div className="card dashboard-stat-card h-100 border-0 shadow-sm">

            <div className="card-body">

              <div className="dashboard-stat-icon">
                !
              </div>

              <p className="text-secondary mb-1">
                Pending
              </p>

              <h2 className="fw-bold mb-0">
                {stats.pending}
              </h2>

            </div>

          </div>

        </div>


        {/* IN PROGRESS */}
        <div className="col-12 col-sm-6 col-xl-3">

          <div className="card dashboard-stat-card h-100 border-0 shadow-sm">

            <div className="card-body">

              <div className="dashboard-stat-icon">
                ↻
              </div>

              <p className="text-secondary mb-1">
                In Progress
              </p>

              <h2 className="fw-bold mb-0">
                {stats.inProgress}
              </h2>

            </div>

          </div>

        </div>


        {/* RESOLVED */}
        <div className="col-12 col-sm-6 col-xl-3">

          <div className="card dashboard-stat-card h-100 border-0 shadow-sm">

            <div className="card-body">

              <div className="dashboard-stat-icon">
                ✓
              </div>

              <p className="text-secondary mb-1">
                Resolved
              </p>

              <h2 className="fw-bold mb-0">
                {stats.resolved}
              </h2>

            </div>

          </div>

        </div>

      </div>


      {/* QUICK ACTION */}
      <div className="card border-0 shadow-sm dashboard-admin-info mt-5">

        <div className="card-body p-4">

          <div className="row align-items-center">

            <div className="col-lg-8">

              <h4 className="fw-bold mb-2">
                Manage Student Complaints
              </h4>

              <p className="text-secondary mb-lg-0">
                Review complaints submitted by students
                and update their status.
              </p>

            </div>

            <div className="col-lg-4 text-lg-end mt-3 mt-lg-0">

              <Link
                to="/manage-complaints"
                className="btn btn-primary"
              >
                View Complaints →
              </Link>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;