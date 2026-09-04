import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../Services/Api";

function AdminDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  async function fetchDashboard() {
    try {
      const response = await API.get("/admin/dashboard");

      setDashboard(response.data);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Failed to load dashboard."
      );
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div
          className="spinner-border text-primary"
          role="status"
        >
          <span className="visually-hidden">
            Loading...
          </span>
        </div>

        <p className="text-muted mt-2">
          Loading dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="container py-4">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">Admin Dashboard</h2>
          <p className="text-muted mb-0">
            Overview of student complaints
          </p>
        </div>

        <Link
          to="/manage-complaints"
          className="btn btn-primary"
        >
          Manage Complaints
        </Link>
      </div>

      {message && (
        <div className="alert alert-danger">
          {message}
        </div>
      )}

      {dashboard && (
        <div className="row g-4">

          <div className="col-md-6 col-lg-3">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h6 className="text-muted">
                  Total Complaints
                </h6>

                <h2 className="mb-0">
                  {dashboard.totalComplaints ?? 0}
                </h2>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h6 className="text-muted">
                  Pending
                </h6>

                <h2 className="mb-0">
                  {dashboard.pendingComplaints ?? 0}
                </h2>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h6 className="text-muted">
                  In Progress
                </h6>

                <h2 className="mb-0">
                  {dashboard.inProgressComplaints ?? 0}
                </h2>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h6 className="text-muted">
                  Resolved
                </h6>

                <h2 className="mb-0">
                  {dashboard.resolvedComplaints ?? 0}
                </h2>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}

export default AdminDashboard;