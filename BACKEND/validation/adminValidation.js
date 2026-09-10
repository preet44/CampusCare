const joi = require("joi");

const adminLoginValidation = joi.object({
    email: joi.string()
        .trim()
        .lowercase()
        .email()
        .required(),

    password: joi.string()
        .min(6)
        .max(30)
        .required(),
});

module.exports = {
    adminLoginValidation,
};