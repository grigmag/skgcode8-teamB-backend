const express = require('express');
const router = express.Router();
const moment = require('moment');

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
  const requestDate = req.body.date;

  const getBookedAppointmentsDates = async (requestHospitalId) => {
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

      const bookedAppointmentsDates = bookedAppointmentsData.map(
        (appointment) => {
          if (appointment.hospital === requestHospitalId) {
            return appointment.date;
          }
        },
        requestHospitalId
      );

      return bookedAppointmentsDates;
    }
  };

  const finalAppointmentsDates = await getBookedAppointmentsDates(
    requestHospitalId
  );

  let hours = [];
  for (let i = 0; i < 24; i++) {
    for (let j = 0; j <= 1; j++) {
      hours.push(
        moment(requestDate)
          .hour(i)
          .minutes(0 + j * 30)
      );
    }
  }
  console.log('Before ', hours.length, hours);

  hours.forEach((hour, index) => {
    if (finalAppointmentsDates.includes(hour)) {
      delete hours[index];
    }
  });
  console.log('After', hours.length, hours);

  res.send(finalAppointmentsDates);
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
