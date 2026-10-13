const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise
      .resolve(fn(req, res, next))
      .catch(next);
  };
};

module.exports = asyncHandler;

/*Purpose: Automatically catches errors from async controllers and passes them to the error-handling middleware.

fn → the async controller/function we want to wrap.
Promise.resolve() → handles the result of the function as a Promise.
.catch(next) → if an error occurs, sends it to next(), which passes it to errorMiddleware.
This avoids writing try...catch repeatedly in every async controller.*/