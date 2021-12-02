const Doctor = require('../models/doctor');

const { familyDoctorSpecialty } = require('./dataUtils');
const { randomMobileNumber } = require('./randomUtils');

const createFamilyDoctors = async (amount = 3) => {
  const testDoctors = await Doctor.find({
    firstName: 'Test',
    specialty: familyDoctorSpecialty,
  });
  if (testDoctors.length !== amount) {
    for (const testDoctor of testDoctors) {
      await Doctor.findByIdAndDelete(testDoctor.id);
    }

    for (let i = 0; i < amount; i++) {
      await Doctor.create({
        firstName: 'Test',
        lastName: 'FamilyDoctor ' + i,
        phoneNumber: randomMobileNumber(),
        address: 'Test Address ' + (i + 1),
        specialty: familyDoctorSpecialty,
      });
    }
  }
};

module.exports = createFamilyDoctors;
