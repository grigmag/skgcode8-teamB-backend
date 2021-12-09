const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');

const authorizeToken = require('../middlewares/tokenAuth');
const { logError, handleError } = require('../middlewares/errorHandling');
const User = require('../models/user');

router.get('/profile', authorizeToken, async (req, res) => {
  res.send(req.user);
});

router.put('/profile', authorizeToken, async (req, res, next) => {
  try {
    Object.assign(req.user, req.body);
    req.user.save();

    res.status(200).send({ message: 'Profile updated successfully' });
  } catch (err) {
    next(err);
  }
});

router.post('/register', async (req, res, next) => {
  const { healthIdNumber, password, email } = req.body;

  const user = await User.findOne({ healthIdNumber });
  if (!user) {
    try {
      await User.create({
        healthIdNumber,
        email,
        password,
      });
      res.send({ message: 'User Registered successfully' });
    } catch (err) {
      next(err);
    }
  } else {
    return res
      .status(400)
      .send({ message: 'User with this healthIdNumber already exists.' });
  }
});

router.post('/login', async (req, res) => {
  const { healthIdNumber, password } = req.body;

  const user = await User.findOne({ healthIdNumber, password });
  if (user) {
    const token = jwt.sign({ id: user.id }, process.env.API_SECRET, {
      expiresIn: '1d',
    });

    res
      .status(200)
      .send({ user, message: 'Login Successful', accessToken: token });
  } else {
    return res
      .status(404)
      .send({ message: 'Health ID number or password is invalid.' });
  }
});

// router.put('/reset-password', authorizeToken, async (req, res, next) => {
//   try {
//     Object.assign(req.user, req.body);
//     req.user.save();
//     res.status(200).send('Password updated successfully');
//   } catch (err) {
//     next(err);
//   }
// });

router.use(logError, handleError);

module.exports = router;
