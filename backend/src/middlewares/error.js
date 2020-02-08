module.exports = {
  notFound(req, res, next) {
    const error = new Error(`Not found: ${req.originalUrl}`);
    res.status(404);
    next(error);
  },

  // eslint-disable-next-line no-unused-vars
  errorHandler(error, req, res, next) {
    const statusCode = res.status === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
      message: error.message,
      stack: process.env.NODE_ENV === 'production' ? '' : error.stack,
    });
  },
};
