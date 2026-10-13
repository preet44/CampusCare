const validate = (schema) => {
    return (req, res, next) => {

        const { error, value } = schema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true,
        });

        if (error) {
            const errors = error.details.map((detail) => ({
                field: detail.path.join("."),
                message: detail.message,
            }));

            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors,
            });
        }

        req.body = value;

        next();
    };
};

module.exports = validate;
/*Purpose: Validates incoming request data (req.body) using a Joi schema before it reaches the controller.

validate(schema) → reusable middleware that accepts a Joi validation schema.
schema.validate() → checks whether the incoming data follows the required rules.
abortEarly: false → shows all validation errors at once, instead of stopping at the first error.
stripUnknown: true → removes fields that are not defined in the schema.
error.details → contains information about validation errors.
field → identifies which field has the error.
message → explains what is wrong with that field.
If validation fails → sends 400 Bad Request with the errors.
req.body = value → replaces the original data with the validated/cleaned data.
next() → allows the request to continue to the controller.*/