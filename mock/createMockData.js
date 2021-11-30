const mongoose = require('mongoose');
const User = require('../models/user');
const Prescription = require('../models/prescription');
const Appointment = require('../models/appointment');
const Diagnosis = require('../models/diagnosis');
const Hospital = require('../models/hospital');
const Doctor = require('../models/doctor');

const { createUsers } = require('./createUsers');

const createMockData = async () => {
  // await mongoose.connection.dropCollection('users');
  await mongoose.connection.dropCollection('prescriptions');
  await mongoose.connection.dropCollection('appointments');
  await mongoose.connection.dropCollection('diagnoses');
  await mongoose.connection.dropCollection('doctors');

  await createUsers();

  const users = await User.find();

  

  for (let i = 0; i < users.length; i++) {
    for (let j = 0; j < 3; j++) {
      await Prescription.create({
        userId: users[i].id,
        title: 'Prescription Title ' + j + 1,
        description: 'Prescription Description ' + j + 1,
        date: Date.now(),
        code: j + 11,
      });

      await Appointment.create({
        userId: users[i].id,
        date: Date.now(),
        description: 'Appointment Description ' + j + 1,
        completed: true,
      });

      await Diagnosis.create({
        userId: users[i].id,
        date: Date.now(),
        result: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      });
    }
  }

  await createDoctors();

  // const prescriptions = await Prescription.find();
  // const appointments = await Appointment.find();
  // const diagnoses = await Diagnosis.find();
  // const doctors = await Doctor.find();

  // console.log('prescriptions:', prescriptions);
  // console.log('appointments:', appointments);
  // console.log('Diagnoses:', diagnoses);
  // console.log('Doctors: ', doctors);
  console.log('users:', users);
};

module.exports = createMockData;
