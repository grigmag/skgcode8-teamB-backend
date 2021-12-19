const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const authorizeToken = require('../middlewares/tokenAuth');
const User = require('../models/user');
const Doctor = require('../models/doctor');

const { familyDoctorSpecialty } = require('../utils/dataUtils');

router.get('/profile', authorizeToken, async (req, res) => {
  const responseData = req.user.toObject();
  delete responseData.password;

  res.send(responseData);
});

router.put('/profile', authorizeToken, async (req, res, next) => {
  try {
    let doctor;
    if (req.body.familyDoctor) {
      doctor = await Doctor.findById(req.body.familyDoctor.id);
      if (!doctor) {
        return res.status(400).send({
          message: 'Doctor id not provided or doctor does not exist.',
        });
      } else if (doctor.specialty !== familyDoctorSpecialty) {
        return res
          .status(400)
          .send({ message: 'Doctor is not a family doctor.' });
      }
    }

    const updatedUser = doctor
      ? {
          ...req.body,
          familyDoctor: {
            id: doctor.id,
            firstName: doctor.firstName,
            lastName: doctor.lastName,
          },
        }
      : req.body;

    await User.findByIdAndUpdate(req.user.id, updatedUser, {
      runValidators: true,
    });

    res.status(200).send({ message: 'Profile updated successfully' });
  } catch (err) {
    next(err);
  }
});

router.post('/register', async (req, res, next) => {
  const { healthIdNumber, password, email } = req.body;

  const encryptedPassword = bcrypt.hashSync(password, 8);

  if (typeof healthIdNumber !== 'string') {
    res.status(400).send({
      message: 'The property healthIdNumber should be a string.',
    });
    return;
  }

  const user = await User.findOne({ healthIdNumber });
  if (!user) {
    try {
      await User.create({
        healthIdNumber,
        email,
        password: encryptedPassword,
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

  const user = await User.findOne({ healthIdNumber });
  if (user) {
    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (passwordIsValid) {
      const token = jwt.sign({ id: user.id }, process.env.API_SECRET, {
        expiresIn: '1d',
      });

      const responseUser = user.toObject();
      delete responseUser.password;

      return res.status(200).send({
        user: responseUser,
        message: 'Login Successful',
        accessToken: token,
      });
    } else {
      return res.status(400).send({ message: 'Password is invalid.' });
    }
  } else {
    return res.status(404).send({ message: 'Health ID number is invalid.' });
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

module.exports = router;
