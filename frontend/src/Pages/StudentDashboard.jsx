import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../Services/Api";
import StatusBadge from "../Components/StatusBadge";

function StudentDashboard() {
  const [complaints, setComplaints] = useState([]);

  const getComplaints = async () => {
    try {
      const response = await API.get("/complaint/my_complaints");

      setComplaints(response.data.complaints || []);
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  useEffect(() => {
    getComplaints();
  }, []);

  const total = complaints.length;

  const pending = complaints.filter(
    (complaint) => complaint.status === "Pending"
  ).length;

  const inProgress = complaints.filter(
    (complaint) => complaint.status === "In Progress"
  ).length;

  const resolved = complaints.filter(
    (complaint) => complaint.status === "Resolved"
  ).length;

  const recentComplaints = complaints.slice(0, 3);

  return (
    <div className="dashboard-page">

      {/* HEADER */}
      <div className="dashboard-header mb-4">

        <small className="dashboard-label">
          STUDENT DASHBOARD
        </small>

        <h1 className="display-5 fw-bold mt-2 mb-2">
          Welcome back! 👋
        </h1>

        <p className="lead text-secondary mb-3">
          Track your complaints and stay updated on their progress.
        </p>

        <Link
          to="/create-complaint"
          className="btn btn-primary btn-lg dashboard-action-btn"
        >
          + &nbsp; New Complaint
        </Link>

      </div>


      {/* STATISTICS */}
      <div className="row g-4 mb-5">

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
                {total}
              </h2>

            </div>

          </div>
        </div>


        {/* PENDING */}
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card dashboard-stat-card h-100 border-0 shadow-sm">

            <div className="card-body">

              <div className="dashboard-stat-icon">
                ◷
              </div>

              <p className="text-secondary mb-1">
                Pending
              </p>

              <h2 className="fw-bold mb-0">
                {pending}
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
                {inProgress}
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
                {resolved}
              </h2>

            </div>

          </div>
        </div>

      </div>


      {/* RECENT COMPLAINTS */}
      <div className="dashboard-section">

        <div className="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-4">

          <div>
            <h2 className="fw-bold mb-1">
              Recent Complaints
            </h2>

            <p className="text-secondary mb-0">
              Your latest submitted complaints
            </p>
          </div>

          <Link
            to="/my-complaints"
            className="dashboard-view-link"
          >
            View all →
          </Link>

        </div>


        {recentComplaints.length === 0 ? (

          <div className="card border-0 shadow-sm dashboard-empty-card">

            <div className="card-body text-center py-5">

              <div className="dashboard-empty-icon">
                +
              </div>

              <h4 className="fw-bold mt-3">
                No complaints yet
              </h4>

              <p className="text-secondary">
                You haven't submitted any complaints.
              </p>

              <Link
                to="/create-complaint"
                className="btn btn-primary"
              >
                Create Complaint
              </Link>

            </div>

          </div>

        ) : (

          <div className="row g-4">

            {recentComplaints.map((complaint) => (

              <div
                className="col-12 col-lg-4"
                key={complaint._id}
              >

                <div className="card border-0 shadow-sm dashboard-complaint-card h-100">

                  <div className="card-body">

                    <div className="d-flex justify-content-between align-items-start gap-2 mb-3">

                      <h5 className="fw-bold mb-0">
                        {complaint.title}
                      </h5>

                      <StatusBadge
                        status={complaint.status}
                      />

                    </div>

                    <p className="text-secondary complaint-description">
                      {complaint.description}
                    </p>

                    <div className="small text-secondary">

                      <div className="mb-1">
                        <strong>Category:</strong>{" "}
                        {complaint.category}
                      </div>

                      <div>
                        <strong>Date:</strong>{" "}
                        {new Date(
                          complaint.createdAt
                        ).toLocaleDateString()}
                      </div>

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default StudentDashboard;