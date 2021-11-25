const mongoose = require('mongoose');
const User = require('./models/user');
const Prescription = require('./models/prescription');
const Appointment = require('./models/appointment');
const Diagnosis = require('./models/diagnosis');
const Hospital = require('./models/hospital');
const Doctor = require('./models/doctor');

const createMockData = async () => {
  // await mongoose.connection.dropCollection('users');
  await mongoose.connection.dropCollection('prescriptions');
  await mongoose.connection.dropCollection('appointments');
  await mongoose.connection.dropCollection('diagnoses');
  await mongoose.connection.dropCollection('doctors');

  const testUsersAmount = 10;
  const testUsers = await User.find({ firstName: 'Test' });
  if (testUsers.length !== testUsersAmount) {
    for (let i = 0; i < testUsersAmount; i++) {
      await User.create({
        healthIdNumber: 100 + i,
        password: 'asdfasdf',
        firstName: 'Test',
        lastName: 'User' + i,
        birthDate: Date.now(),
        email: `testuser${i}@test.com`,
        phoneNumber: '+30697123456' + i,
        bloodType: 'A-',
        familyDoctorId: i + 526, //change to fetched id
      });
    }
  }

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
      const hospitalId = await Hospital.findOne({
        name: `Hospital ${index}`,
      });
      console.log('hospital id: ', hospitalId.id);
      return hospitalId.id;
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

  const prescriptions = await Prescription.find();
  const appointments = await Appointment.find();
  const diagnoses = await Diagnosis.find();
  const doctors = await Doctor.find();

  console.log('users:', users);
  // console.log('prescriptions:', prescriptions);
  // console.log('appointments:', appointments);
  // console.log('Diagnoses:', diagnoses);
  // console.log('Doctors: ', doctors);
};

module.exports = createMockData;
