const express = require('express');
const router = express.Router();

const authorizeToken = require('../middlewares/tokenAuth');
const { logError, handleError } = require('../middlewares/errorHandling');

const Prescription = require('../models/prescription');
const Appointment = require('../models/appointment');
const Diagnosis = require('../models/diagnosis');

router.use(authorizeToken);

router.get('/prescriptions', async (req, res, next) => {
  try {
    const userPrescriptions = await Prescription.find({
      userId: req.user.id,
    });
    res.send(userPrescriptions);
  } catch (err) {
    next(err);
  }
});

router.get('/diagnoses', async (req, res, next) => {
  try {
    const userDiagnoses = await Diagnosis.find({ userId: req.user.id });
    res.send(userDiagnoses);
  } catch (err) {
    next(err);
  }
});

router.get('/appointments', async (req, res, next) => {
  try {
    const userAppointments = await Appointment.find({ userId: req.user.id });
    res.send(userAppointments);
  } catch (err) {
    next(err);
  }
});

router.get('/appointments/available', async (req, res) => {
  const requestHospitalId = req.body.hospital;

  const getAvailableAppointments = async (requestHospitalId) => {
    const bookedAppointments = await Appointment.find({
      hospitalId: requestHospitalId,
    });

    if (bookedAppointments) {
      const bookedAppointmentsData = bookedAppointments.map((appointment) => {
        return {
          date: appointment.date,
          hospital: appointment.hospitalId.toString(),
        };
      });

      const availableAppointments = bookedAppointmentsData.map(
        (appointment) => {
          if (appointment.hospital === requestHospitalId) {
            return appointment.date;
          }
        },
        requestHospitalId
      );

      return availableAppointments;
    }
  };

  const finalAppointments = await getAvailableAppointments(requestHospitalId);
  res.send(finalAppointments);
});

router.post('/appointments/schedule', async (req, res) => {
  const { date, hospital } = req.body;
  if (date && hospital) {
    try {
      await Appointment.create({
        userId: req.user.id,
        date: date,
        description: 'Test Appointment Description ',
        completed: false,
        hospital: hospital,
      });
      res.status(200).send('Appointment scheduled');
    } catch (err) {
      res.send(err.message);
    }
  }
});

router.use(logError, handleError);

module.exports = router;
