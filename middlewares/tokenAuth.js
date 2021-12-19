const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authorizeToken = async (req, res, next) => {
  try {
    if (req.headers?.authorization) {
      const [tokenType, token] = req.headers.authorization.split(' ');
      if (tokenType === 'JWT') {
        const decoded = jwt.verify(token, process.env.API_SECRET);
        const user = await User.findById(decoded.id);
        if (user) {
          req.user = user;
          return next();
        }
      }
    }
  } catch (err) {
    return next(err);
  }

  return res.status(401).send({ message: 'You are not logged in' });
};

module.exports = authorizeToken;
