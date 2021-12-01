const mongoose = require('mongoose');
const User = require('../models/user');
const Prescription = require('../models/prescription');
const Appointment = require('../models/appointment');
const Diagnosis = require('../models/diagnosis');
const Doctor = require('../models/doctor');
const Hospital = require('../models/hospital');

const createUsers = require('./createUsers');
const createDoctors = require('./createDoctors');

const createMockData = async () => {
  // await mongoose.connection.dropCollection('users');
  await mongoose.connection.dropCollection('prescriptions');
  await mongoose.connection.dropCollection('appointments');
  await mongoose.connection.dropCollection('diagnoses');
  await mongoose.connection.dropCollection('doctors');

  await createDoctors();
  await createUsers();

  const users = await User.find();

  const doctors = await Doctor.find();
  const hospitals = await Hospital.find();

  for (let i = 0; i < users.length; i++) {
    for (let j = 0; j < 3; j++) {
      await Prescription.create({
        userId: users[i].id,
        doctorId: doctors[i],
        title: 'Prescription Title ' + j + 1,
        description: 'Prescription Description ' + j + 1,
        date: Date.now(),
        drugCode: j + 11,
      });

      await Appointment.create({
        userId: users[i].id,
        date: Date.now(),
        doctorId: doctors[i],
        hospital: hospitals[i].id,
        department: 'Cardiology',
      });

      await Diagnosis.create({
        userId: users[i],
        doctorId: doctors[i],
        date: Date.now(),
        results: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        examination: 'Examination Title',
        diagnosis: 'Diagnosis',
      });
    }
  }

  // const prescriptions = await Prescription.find();
  // const appointments = await Appointment.find();
  // const diagnoses = await Diagnosis.find();
  // const doctors = await Doctor.find();

  // console.log('prescriptions:', prescriptions);
  // console.log('appointments:', appointments);
  // console.log('Diagnoses:', diagnoses);
  // console.log('Doctors: ', doctors);

  // console.log('users:', users);
};

module.exports = createMockData;
