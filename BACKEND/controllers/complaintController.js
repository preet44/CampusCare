const Complaint = require("../models/Complaint");


const createComplaint = async (req, res, next) => {
    try {
        const { title, description, category } = req.body;

        const complaint = await Complaint.create({
            title,
            description,
            category,
            student: req.user.id,
        });

        res.status(201).json({
            success: true,
            message: "Complaint Submitted Successfully",
            complaint,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


const getMyComplaint = async (req, res) => {
    try {
        const complaints = await Complaint.find({
            student: req.user.id,
            // Where does req.user.id come from?
            // Usually, your authentication middleware verifies
            // the JWT and puts the user's information into req.user.
        });

        res.status(200).json({
            success: true,
            complaints,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// getMyComplaint fetches all complaints belonging to the currently logged-in student.


const getComplaintById = async (req, res) => {
    try {
        const complaint = await Complaint.findById(req.params.id);

        if (!complaint) {
            return res.status(404).json({
                success: false,
                message: "Complaint not found",
            });
        }

        res.status(200).json({
            success: true,
            complaint,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// getComplaintById => Gets one specific complaint using its complaint ID.


const updatedComplaint = async (req, res) => {
    try {
        const complaint = await Complaint.findById(req.params.id);

        if (!complaint) {
            return res.status(404).json({
                success: false,
                message: "Complaint not found",
            });
        }

        if (complaint.student.toString() !== req.user.id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Unauthorised access",
            });
        }

        const updatedComplaint = await Complaint.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        return res.status(200).json({
            success: true,
            message: "Complaint updated successfully",
            complaint: updatedComplaint,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// The purpose of this function is:
// To allow a student to update their own complaint,
// but prevent them from updating someone else's complaint.


const deleteComplaint = async (req, res) => {
    try {
        const complaint = await Complaint.findById(req.params.id);

        if (!complaint) {
            return res.status(404).json({
                success: false,
                message: "Complaint not found",
            });
        }

        if (complaint.student.toString() !== req.user.id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Unauthorised access",
            });
        }

        // Only allow a student to modify their own complaint,
        // not someone else's complaint.
        // This is called authorization.

        await Complaint.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Complaint deleted successfully",
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};


module.exports = {
    createComplaint,
    getMyComplaint,
    getComplaintById,
    updatedComplaint,
    deleteComplaint,
};