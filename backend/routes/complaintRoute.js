const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const validate = require("../validation/validate");

const {
    complaintValidation,
    updatedComplaint: updatedComplaintValidation,
} = require("../validation/complaintValidation");

const {
    createComplaint,
    getMyComplaint,
    getComplaintById,
    updatedComplaint: updateComplaint,
    deleteComplaint,
} = require("../controllers/complaintController");


router.post(
    "/create",
    authMiddleware,
    validate(complaintValidation),
    createComplaint
);


router.get(
    "/my_complaints",
    authMiddleware,
    getMyComplaint
);


router.get(
    "/:id",
    authMiddleware,
    getComplaintById
);


router.put(
    "/:id",
    authMiddleware,
    validate(updatedComplaintValidation),
    updateComplaint
);


router.delete(
    "/:id",
    authMiddleware,
    deleteComplaint
);


module.exports = router;