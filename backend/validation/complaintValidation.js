const Joi = require("joi");

const complaintValidation = Joi.object({
  title: Joi.string()
    .trim()
    .min(5)
    .max(100)
    .required(),

  description: Joi.string()
    .trim()
    .min(10)
    .max(1000)
    .required(),

  category: Joi.string()
    .trim()
    .valid(
      "Academic",
      "Hostel",
      "Technical",
      "Canteen",
      "Library",
      "Furniture",
      "Other"
    )
    .required(),
});

const updateComplaintValidation = Joi.object({
  title: Joi.string()
    .trim()
    .min(5)
    .max(100),

  description: Joi.string()
    .trim()
    .min(10)
    .max(1000),

  category: Joi.string()
    .trim()
    .valid(
      "Academic",
      "Hostel",
      "Technical",
      "Canteen",
      "Library",
      "Furniture",
      "Other"
    ),
}).min(1);

module.exports = {
  complaintValidation,
  updateComplaintValidation,
};