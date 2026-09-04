const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Admin = require("../models/Admin");
const Complaint = require("../models/Complaint");

const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/AsyncHandler");

const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });

  if (!admin) {
    throw new AppError("Invalid email or password.", 401);
  }

  const isPasswordCorrect = await bcrypt.compare(
    password,
    admin.password
  );

  if (!isPasswordCorrect) {
    throw new AppError("Invalid email or password.", 401);
  }

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

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
  });

  res.status(200).json({
    success: true,
    message: "Admin login successful.",
    user: {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: "admin",
    },
  });
});

const getAllComplaint = asyncHandler(async (req, res) => {
  const complaints = await Complaint.find()
    .populate("student", "name email")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    complaints,
  });
});

const updateComplaintStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const allowedStatuses = [
    "Pending",
    "In Progress",
    "Resolved",
    "Rejected",
  ];

  if (!allowedStatuses.includes(status)) {
    throw new AppError("Invalid complaint status.", 400);
  }

  const complaint = await Complaint.findByIdAndUpdate(
    id,
    { status },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!complaint) {
    throw new AppError("Complaint not found.", 404);
  }

  res.status(200).json({
    success: true,
    message: "Complaint status updated.",
    complaint,
  });
});

const getComplaintStatus = asyncHandler(async (req, res) => {
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

  const rejected = await Complaint.countDocuments({
    status: "Rejected",
  });

  res.status(200).json({
    success: true,
    statistics: {
      total,
      pending,
      inProgress,
      resolved,
      rejected,
    },
  });
});

module.exports = {
  adminLogin,
  getAllComplaint,
  updateComplaintStatus,
  getComplaintStatus,
};