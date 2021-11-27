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

  const testDoctorsAmount = 5;
  const testDoctors = await Doctor.find({ firstName: 'Test' });
  if (testDoctors.length !== testDoctorsAmount) {
    const getHospitalId = async (index) => {
      const hospital = await Hospital.findOne({
        name: `Hospital ${index}`,
      });
      return hospital.id;
    };

    getHospitalId(1);

    for (let i = 0; i < testDoctorsAmount; i++) {
      await Doctor.create({
        firstName: 'Test',
        lastName: 'Doctor ' + i,
        phoneNumber: '+306986666666',
        address: 'Egnatias ' + (i + 1),
        specialty: 'Cardiology',
        hospitalId: await getHospitalId(i),
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
  console.log('users:', users);
};

module.exports = createMockData;
