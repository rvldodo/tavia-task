export const errorMiddleware = (err, req, res, next) => {
  res.status(err.statusCode).json({
    message: err.message,
    errorCode: err.errorCode,
    errors: err.errors,
  });
};
