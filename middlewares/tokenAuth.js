const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authorizeToken = async (req, res, next) => {
  if (req.headers?.authorization) {
    const [tokenType, token] = req.headers.authorization.split(' ');
    if (tokenType === 'JWT') {
      try {
        const decoded = jwt.verify(token, process.env.API_SECRET);
        const user = await User.findById(decoded.id);
        if (user) {
          req.user = user;
        }
      } catch (err) {
        // error handling....
      }
    }
  }

  return next();
};

module.exports = authorizeToken;