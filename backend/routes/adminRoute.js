const express = require("express");
const router = express.Router();

const {
  adminLogin,
  getAllComplaint,
  updateComplaintStatus,
  getComplaintStatus,
} = require("../controllers/adminController");

const {
  adminLoginValidation,
} = require("../validation/adminValidation");

const validate = require("../validation/validate");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

router.post(
  "/login",
  validate(adminLoginValidation),
  adminLogin
);

router.get(
  "/complaints",
  authMiddleware,
  adminMiddleware,
  getAllComplaint
);

router.put(
  "/complaints/:id/status",
  authMiddleware,
  adminMiddleware,
  updateComplaintStatus
);

router.get(
  "/dashboard",
  authMiddleware,
  adminMiddleware,
  getComplaintStatus
);

module.exports = router;