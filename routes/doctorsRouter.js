const express = require('express');
const router = express.Router();

const authorizeToken = require('../middlewares/tokenAuth');
const { logError, handleError } = require('../middlewares/errorHandling');

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
      res
        .status(400)
        .send({ message: 'Could not find a doctor with this id.' });
    }
  } catch (err) {
    next(err);
  }
});

router.use(logError, handleError);

module.exports = router;
