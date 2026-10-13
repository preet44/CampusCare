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

/*Purpose: Protects private routes by checking whether the user has a valid JWT token.

jwt → used to verify the JWT token.
AppError → creates custom errors with a message and status code.
req.cookies.token → gets the JWT token stored in the browser cookie.
If there is no token → returns 401 Authentication required.
jwt.verify() → checks whether the token is valid using JWT_SECRET.
decoded → contains the information stored inside the JWT, such as id, email, and role.
req.user = decoded → stores logged-in user's information so other controllers can use req.user.
next() → allows the request to continue to the protected route.
JsonWebTokenError → handles an invalid token.
TokenExpiredError → handles an expired token.
next(error) → passes errors to the application's error-handling middleware.*/