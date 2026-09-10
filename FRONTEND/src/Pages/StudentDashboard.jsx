import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../Services/Api";
import StatusBadge from "../Components/StatusBadge";
import { motion } from "framer-motion";

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

      {/* =================================
          HEADER
          KEEPING PREVIOUS STYLE
      ================================= */}

      <motion.div
        className="dashboard-header"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
      >
        <h2>Student Dashboard</h2>

        <p>Welcome back...</p>

        <p className="lead text-secondary mb-3">
          Track your complaints and stay updated on their progress.
        </p>

        <Link
          to="/create-complaint"
          className="btn btn-primary btn-lg dashboard-action-btn"
        >
          + &nbsp; New Complaint
        </Link>
      </motion.div>


      {/* =================================
          STATISTICS
          DO NOT CHANGE
      ================================= */}

      <div className="row g-3 mb-5 mt-4 dashboard-stats-row">

        {/* TOTAL */}

        <div className="col-3">

          <motion.div
            className="dashboard-stat-card"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.4,
              delay: 0.1,
              ease: "easeOut",
            }}
            whileHover={{
              scale: 1.03,
            }}
          >
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
          </motion.div>

        </div>


        {/* PENDING */}

        <div className="col-3">

          <motion.div
            className="dashboard-stat-card"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.4,
              delay: 0.15,
              ease: "easeOut",
            }}
            whileHover={{
              scale: 1.03,
            }}
          >
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
          </motion.div>

        </div>


        {/* IN PROGRESS */}

        <div className="col-3">

          <motion.div
            className="dashboard-stat-card"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.4,
              delay: 0.2,
              ease: "easeOut",
            }}
            whileHover={{
              scale: 1.03,
            }}
          >
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
          </motion.div>

        </div>


        {/* RESOLVED */}

        <div className="col-3">

          <motion.div
            className="dashboard-stat-card"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.4,
              delay: 0.25,
              ease: "easeOut",
            }}
            whileHover={{
              scale: 1.03,
            }}
          >
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
          </motion.div>

        </div>

      </div>


      {/* =================================
          RECENT COMPLAINTS
          NEW ANIMATION ONLY
      ================================= */}

      <motion.div
        className="dashboard-section recent-complaints-section"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
      >

        {/* SECTION HEADER */}

        <motion.div
          className="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-4"
          initial={{
            opacity: 0,
            y: 8,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.4,
            delay: 0.1,
            ease: "easeOut",
          }}
        >

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

        </motion.div>


        {/* =================================
            EMPTY STATE
        ================================= */}

        {recentComplaints.length === 0 ? (

          <motion.div
            className="card border-0 shadow-sm dashboard-empty-card"
            initial={{
              opacity: 0,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
          >

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

          </motion.div>

        ) : (

          /* =================================
              COMPLAINT CARDS
          ================================= */

          <div className="row g-4">

            {recentComplaints.map((complaint, index) => (

              <div
                className="col-12 col-lg-4"
                key={complaint._id}
              >

                <motion.div
                  className="card border-0 shadow-sm dashboard-complaint-card h-100"
                  initial={{
                    opacity: 0,
                    y: 12,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.45,
                    delay: 0.12 * index,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{
                    y: -4,
                  }}
                >

                  {/* CARD CONTENT */}

                  <div className="card-body">

                    {/* TITLE + STATUS */}

                    <div className="d-flex justify-content-between align-items-start gap-2 mb-3">

                      <h5
                        className="fw-bold mb-0 recent-complaint-title"
                        title={complaint.title}
                      >
                        {complaint.title}
                      </h5>

                      <StatusBadge
                        status={complaint.status}
                      />

                    </div>


                    {/* DESCRIPTION */}

                    <p className="text-secondary complaint-description">
                      {complaint.description}
                    </p>


                    {/* CATEGORY + DATE */}

                    <div className="small text-secondary recent-complaint-meta">

                      <div className="recent-complaint-info">

                        <span className="recent-complaint-label">
                          Category
                        </span>

                        <span className="recent-complaint-value">
                          {complaint.category}
                        </span>

                      </div>


                      <div className="recent-complaint-info">

                        <span className="recent-complaint-label">
                          Date
                        </span>

                        <span className="recent-complaint-value">
                          {new Date(
                            complaint.createdAt
                          ).toLocaleDateString()}
                        </span>

                      </div>

                    </div>


                    {/* VIEW COMPLAINT */}

                    <Link
                      to={`/complaint/${complaint._id}`}
                      className="recent-complaint-view"
                    >
                      <span>
                        View Complaint
                      </span>

                      <span className="recent-complaint-arrow">
                        →
                      </span>
                    </Link>

                  </div>

                </motion.div>

              </div>

            ))}

          </div>

        )}

      </motion.div>

    </div>
  );
}

export default StudentDashboard;