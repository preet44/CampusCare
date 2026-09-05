import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import API from "../Services/Api";
import StatusBadge from "../Components/StatusBadge";

function ComplaintDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [complaint, setComplaint] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchComplaint();
  }, [id]);

  async function fetchComplaint() {
    try {
      const response = await API.get(`/complaint/${id}`);

      setComplaint(response.data.complaint);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Failed to load complaint."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this complaint?"
    );

    if (!confirmed) return;

    setDeleting(true);
    setMessage("");

    try {
      await API.delete(`/complaint/${id}`);

      navigate("/my-complaints");
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Failed to delete complaint."
      );
    } finally {
      setDeleting(false);
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
          Loading complaint...
        </p>
      </div>
    );
  }

  if (!complaint) {
    return (
      <div className="container py-4">
        <div className="alert alert-danger">
          {message || "Complaint not found."}
        </div>

        <Link
          to="/my-complaints"
          className="btn btn-outline-primary"
        >
          Back to My Complaints
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-lg-8">

          <div className="card shadow-sm">

            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">
                Complaint Details
              </h4>
            </div>

            <div className="card-body p-4">

              {message && (
                <div className="alert alert-danger">
                  {message}
                </div>
              )}

              <h3 className="mb-3">
                {complaint.title}
              </h3>

              <div className="mb-3">
                <strong>Category:</strong>{" "}
                {complaint.category}
              </div>

              <div className="mb-3">
                <strong>Status:</strong>{" "}
                <StatusBadge
                  status={complaint.status}
                />
              </div>

              <div className="mb-3">
                <strong>Description:</strong>

                <div className="border rounded p-3 mt-2 bg-light">
                  {complaint.description}
                </div>
              </div>

              <div className="mb-4">
                <strong>Submitted:</strong>{" "}
                {complaint.createdAt
                  ? new Date(
                      complaint.createdAt
                    ).toLocaleString()
                  : "-"}
              </div>

              <div className="d-flex gap-2">

                <Link
                  to="/my-complaints"
                  className="btn btn-outline-secondary"
                >
                  Back
                </Link>

                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDelete}
                  disabled={deleting}
                >
                  {deleting
                    ? "Deleting..."
                    : "Delete Complaint"}
                </button>

              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ComplaintDetails;