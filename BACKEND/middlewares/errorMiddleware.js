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