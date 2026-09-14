const Admin = require("../models/Admin");
const Complaint = require("../models/Complaint");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// =========================================================
// ADMIN LOGIN
// =========================================================

const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find admin by email
        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "Admin not found",
            });
        }

        // Compare entered password with hashed password
        const isMatch = await bcrypt.compare(
            password,
            admin.password
        );

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        // Create JWT token
        const token = jwt.sign(
            {
                id: admin._id,
                email: admin.email,
                role: "admin",
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d",
            }
        );

        // Store JWT in cookie
        const isProduction =
            process.env.NODE_ENV === "production";

        res.cookie("token", token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
            maxAge: 24 * 60 * 60 * 1000,
        });

        // Send safe admin information
        res.status(200).json({
            success: true,
            message: "Admin Login Successful",
            user: {
                id: admin._id,
                name: admin.name,
                email: admin.email,
                role: "admin",
            },
        });

    } catch (error) {
        console.error("Admin Login Error:", error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// =========================================================
// GET ALL COMPLAINTS
// =========================================================

const getAllComplaint = async (req, res) => {
    try {
        const complaints = await Complaint.find()
            .populate("student", "name email");

        res.status(200).json({
            success: true,
            complaints,
        });

    } catch (error) {
        console.error("Get All Complaints Error:", error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// =========================================================
// UPDATE COMPLAINT STATUS
// =========================================================

const updateComplaintStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const complaint = await Complaint.findById(
            req.params.id
        );

        if (!complaint) {
            return res.status(404).json({
                success: false,
                message: "Complaint not found",
            });
        }

        // Update complaint status
        complaint.status = status;

        // Save updated complaint
        await complaint.save();

        res.status(200).json({
            success: true,
            message: "Complaint status updated successfully",
            complaint,
        });

    } catch (error) {
        console.error(
            "Update Complaint Status Error:",
            error
        );

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// =========================================================
// GET COMPLAINT STATISTICS
// =========================================================

const getComplaintStatus = async (req, res) => {
    try {
        const total = await Complaint.countDocuments();

        const pending = await Complaint.countDocuments({
            status: "Pending",
        });

        const inProgress = await Complaint.countDocuments({
            status: "In Progress",
        });

        const resolved = await Complaint.countDocuments({
            status: "Resolved",
        });

        res.status(200).json({
            success: true,
            stats: {
                total,
                pending,
                inProgress,
                resolved,
            },
        });

    } catch (error) {
        console.error(
            "Get Complaint Statistics Error:",
            error
        );

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// =========================================================
// ADMIN LOGOUT
// =========================================================

const adminLogout = async (req, res) => {
    try {
        const isProduction =
            process.env.NODE_ENV === "production";

        // Remove JWT cookie
        res.clearCookie("token", {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
        });

        res.status(200).json({
            success: true,
            message: "Admin Logout Successful",
        });

    } catch (error) {
        console.error("Admin Logout Error:", error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// EXPORT CONTROLLERS

module.exports = {
    adminLogin,
    getAllComplaint,
    updateComplaintStatus,
    getComplaintStatus,
    adminLogout,
};