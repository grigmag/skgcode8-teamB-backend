const express = require('express');
const router = express.Router();
const moment = require('moment');

const authorizeToken = require('../middlewares/tokenAuth');

const Prescription = require('../models/prescription');
const Appointment = require('../models/appointment');
const Diagnosis = require('../models/diagnosis');
const Doctor = require('../models/doctor');
const Hospital = require('../models/hospital');

const {
  roundDateToHalfHour,
  createTimeSlotsArray,
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
    const { hospitalId, department, date } = req.query;

    if (
      typeof hospitalId !== 'string' ||
      typeof department !== 'string' ||
      typeof date !== 'string'
    ) {
      return res.status(400).send({
        message:
          'Query parameters hospitalId, department and date are required',
      });
    } else if (!date.match(/^\d{4}-\d{2}-\d{2}$/) || !moment(date).isValid()) {
      return res.status(400).send({
        message:
          'Date is invalid. Date should be supplied in YYYY-MM-DD format',
      });
    }

    const startDate = moment(date).startOf('day');
    const endDate = moment(startDate).add(1, 'days');

    if (moment().isSameOrAfter(startDate)) {
      return res.status(400).send({
        message: `Pick a date beginning from tomorrow.`,
      });
    }

    const departmentDoctors = await Doctor.find(
      {
        'hospital.id': hospitalId,
        department,
      },
      'id'
    );

    if (!departmentDoctors.length) {
      return res.status(400).send({
        message: 'Invalid hospitalId or department.',
      });
    }

    // console.log('doctors', departmentDoctors);

    const bookedAppointments = await Appointment.find(
      {
        'hospital.id': hospitalId,
        department,
        date: {
          $gte: startDate.format('YYYY-MM-DD'),
          $lt: endDate.format('YYYY-MM-DD'),
        },
      },
      'date'
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

    if (
      typeof date !== 'string' ||
      typeof hospitalId !== 'string' ||
      typeof department !== 'string'
    ) {
      return res.status(400).send({
        message: 'Properties hospitalId, department and date are required',
      });
    } else if (!moment(date).isValid()) {
      return res.status(400).send({
        message: 'Date is invalid.',
      });
    }

    const hospital = await Hospital.findById(hospitalId);

    if (!hospital) {
      return res.status(400).send({
        message: 'Invalid hospitalId',
      });
    }

    const roundedDate = roundDateToHalfHour(moment(date));

    if (moment().isSameOrAfter(moment(roundedDate).startOf('day'))) {
      return res.status(400).send({
        message: `Pick a date beginning from tomorrow.`,
      });
    }

    if (roundedDate.hour() >= 17 || roundedDate.hour() < 9) {
      return res.status(400).send({
        message:
          'Appointment time should be within working hours of 09:00 - 17:00.',
      });
    }

    const departmentDoctors = await Doctor.find({
      'hospital.id': hospitalId,
      department,
    });

    if (!departmentDoctors.length) {
      return res.status(400).send({
        message: 'Invalid hospitalId or department',
      });
    }

    // console.log('departmentDoctors ', departmentDoctors);

    const bookedAppointments = await Appointment.find(
      {
        'hospital.id': hospitalId,
        department,
        date: {
          $gte: moment(roundedDate).subtract(1, 'minutes').format(),
          $lt: moment(roundedDate).add(1, 'minutes').format(),
        },
      },
      'date doctor'
    );

    // console.log('bookedAppointments ', bookedAppointments);

    const availableDoctors = departmentDoctors.filter(
      (doctor) =>
        !bookedAppointments.some((appointment) =>
          appointment.doctor.id.equals(doctor.id)
        )
    );

    // console.log('availableDoctors ', availableDoctors);

    if (availableDoctors.length) {
      const appointedDoctor = randomArrayElement(availableDoctors);

      // console.log('appointedDoctor ', appointedDoctor);

      const appointment = await Appointment.create({
        userId: req.user.id,
        doctor: {
          id: appointedDoctor.id,
          firstName: appointedDoctor.firstName,
          lastName: appointedDoctor.lastName,
        },
        date: roundedDate.format(),
        hospital: {
          id: hospital.id,
          name: hospital.name,
        },
        department: department,
      });

      res
        .status(200)
        .send({ message: 'Appointment scheduled', data: appointment });
    } else {
      res.status(400).send({
        message:
          'No doctors available at that time. Choose another date or time.',
      });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
