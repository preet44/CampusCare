const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");

const {
  complaintValidation,
  updateComplaintValidation,
} = require("../validation/complaintValidation");

const validate = require("../validation/validate");

const {
  createComplaint,
  getMyComplaint,
  getComplaintById,
  updatedComplaint,
  deleteComplaint,
} = require("../controllers/complaintController");

router.post(
  "/create",
  authMiddleware,
  validate(complaintValidation),
  createComplaint
);

router.get(
  "/my-complaints",
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
  validate(updateComplaintValidation),
  updatedComplaint
);

router.delete(
  "/:id",
  authMiddleware,
  deleteComplaint
);

module.exports = router;