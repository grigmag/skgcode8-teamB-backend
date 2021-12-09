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
  const { hospitalId, department, date } = req.body;

  const startDate = moment(date).startOf('day');
  const endDate = moment(startDate).add(1, 'days');

  const bookedAppointmentTimes = await Appointment.find(
    {
      hospitalId,
      department,
      date: {
        $gte: startDate.format('YYYY-MM-DD'),
        $lt: endDate.format('YYYY-MM-DD'),
      },
    },
    'date'
  );

  console.log('Booked Appointments', bookedAppointmentTimes);

  const createTimeSlotsArray = (date) => {
    // assuming working hours of  9 - 17
    const arr = [];
    const startTime = moment(date).startOf('day').hours(9);
    const endTime = moment(startTime).hours(17);

    const tempTime = moment(startTime);

    while (tempTime < endTime) {
      arr.push(tempTime);
      tempTime.add(30, 'minutes');
    }

    return arr;
  };

  const timeSlots = createTimeSlotsArray();

  const availableHours = timeSlots
    .filter(
      (slot) =>
        !bookedAppointmentTimes.some((time) => time.isSame(slot, 'minute'))
    )
    .map((time) => time.format());

  res.send(availableHours);

  // should be ok!! needs testing

  // let hours = [];
  // for (let i = 0; i < 24; i++) {
  //   for (let j = 0; j <= 1; j++) {
  //     hours.push(
  //       moment(date)
  //         .hour(i)
  //         .minutes(0 + j * 30)
  //     );
  //   }
  // }
  // console.log('Before ', hours.length, hours);

  // hours.forEach((hour, index) => {
  //   if (finalAppointmentsDates.includes(hour)) {
  //     hours.splice(index, 1);
  //   }
  // });
  // console.log('After', hours.length, hours);

  // res.send(finalAppointmentsDates);
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
