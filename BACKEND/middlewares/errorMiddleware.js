const AppError = require("../utils/AppError");

const errorMiddleware = (err, req, res, next) => {
    let error = err;

    // Mongoose invalid ObjectId
    if (err.name === "CastError") {
        error = new AppError("Invalid ID format", 400);
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];

        error = new AppError(
            `${field} already exists`,
            409
        );
    }

    // Mongoose validation error
    if (err.name === "ValidationError") {
        const messages = Object.values(err.errors)
            .map((item) => item.message);

        error = new AppError(
            messages.join(", "),
            400
        );
    }

    const statusCode = error.statusCode || 500;

    const message =
        error.message || "Internal server error";

    res.status(statusCode).json({
        success: false,
        message,
        ...(process.env.NODE_ENV === "development" && {
            stack: err.stack,
        }),
    });
};

module.exports = errorMiddleware;

/*Purpose: Handles errors from the entire backend in one central place and sends a proper response to the frontend.

AppError → creates custom errors with a message + status code.
err → contains the error passed from controllers/middleware.
CastError → handles invalid MongoDB ObjectId → returns 400 Invalid ID format.
11000 error → handles duplicate values (e.g., existing email) → returns 409.
ValidationError → handles Mongoose validation errors → collects all error messages and returns 400.
statusCode → uses the error's status code; if unavailable, uses 500.
message → sends the error message; if unavailable, sends "Internal server error".
res.status().json() → sends a consistent error response to the frontend.
stack → shown only in development to help developers debug errors.*/