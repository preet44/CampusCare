const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");

const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return next(
        new AppError("Authentication required. Please login.", 401)
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return next(
        new AppError(
          "Invalid or expired authentication token. Please login again.",
          401
        )
      );
    }

    next(error);
  }
};

module.exports = authMiddleware;