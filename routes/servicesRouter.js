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
  roundDateToHalfHour,
  createTimeSlotsArray,
  subtractAppointmentsFromSlots,
} = require('../utils/dateUtils');
const { randomArrayElement } = require('../utils/randomUtils');

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

router.get('/appointments/available', async (req, res, next) => {
  try {
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
  } catch (err) {
    next(err);
  }
});

router.post('/appointments', async (req, res, next) => {
  try {
    const { date, hospitalId, department } = req.body;

    const roundedDate = roundDateToHalfHour(moment(date));

    const departmentDoctors = await Doctor.find({
      hospitalId,
      department,
    });

    // console.log('departmentDoctors ', departmentDoctors);

    const bookedAppointments = await Appointment.find(
      {
        hospitalId,
        department,
        date: {
          $gte: moment(roundedDate).subtract(1, 'minutes').format(),
          $lt: moment(roundedDate).add(1, 'minutes').format(),
        },
      },
      'date doctorId'
    );

    // console.log('bookedAppointments ', bookedAppointments);

    const availableDoctors = departmentDoctors.filter(
      (doctor) =>
        !bookedAppointments.some((appointment) =>
          appointment.doctorId.equals(doctor.id)
        )
    );

    // console.log('availableDoctors ', availableDoctors);

    if (availableDoctors.length) {
      const appointedDoctor = randomArrayElement(availableDoctors);

      // console.log('appointedDoctor ', appointedDoctor);

      await Appointment.create({
        userId: req.user.id,
        doctorId: appointedDoctor.id,
        date: roundedDate.format(),
        hospitalId: hospitalId,
        department: department,
      });

      res
        .status(200)
        .send({ message: 'Appointment scheduled', doctor: appointedDoctor });
    } else {
      res.status(400).send({ message: 'No doctors available at that time' });
    }
  } catch (err) {
    next(err);
  }
});

router.use(logError, handleError);

module.exports = router;
