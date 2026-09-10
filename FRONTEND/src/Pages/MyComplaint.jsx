import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../Services/Api";
import StatusBadge from "../Components/StatusBadge";
import { motion } from "framer-motion";

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
    <div className="container my-complaints-page">

      {/* ================================
          PAGE HEADER
      ================================= */}

      <motion.div
        className="my-complaints-header"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
      >
        <div>
          <h2>My Complaints</h2>

          <p>
            View all complaints you have submitted.
          </p>
        </div>

        <Link
          to="/create-complaint"
          className="btn btn-primary my-complaints-create-btn"
        >
          Create Complaint
        </Link>
      </motion.div>


      {/* ================================
          ERROR MESSAGE
      ================================= */}

      {message && (
        <motion.div
          className="alert alert-danger"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {message}
        </motion.div>
      )}


      {/* ================================
          LOADING
      ================================= */}

      {loading ? (
        <motion.div
          className="text-center py-5"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
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

        /* ================================
            NO COMPLAINTS
        ================================= */

        <motion.div
          className="alert alert-info"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          You have not submitted any complaints yet.
        </motion.div>


      ) : (

        /* ================================
            COMPLAINT TABLE
        ================================= */

        <motion.div
          className="my-complaints-table-card"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="table-responsive">

            <table className="table my-complaints-table mb-0">

              {/* TABLE HEADER */}

              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th>Action</th>
                </tr>
              </thead>


              {/* TABLE BODY */}

              <tbody>
                {complaints.map((complaint, index) => (
                  <motion.tr
                    key={complaint._id}
                    initial={{
                      opacity: 0,
                      y: 6,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.8,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >

                    {/* TITLE */}

                    <td>
                      <strong>
                        {complaint.title}
                      </strong>
                    </td>


                    {/* CATEGORY */}

                    <td>
                      {complaint.category}
                    </td>


                    {/* STATUS */}

                    <td>
                      <StatusBadge
                        status={complaint.status}
                      />
                    </td>


                    {/* CREATED DATE */}

                    <td>
                      {complaint.createdAt
                        ? new Date(
                          complaint.createdAt
                        ).toLocaleDateString()
                        : "-"}
                    </td>


                    {/* ACTION */}

                    <td>
                      <Link
                        to={`/complaint/${complaint._id}`}
                        className="btn btn-outline-primary btn-sm complaint-view-btn"
                      >
                        View
                      </Link>
                    </td>

                  </motion.tr>
                ))}
              </tbody>

            </table>

          </div>
        </motion.div>
      )}

    </div>
  );
}

export default MyComplaint;