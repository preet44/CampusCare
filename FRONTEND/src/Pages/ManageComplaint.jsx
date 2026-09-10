import {
    useEffect,
    useState,
} from "react";

import API from "../Services/Api";

import StatusBadge from "../Components/StatusBadge";

import { motion } from "framer-motion";


function ManageComplaint() {

    const [complaints, setComplaints] =
        useState([]);

    const [loading, setLoading] =
        useState(true);


    const getComplaints = async () => {

        try {

            const response =
                await API.get(
                    "/admin/complaints"
                );


            setComplaints(
                response.data.complaints
            );

        } catch (error) {

            console.log(
                error.response?.data
            );

        } finally {

            setLoading(false);
        }
    };


    useEffect(() => {

        getComplaints();

    }, []);


    const updateStatus =
        async (id, status) => {

            try {

                await API.put(
                    `/admin/complaints/${id}/status`,
                    {
                        status,
                    }
                );


                getComplaints();

            } catch (error) {

                console.log(
                    error.response?.data
                );
            }
        };


    /* =================================
       LOADING
    ================================= */

    if (loading) {

        return (

            <motion.div
                className="container py-5 text-center manage-complaint-loading"
                initial={{
                    opacity: 0,
                }}
                animate={{
                    opacity: 1,
                }}
                transition={{
                    duration: 0.35,
                    ease: "easeOut",
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
        );
    }


    return (

        <div className="container py-4 manage-complaints-page">


            {/* =================================
                PAGE HEADER
            ================================= */}

            <motion.div
                className="mb-4"
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
                    ease: "easeOut",
                }}
            >

                <h2 className="fw-bold">
                    Manage Complaints
                </h2>

                <p className="text-muted">
                    Review and update student complaints.
                </p>

            </motion.div>


            {complaints.length === 0 ? (

                /* =================================
                   EMPTY STATE
                ================================= */

                <motion.div
                    className="alert alert-info manage-complaint-empty"
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
                        ease: "easeOut",
                    }}
                >
                    No complaints found.
                </motion.div>

            ) : (

                /* =================================
                   COMPLAINT LIST
                ================================= */

                <div className="row g-4">

                    {complaints.map(
                        (complaint, index) => (

                            <div
                                className="col-lg-6"
                                key={
                                    complaint._id
                                }
                            >

                                <motion.div
                                    className="card shadow-sm border-0 h-100 manage-complaint-card"
                                    initial={{
                                        opacity: 0,
                                        y: 10,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    transition={{
                                        duration: 0.4,
                                        delay: index * 0.06,
                                        ease: "easeOut",
                                    }}
                                    whileHover={{
                                        y: -2,
                                    }}
                                >

                                    <div className="card-body p-4">


                                        {/* ================= TITLE ================= */}

                                        <h4 className="fw-bold mb-3 manage-complaint-title">

                                            {complaint.title}

                                        </h4>


                                        {/* ================= STUDENT ================= */}

                                        <div className="mb-2">

                                            <strong>
                                                Student:
                                            </strong>{" "}

                                            {
                                                complaint
                                                    .student
                                                    ?.name ||
                                                "Unknown"
                                            }

                                        </div>


                                        <div className="mb-3 text-muted">

                                            {
                                                complaint
                                                    .student
                                                    ?.email ||
                                                "-"
                                            }

                                        </div>


                                        {/* ================= CATEGORY ================= */}

                                        <div className="mb-2">

                                            <strong>
                                                Category:
                                            </strong>{" "}

                                            {
                                                complaint.category
                                            }

                                        </div>


                                        {/* ================= DATE ================= */}

                                        <div className="mb-3">

                                            <strong>
                                                Date:
                                            </strong>{" "}

                                            {complaint.createdAt
                                                ? new Date(
                                                    complaint.createdAt
                                                ).toLocaleDateString()
                                                : "-"
                                            }

                                        </div>


                                        {/* ================= DESCRIPTION ================= */}

                                        <div className="mb-3">

                                            <strong>
                                                Description:
                                            </strong>


                                            <div className="border rounded p-3 mt-2 bg-light manage-complaint-description">

                                                {
                                                    complaint.description
                                                }

                                            </div>

                                        </div>


                                        {/* ================= IMAGE ================= */}

                                        {complaint.image?.url && (

                                            <div className="mb-4">

                                                <strong>
                                                    Attached Image:
                                                </strong>


                                                <motion.div
                                                    className="mt-2 manage-complaint-image-wrapper"
                                                    whileHover={{
                                                        scale: 1.01,
                                                    }}
                                                    transition={{
                                                        duration: 0.25,
                                                        ease: "easeOut",
                                                    }}
                                                >

                                                    <img
                                                        src={
                                                            complaint
                                                                .image
                                                                .url
                                                        }
                                                        alt="Complaint"
                                                        className="img-fluid rounded border manage-complaint-image"
                                                        style={{
                                                            width:
                                                                "100%",
                                                            maxHeight:
                                                                "300px",
                                                            objectFit:
                                                                "contain",
                                                        }}
                                                    />

                                                </motion.div>

                                            </div>

                                        )}


                                        {/* ================= STATUS ================= */}

                                        <div className="mb-2">

                                            <strong>
                                                Status:
                                            </strong>{" "}

                                            <StatusBadge
                                                status={
                                                    complaint.status
                                                }
                                            />

                                        </div>


                                        {/* ================= STATUS SELECT ================= */}

                                        <select
                                            className="form-select manage-complaint-select"
                                            value={
                                                complaint.status
                                            }
                                            onChange={(e) =>
                                                updateStatus(
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

                                            <option value="Rejected">
                                                Rejected
                                            </option>

                                        </select>


                                    </div>

                                </motion.div>

                            </div>

                        )
                    )}

                </div>

            )}

        </div>
    );
}


export default ManageComplaint;