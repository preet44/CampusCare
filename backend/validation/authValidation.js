const Joi = require("joi");

const validateSignup = Joi.object({
  name: Joi.string().trim().max(50).required(),

  email: Joi.string()
    .trim()
    .lowercase()
    .email()
    .required(),

  password: Joi.string()
    .min(8)
    .max(30)
    .required(),
});

const validateLogin = Joi.object({
  email: Joi.string()
    .trim()
    .lowercase()
    .email()
    .required(),

  password: Joi.string()
    .min(8)
    .max(30)
    .required(),
});

module.exports = {
  validateSignup,
  validateLogin,
};