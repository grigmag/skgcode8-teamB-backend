const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');

const authorizeToken = require('../middlewares/tokenAuth');
const User = require('../models/user');

router.get('/profile', authorizeToken, async (req, res) => {
  if (req.user) {
    res.send(req.user);
  } else {
    res.status(401).send('You are not logged in');
  }
});

router.put('/profile', authorizeToken, async (req, res) => {
  const {
    healthIdNumber,
    firstName,
    lastName,
    birthDate,
    email,
    phoneNumber,
    bloodType,
    familyDoctorId,
  } = req.body;

  const user = await User.findOne({ healthIdNumber });
  if (user) {
    const updateProfile = await User.updateOne(
      { healthIdNumber },
      {
        firstName,
        lastName,
        birthDate,
        email,
        phoneNumber,
        bloodType,
        familyDoctorId,
      }
    );
    res.send('Profile updated successfully');
  } else {
    res.sendStatus(404);
  }
});

router.post('/register', async (req, res) => {
  const { healthIdNumber, password, email } = req.body;

  const user = await User.findOne({ healthIdNumber });
  if (!user) {
    const newUser = await new User({
      healthIdNumber,
      email,
      password,
    });

    newUser.save((err, user) => {
      if (err) {
        res.status(500).send({
          message: err,
        });
        return;
      } else {
        res.status(200).send({
          message: 'User Registered successfully',
        });
      }
    });
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
      .send({ message: 'healthIdNumber or password is invalid.' });
  }
});

router.put('/reset-password', authorizeToken, async (req, res) => {
  const { healthIdNumber, password } = req.body;

  const user = await User.findOne({ healthIdNumber });
  if (user) {
    const updatePassword = await User.updateOne(
      { healthIdNumber },
      { password }
    );
    res.send('Password updated successfully');
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;
