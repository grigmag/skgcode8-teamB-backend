const logError = (err, req, res, next) => {
  if (err) {
    console.log(err.message || 'Error');
  }
  next(err);
};

const handleError = (err, req, res, next) => {
  if (err) {
    res.status(500).send(err.message || 'Server Error');
  }
};

module.exports = { logError, handleError };
