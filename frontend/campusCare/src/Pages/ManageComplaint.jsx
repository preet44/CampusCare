import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../Services/Api";
import StatusBadge from "../Components/StatusBadge";

function ManageComplaint() {
  const [complaints, setComplaints] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    fetchComplaints();
  }, []);

  async function fetchComplaints() {
    try {
      const response = await API.get("/admin/complaints");

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

  async function updateStatus(id, status) {
    setUpdatingId(id);
    setMessage("");

    try {
      const response = await API.patch(
        `/admin/complaints/${id}/status`,
        { status }
      );

      setComplaints((currentComplaints) =>
        currentComplaints.map((complaint) =>
          complaint._id === id
            ? {
                ...complaint,
                status:
                  response.data.complaint?.status || status,
              }
            : complaint
        )
      );
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Failed to update complaint status."
      );
    } finally {
      setUpdatingId(null);
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
          Loading complaints...
        </p>
      </div>
    );
  }

  return (
    <div className="container py-4">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">
            Manage Complaints
          </h2>

          <p className="text-muted mb-0">
            Review and update student complaints.
          </p>
        </div>

        <Link
          to="/admin-dashboard"
          className="btn btn-outline-secondary"
        >
          Back to Dashboard
        </Link>
      </div>

      {message && (
        <div className="alert alert-danger">
          {message}
        </div>
      )}

      {complaints.length === 0 ? (
        <div className="alert alert-info">
          No complaints found.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">

            <thead className="table-dark">
              <tr>
                <th>Title</th>
                <th>Student</th>
                <th>Category</th>
                <th>Status</th>
                <th>Update Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {complaints.map((complaint) => (
                <tr key={complaint._id}>

                  <td>
                    <strong>{complaint.title}</strong>
                  </td>

                  <td>
                    {complaint.student?.name || "-"}
                    <br />
                    <small className="text-muted">
                      {complaint.student?.email || ""}
                    </small>
                  </td>

                  <td>
                    {complaint.category}
                  </td>

                  <td>
                    <StatusBadge
                      status={complaint.status}
                    />
                  </td>

                  <td>
                    <select
                      className="form-select form-select-sm"
                      value={complaint.status}
                      onChange={(e) =>
                        updateStatus(
                          complaint._id,
                          e.target.value
                        )
                      }
                      disabled={
                        updatingId === complaint._id
                      }
                    >
                      <option value="Pending">
                        Pending
                      </option>

                      <option value="In Progress">
                        In Progress
                      </option>

                      <option value="Resolved">
                        Resolved
                      </option>

                      <option value="Rejected">
                        Rejected
                      </option>
                    </select>
                  </td>

                  <td>
                    <Link
                      to={`/complaint/${complaint._id}`}
                      className="btn btn-outline-primary btn-sm"
                    >
                      View
                    </Link>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}

    </div>
  );
}

export default ManageComplaint;