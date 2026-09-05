import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../Services/Api";
import StatusBadge from "../Components/StatusBadge";

function MyComplaint() {
  const [complaints, setComplaints] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComplaints();
  }, []);

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

  return (
    <div className="container py-4">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">My Complaints</h2>
          <p className="text-muted mb-0">
            View all complaints you have submitted.
          </p>
        </div>

        <Link
          to="/create-complaint"
          className="btn btn-primary"
        >
          Create Complaint
        </Link>
      </div>

      {message && (
        <div className="alert alert-danger">
          {message}
        </div>
      )}

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

          <p className="text-muted mt-2">
            Loading complaints...
          </p>
        </div>
      ) : complaints.length === 0 ? (
        <div className="alert alert-info">
          You have not submitted any complaints yet.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">

            <thead className="table-dark">
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>Created</th>
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
                    {complaint.category}
                  </td>

                  <td>
                    <StatusBadge
                      status={complaint.status}
                    />
                  </td>

                  <td>
                    {complaint.createdAt
                      ? new Date(
                          complaint.createdAt
                        ).toLocaleDateString()
                      : "-"}
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

export default MyComplaint;