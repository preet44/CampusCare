const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

const validate = require("../validation/validate");

const {
  feedbackValidation,
} = require("../validation/feedbackValidation");

const {
  createFeedback,
  getFeedback,
  getAllFeedback,
} = require("../controllers/feedbackController");


// Student submits feedback
router.post(
  "/:complaintId",
  authMiddleware,
  validate(feedbackValidation),
  createFeedback
);


// Student/Admin gets feedback for one complaint
router.get(
  "/:complaintId",
  authMiddleware,
  getFeedback
);


// Admin gets all feedback
router.get(
  "/",
  adminMiddleware,
  getAllFeedback
);


module.exports = router;