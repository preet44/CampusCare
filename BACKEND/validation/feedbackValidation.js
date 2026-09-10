const joi = require("joi");

const feedbackValidation = joi.object({
  rating: joi.number()
    .integer()
    .min(1)
    .max(5)
    .required(),

  comment: joi.string()
    .trim()
    .max(500)
    .allow("")
    .optional(),
});

module.exports = {
  feedbackValidation,
};