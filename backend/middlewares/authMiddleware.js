const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");

const authMiddleware = async (req, res, next) => {
    try {

        const token = req.cookies.token;

        if (!token) {
            throw new AppError(
                "Authentication required. Please Login.",
                401
            );
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch (error) {

        if (error.name === "JsonWebTokenError") {
            return next(
                new AppError(
                    "Invalid Authentication Token. Please Login again.",
                    401
                )
            );
        }

        if (error.name === "TokenExpiredError") {
            return next(
                new AppError(
                    "Authentication token expired. Please Login again.",
                    401
                )
            );
        }

        next(error);
    }
};

module.exports = authMiddleware;