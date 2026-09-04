const Complaint = require("../models/Complaint");

const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/AsyncHandler");

const createComplaint = asyncHandler(async (req, res) => {
  const { title, description, category } = req.body;

  const complaint = await Complaint.create({
    title,
    description,
    category,
    student: req.user.id,
  });

  res.status(201).json({
    success: true,
    message: "Complaint created successfully.",
    complaint,
  });
});

const getMyComplaint = asyncHandler(async (req, res) => {
  const complaints = await Complaint.find({
    student: req.user.id,
  }).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    complaints,
  });
});

const getComplaintById = asyncHandler(async (req, res) => {
  const complaint = await Complaint.findById(req.params.id)
    .populate("student", "name email");

  if (!complaint) {
    throw new AppError("Complaint not found.", 404);
  }

  if (
    complaint.student._id.toString() !== req.user.id.toString() &&
    req.user.role !== "admin"
  ) {
    throw new AppError("You are not authorized to view this complaint.", 403);
  }

  res.status(200).json({
    success: true,
    complaint,
  });
});

const updatedComplaint = asyncHandler(async (req, res) => {
  const complaint = await Complaint.findById(req.params.id);

  if (!complaint) {
    throw new AppError("Complaint not found.", 404);
  }

  if (complaint.student.toString() !== req.user.id.toString()) {
    throw new AppError(
      "You are not authorized to update this complaint.",
      403
    );
  }

  const { title, description, category } = req.body;

  if (title !== undefined) complaint.title = title;
  if (description !== undefined) complaint.description = description;
  if (category !== undefined) complaint.category = category;

  await complaint.save();

  res.status(200).json({
    success: true,
    message: "Complaint updated successfully.",
    complaint,
  });
});

const deleteComplaint = asyncHandler(async (req, res) => {
  const complaint = await Complaint.findById(req.params.id);

  if (!complaint) {
    throw new AppError("Complaint not found.", 404);
  }

  if (complaint.student.toString() !== req.user.id.toString()) {
    throw new AppError(
      "You are not authorized to delete this complaint.",
      403
    );
  }

  await complaint.deleteOne();

  res.status(200).json({
    success: true,
    message: "Complaint deleted successfully.",
  });
});

module.exports = {
  createComplaint,
  getMyComplaint,
  getComplaintById,
  updatedComplaint,
  deleteComplaint,
};