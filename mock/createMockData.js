const User = require('../models/user');
const Prescription = require('../models/prescription');
const Appointment = require('../models/appointment');
const Diagnosis = require('../models/diagnosis');
const Doctor = require('../models/doctor');
const Hospital = require('../models/hospital');

const createFamilyDoctors = require('./createFamilyDoctors');
const createUsers = require('./createUsers');
const createHospitalData = require('./createHospitalData');
const createDoctors = require('./createDoctors');
const createPrescriptions = require('./createPrescriptions');
const createDiagnoses = require('./createDiagnoses');
const createAppointments = require('./createAppointments');

const { familyDoctorSpecialty } = require('./dataUtils');

const createMockData = async () => {
  await createFamilyDoctors(3);

  const familyDoctors = await Doctor.find({ specialty: familyDoctorSpecialty });
  // console.log(familyDoctors);

  await createUsers(
    10,
    familyDoctors.map((doctor) => doctor.id)
  );

  const users = await User.find();
  // console.log(users);

  await createHospitalData(5);

  const hospitals = await Hospital.find();
  // console.log(hospitals);

  await createDoctors(
    10,
    hospitals.map((hospital) => hospital.id)
  );

  const allDoctors = await Doctor.find();
  // console.log(allDoctors);

  await createPrescriptions(
    100,
    users.map((user) => user.id),
    allDoctors.map((doc) => doc.id)
  );

  const prescriptions = await Prescription.find();
  // console.log(prescriptions);

  await createDiagnoses(
    100,
    users.map((user) => user.id),
    allDoctors.map((doc) => doc.id)
  );

  const diagnoses = await Diagnosis.find();
  // console.log(diagnoses);

  await createAppointments(
    1000,
    users.map((user) => user.id),
    allDoctors
  );

  const appointments = await Appointment.find();
  // console.log(appointments);

  // console.log('prescriptions:', prescriptions);
  // console.log('appointments:', appointments);
  // console.log('Diagnoses:', diagnoses);
  // console.log('Doctors: ', doctors);

  // console.log('users:', users);
};

module.exports = createMockData;
