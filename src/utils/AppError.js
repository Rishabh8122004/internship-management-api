// An Error that also carries an HTTP status code.
// Controllers throw it; the error middleware turns it into a JSON response.
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = AppError;