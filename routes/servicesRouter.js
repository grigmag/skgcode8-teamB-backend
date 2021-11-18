const express = require('express');
const router = express.Router();

const authorizeToken = require('../middlewares/tokenAuth');

const Prescription = require('../models/prescription');
const Appointment = require('../models/appointment');
const Diagnosis = require('../models/diagnosis');

router.get('/prescriptions', authorizeToken, async (req, res) => {
  if (req.user) {
    try {
      const userPrescriptions = await Prescription.find({
        userId: req.user.id,
      });
      res.send(userPrescriptions);
    } catch (err) {
      res.sendStatus(500);
    }
  } else {
    res.status(401).send('You are not logged in');
  }
});

router.get('/diagnoses', authorizeToken, async (req, res) => {
  if (req.user) {
    try {
      const userDiagnoses = await Diagnosis.find({ userId: req.user.id });
      res.send(userDiagnoses);
    } catch (err) {
      res.sendStatus(500);
    }
  } else {
    res.status(401).send('You are not logged in');
  }
});

router.get('/appointments', authorizeToken, async (req, res) => {
  if (req.user) {
    try {
      const userAppointments = await Appointment.find({ userId: req.user.id });
      res.send(userAppointments);
    } catch (err) {
      res.sendStatus(500);
    }
  } else {
    res.status(401).send('You are not logged in');
  }
});

router.post('/appointments/schedule', authorizeToken, async (req, res) => {
  res.send('Schedule Appointment');
});

module.exports = router;
