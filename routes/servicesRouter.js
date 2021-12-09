const express = require('express');
const router = express.Router();
const moment = require('moment');

const authorizeToken = require('../middlewares/tokenAuth');
const { logError, handleError } = require('../middlewares/errorHandling');

const Prescription = require('../models/prescription');
const Appointment = require('../models/appointment');
const Diagnosis = require('../models/diagnosis');
const Doctor = require('../models/doctor');

const {
  createTimeSlotsArray,
  subtractAppointmentsFromSlots,
} = require('../utils/dateUtils');

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
  const { hospitalId, department, date } = req.body;

  const startDate = moment(date).startOf('day');
  const endDate = moment(startDate).add(1, 'days');

  const departmentDoctors = await Doctor.find(
    {
      hospitalId,
      department,
    },
    'id'
  );

  // console.log('doctors', departmentDoctors);

  const bookedAppointments = await Appointment.find(
    {
      hospitalId,
      department,
      date: {
        $gte: startDate.format('YYYY-MM-DD'),
        $lt: endDate.format('YYYY-MM-DD'),
      },
    },
    'date doctorId'
  );

  // console.log('Booked Appointments', bookedAppointments);

  const bookedAppointmentsDates = bookedAppointments.map((appointment) =>
    moment(appointment.date)
  );

  // console.log('Booked Appointment Dates', bookedAppointmentsDates);
  const timeSlots = createTimeSlotsArray(date, 9, 17);

  const availableHours = timeSlots
    .filter((timeSlot) => {
      const appointmentsAtTimeSlot = bookedAppointmentsDates.filter(
        (appointmentDate) => appointmentDate.isSame(timeSlot, 'minute')
      );
      return appointmentsAtTimeSlot.length < departmentDoctors.length;
    })
    .map((time) => time.format());

  // console.log('availableHours', availableHours);

  res.send(availableHours);
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
