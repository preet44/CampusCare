import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../Services/Api";
import StatusBadge from "../Components/StatusBadge";
import { motion } from "framer-motion";

function MyComplaint() {
  const [complaints, setComplaints] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // Stores the complaint ID that is waiting for delete confirmation
  const [deleteId, setDeleteId] = useState(null);

  // Message shown after delete
  const [deleteMessage, setDeleteMessage] = useState("");

  useEffect(() => {
    fetchComplaints();
  }, []);

  // Fetch student's complaints
  async function fetchComplaints() {
    try {
      const response = await API.get("/complaint/my_complaints");

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

  // Delete complaint
  async function handleDelete() {
    if (!deleteId) return;

    try {
      await API.delete(`/complaint/${deleteId}`);

      // Remove deleted complaint from the table immediately
      setComplaints((prevComplaints) =>
        prevComplaints.filter(
          (complaint) => complaint._id !== deleteId
        )
      );

      // Close modal
      setDeleteId(null);

      // Show success message
      setDeleteMessage("Complaint deleted successfully.");

      // Remove success message after 3 seconds
      setTimeout(() => {
        setDeleteMessage("");
      }, 3000);
    } catch (error) {
      // Close modal
      setDeleteId(null);

      // Show error message
      setDeleteMessage(
        error.response?.data?.message ||
          "Failed to delete complaint."
      );

      // Remove error message after 3 seconds
      setTimeout(() => {
        setDeleteMessage("");
      }, 3000);
    }
  }

  return (
    <div className="container my-complaints-page">

      {/* Page Header */}
      <motion.div
        className="my-complaints-header"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div>
          <h2>My Complaints</h2>
          <p>View all complaints you have submitted.</p>
        </div>

        <Link
          to="/create-complaint"
          className="btn btn-primary my-complaints-create-btn"
        >
          Create Complaint
        </Link>
      </motion.div>

      {/* General Error Message */}
      {message && (
        <motion.div
          className="alert alert-danger"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {message}
        </motion.div>
      )}

      {/* Delete Success / Error Message */}
      {deleteMessage && (
        <motion.div
          className="alert alert-success mt-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {deleteMessage}
        </motion.div>
      )}

      {/* Loading */}
      {loading ? (
        <motion.div
          className="text-center py-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div
            className="spinner-border text-primary"
            role="status"
          >
            <span className="visually-hidden">
              Loading...
            </span>
          </div>

          <p className="text-muted mt-2">
            Loading complaints...
          </p>
        </motion.div>
      ) : complaints.length === 0 ? (

        /* No Complaints */
        <motion.div
          className="alert alert-info"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          You have not submitted any complaints yet.
        </motion.div>

      ) : (

        /* Complaints Table */
        <motion.div
          className="my-complaints-table-card"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="table-responsive">

            <table className="table my-complaints-table mb-0">

              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {complaints.map((complaint, index) => (

                  <motion.tr
                    key={complaint._id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.05,
                    }}
                  >

                    {/* Title */}
                    <td>
                      <strong>
                        {complaint.title}
                      </strong>
                    </td>

                    {/* Category */}
                    <td>
                      {complaint.category}
                    </td>

                    {/* Status */}
                    <td>
                      <StatusBadge
                        status={complaint.status}
                      />
                    </td>

                    {/* Created Date */}
                    <td>
                      {complaint.createdAt
                        ? new Date(
                            complaint.createdAt
                          ).toLocaleDateString()
                        : "-"}
                    </td>

                    {/* Actions */}
                    <td>

                      {/* View Button */}
                      <Link
                        to={`/complaint/${complaint._id}`}
                        className="btn btn-outline-primary btn-sm complaint-view-btn me-2"
                      >
                        View
                      </Link>

                      {/* Delete Button */}
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                        onClick={() =>
                          setDeleteId(complaint._id)
                        }
                      >
                        Delete
                      </button>

                    </td>

                  </motion.tr>

                ))}

              </tbody>

            </table>

          </div>
        </motion.div>
      )}

      {/* ============================= */}
      {/* CUSTOM DELETE CONFIRMATION MODAL */}
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
                  onClick={() => setDeleteId(null)}
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
                  onClick={() => setDeleteId(null)}
                >
                  Cancel
                </button>

                {/* Confirm Delete */}
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDelete}
                >
                  Delete
                </button>

              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default MyComplaint;