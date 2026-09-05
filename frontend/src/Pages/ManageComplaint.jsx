import { useEffect, useState } from "react";
import API from "../Services/Api";
import StatusBadge from "../Components/StatusBadge";
import Message from "../Components/Message";

function ManageComplaint() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const getComplaints = async () => {
    try {
      setLoading(true);
      setMessage("");

      const response = await API.get("/admin/complaints");

      setComplaints(response.data.complaints || []);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Unable to load complaints."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getComplaints();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await API.put(
        `/admin/complaints/${id}/status`,
        { status }
      );

      setComplaints((prevComplaints) =>
        prevComplaints.map((complaint) =>
          complaint._id === id
            ? { ...complaint, status }
            : complaint
        )
      );

      setMessage("Complaint status updated successfully.");
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Unable to update complaint status."
      );
    }
  };

  return (
    <div className="manage-complaint-page">

      {/* Page Header */}
      <div className="manage-complaint-header">
        <div>
          <h1>Manage Complaints</h1>

          <p>
            Review and manage complaints submitted
            by students.
          </p>
        </div>

        <button
          className="btn btn-outline-primary"
          onClick={getComplaints}
        >
          Refresh
        </button>
      </div>

      <Message message={message} />

      {/* Loading */}
      {loading && (
        <div className="text-center py-5">
          <div
            className="spinner-border text-primary"
            role="status"
          >
            <span className="visually-hidden">
              Loading...
            </span>
          </div>

          <p className="mt-3 text-muted">
            Loading complaints...
          </p>
        </div>
      )}

      {/* No complaints */}
      {!loading && complaints.length === 0 && (
        <div className="empty-complaints">
          <div className="empty-icon">✓</div>

          <h4>No complaints found</h4>

          <p>
            There are currently no complaints
            submitted by students.
          </p>
        </div>
      )}

      {/* Complaints */}
      {!loading && complaints.length > 0 && (
        <div className="complaints-table-wrapper">

          <div className="table-responsive">

            <table className="table complaints-table align-middle">

              <thead>
                <tr>
                  <th>Complaint</th>
                  <th>Student</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>

                {complaints.map((complaint) => (
                  <tr key={complaint._id}>

                    {/* Complaint */}
                    <td>
                      <div className="complaint-title">
                        {complaint.title}
                      </div>

                      <div className="complaint-description">
                        {complaint.description}
                      </div>
                    </td>

                    {/* Student */}
                    <td>
                      <div className="student-name">
                        {complaint.student?.name ||
                          "Unknown Student"}
                      </div>

                      <small className="text-muted">
                        {complaint.student?.email ||
                          ""}
                      </small>
                    </td>

                    {/* Category */}
                    <td>
                      <span className="category-badge">
                        {complaint.category}
                      </span>
                    </td>

                    {/* Date */}
                    <td>
                      <span className="text-muted">
                        {complaint.createdAt
                          ? new Date(
                              complaint.createdAt
                            ).toLocaleDateString()
                          : "—"}
                      </span>
                    </td>

                    {/* Status */}
                    <td>
                      <div className="status-action">

                        <StatusBadge
                          status={complaint.status}
                        />

                        <select
                          className="form-select form-select-sm"
                          value={
                            complaint.status || "Pending"
                          }
                          onChange={(e) =>
                            handleStatusChange(
                              complaint._id,
                              e.target.value
                            )
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
                        </select>

                      </div>
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </div>
      )}

    </div>
  );
}

export default ManageComplaint;