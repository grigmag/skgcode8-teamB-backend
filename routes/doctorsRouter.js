const express = require('express');
const router = express.Router();

const authorizeToken = require('../middlewares/tokenAuth');

const Doctor = require('../models/doctor');

router.use(authorizeToken);

router.get('/', async (req, res, next) => {
  try {
    const doctors = await Doctor.find();
    res.send(doctors);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (doctor) {
      res.send(doctor);
    } else {
      res.status(404).send({ message: 'Doctor with this id not found.' });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
