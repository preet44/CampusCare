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

  // Delete states
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState("");

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

  // Delete complaint
  async function handleDelete() {
    if (!deleteId) return;

    try {
      setDeleting(true);

      await API.delete(`/complaint/${deleteId}`);

      setDeleteId(null);

      setDeleteMessage(
        "Complaint deleted successfully."
      );

      // Go back to My Complaints after a short delay
      setTimeout(() => {
        navigate("/my-complaints");
      }, 1000);

    } catch (error) {
      setDeleteId(null);

      setDeleteMessage(
        error.response?.data?.message ||
          "Failed to delete complaint."
      );

      setDeleting(false);

      setTimeout(() => {
        setDeleteMessage("");
      }, 3000);
    }
  }

  // Loading
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

  // Complaint not found
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

            {/* Header */}

            <div className="card-header bg-primary text-white">

              <h4 className="mb-0">
                Complaint Details
              </h4>

            </div>

            {/* Body */}

            <div className="card-body p-4">

              {/* Error Message */}

              {message && (
                <div className="alert alert-danger">
                  {message}
                </div>
              )}

              {/* Delete Success Message */}

              {deleteMessage && (
                <div className="alert alert-success">
                  {deleteMessage}
                </div>
              )}

              {/* Title */}

              <h3 className="mb-3">
                {complaint.title}
              </h3>

              {/* Category */}

              <div className="mb-3">

                <strong>Category:</strong>{" "}

                {complaint.category}

              </div>

              {/* Status */}

              <div className="mb-3">

                <strong>Status:</strong>{" "}

                <StatusBadge
                  status={complaint.status}
                />

              </div>

              {/* Description */}

              <div className="mb-4">

                <strong>Description:</strong>

                <div className="border rounded p-3 mt-2 bg-light">

                  {complaint.description}

                </div>

              </div>

              {/* Attached Image */}

              {complaint.image?.url && (
                <div className="mb-4">

                  <strong>
                    Attached Image:
                  </strong>

                  <div className="mt-2 border rounded p-2 bg-light">

                    <img
                      src={complaint.image.url}
                      alt="Complaint"
                      className="img-fluid rounded"
                      style={{
                        maxHeight: "400px",
                        width: "100%",
                        objectFit: "contain",
                      }}
                    />

                  </div>

                </div>
              )}

              {/* Submitted Date */}

              <div className="mb-4">

                <strong>
                  Submitted:
                </strong>{" "}

                {complaint.createdAt
                  ? new Date(
                      complaint.createdAt
                    ).toLocaleString()
                  : "-"}

              </div>

              {/* Buttons */}

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
                  onClick={() =>
                    setDeleteId(complaint._id)
                  }
                  disabled={deleting}
                >
                  Delete Complaint
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ============================= */}
      {/* DELETE CONFIRMATION MODAL */}
      {/* ============================= */}

      {deleteId && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          aria-modal="true"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >

          <div className="modal-dialog modal-dialog-centered">

            <div className="modal-content">

              {/* Modal Header */}

              <div className="modal-header">

                <h5 className="modal-title">
                  Delete Complaint
                </h5>

                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() =>
                    setDeleteId(null)
                  }
                  disabled={deleting}
                ></button>

              </div>

              {/* Modal Body */}

              <div className="modal-body">

                <p className="mb-2">
                  Are you sure you want to delete this
                  complaint?
                </p>

                <small className="text-muted">
                  This action cannot be undone.
                </small>

              </div>

              {/* Modal Footer */}

              <div className="modal-footer">

                {/* Cancel */}

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() =>
                    setDeleteId(null)
                  }
                  disabled={deleting}
                >
                  Cancel
                </button>

                {/* Confirm Delete */}

                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDelete}
                  disabled={deleting}
                >
                  {deleting
                    ? "Deleting..."
                    : "Delete"}
                </button>

              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default ComplaintDetails;