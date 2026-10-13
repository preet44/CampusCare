class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4")
      ? "fail"
      : "error";

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
/*Purpose: Creates a custom error class so we can handle errors with a proper message and HTTP status code.

extends Error → makes AppError a custom version of JavaScript's built-in Error.
super(message) → passes the error message to the parent Error class.
this.statusCode = statusCode → stores the HTTP status code, e.g. 400, 401, 404, 500.
this.status → creates a simple status:
4xx → "fail" (client/request problem)
Other codes → "error" (server problem)
Error.captureStackTrace() → keeps useful information about where the error occurred, helping with debugging.*/