const joi = require("joi");

const complaintValidation = joi.object({
    title: joi.string()
        .trim()
        .min(5)
        .max(100)
        .required(),

    description: joi.string()
        .trim()
        .min(10)
        .max(1000)
        .required(),

    category: joi.string()
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


const updatedComplaint = joi.object({
    title: joi.string()
        .trim()
        .min(5)
        .max(100),

    description: joi.string()
        .trim()
        .min(10)
        .max(1000),

    category: joi.string()
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
});


module.exports = {
    complaintValidation,
    updatedComplaint,
};