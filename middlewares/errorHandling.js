const logError = (err, req, res, next) => {
  if (err) {
    console.log('Logging error: ', err.message || 'Error');
  }
  next(err);
};

const handleError = (err, req, res, next) => {
  if (err) {
    res
      .status(err.status || 500)
      .send({ message: err.message || 'Server Error' });
  }
};

module.exports = { logError, handleError };
