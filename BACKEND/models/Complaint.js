const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        category: {
            type: String,
            required: true,
            enum: [
                "Academic",
                "Hostel",
                "Technical",
                "Canteen",
                "Library",
                "Furniture",
                "Other",
            ],
        },

        status: {
            type: String,
            enum: [
                "Pending",
                "In Progress",
                "Resolved",
                "Rejected",
            ],
            default: "Pending",
        },

        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        image: {
            url: {
                type: String,
                default: null,
            },

            publicId: {
                type: String,
                default: null,
            },
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Complaint", complaintSchema);