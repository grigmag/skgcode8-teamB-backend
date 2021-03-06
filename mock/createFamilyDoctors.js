const Doctor = require('../models/doctor');

const { familyDoctorSpecialty } = require('../utils/dataUtils');
const { randomMobileNumber } = require('../utils/randomUtils');

const createFamilyDoctors = async (amount = 3) => {
  for (let i = 0; i < amount; i++) {
    await Doctor.create({
      firstName: 'Test',
      lastName: 'FamilyDoctor ' + i,
      phoneNumber: randomMobileNumber(),
      address: 'Test Address ' + (i + 1),
      specialty: familyDoctorSpecialty,
    });
  }
};

module.exports = createFamilyDoctors;
