const express = require("express");
const router = express.Router();

const validate = require("../validation/validate");

const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

const {
    adminLogin,
    getAllComplaint,
    updateComplaintStatus,
    getComplaintStatus,
    adminLogout,
} = require("../controllers/adminController");

const {
    adminLoginValidation,
} = require("../validation/adminValidation");


// ================= ADMIN LOGIN =================

router.post(
    "/login",
    validate(adminLoginValidation),
    adminLogin
);


// ================= ADMIN COMPLAINTS =================

router.get(
    "/complaints",
    authMiddleware,
    adminMiddleware,
    getAllComplaint
);


// ================= UPDATE COMPLAINT STATUS =================

router.put(
    "/complaints/:id/status",
    authMiddleware,
    adminMiddleware,
    updateComplaintStatus
);


// ================= ADMIN DASHBOARD =================

router.get(
    "/dashboard",
    authMiddleware,
    adminMiddleware,
    getComplaintStatus
);


// ================= ADMIN LOGOUT =================

router.post(
    "/logout",
    adminLogout
);


module.exports = router; 