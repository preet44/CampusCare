import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../Services/Api";
import StatusBadge from "../Components/StatusBadge";
import Message from "../Components/Message";

function StudentDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComplaints();
  }, []);

  async function fetchComplaints() {
    try {
      const response = await API.get("/complaint/my-complaints");
      setComplaints(response.data.complaints || []);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Failed to load complaints."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container py-4">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">Student Dashboard</h2>
          <p className="text-muted mb-0">
            View and manage your complaints
          </p>
        </div>

        <Link
          to="/create-complaint"
          className="btn btn-primary"
        >
          Create Complaint
        </Link>
      </div>

      <Message message={message} />

      {loading ? (
        <div className="text-center py-5">
          <div
            className="spinner-border text-primary"
            role="status"
          >
            <span className="visually-hidden">
              Loading...
            </span>
          </div>

          <p className="mt-2 text-muted">
            Loading complaints...
          </p>
        </div>
      ) : complaints.length === 0 ? (
        <div className="alert alert-info">
          You have not submitted any complaints yet.
        </div>
      ) : (
        <div className="row g-4">
          {complaints.map((complaint) => (
            <div
              className="col-md-6 col-lg-4"
              key={complaint._id}
            >
              <div className="card h-100 shadow-sm">

                <div className="card-body">

                  <h5 className="card-title">
                    {complaint.title}
                  </h5>

                  <p className="card-text text-muted">
                    {complaint.description}
                  </p>

                  <p className="mb-2">
                    <strong>Category:</strong>{" "}
                    {complaint.category}
                  </p>

                  <p className="mb-3">
                    <strong>Status:</strong>{" "}
                    <StatusBadge status={complaint.status} />
                  </p>

                  <Link
                    to={`/complaint/${complaint._id}`}
                    className="btn btn-outline-primary btn-sm"
                  >
                    View Details
                  </Link>

                </div>

              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default StudentDashboard;