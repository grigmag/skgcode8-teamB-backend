const Doctor = require('../models/doctor');
const { specialties } = require('./dataUtils');
const { randomArrayElement, randomPhoneNumber } = require('./randomUtils');

async function createDoctors(testDoctorsAmount = 5, hospitalIds = []) {
  const testDoctors = await Doctor.find({ firstName: 'Test' });
  if (testDoctors.length !== testDoctorsAmount) {
    for (const testDoctor of testDoctors) {
      await Doctor.findByIdAndDelete(testDoctor.id);
    }

    for (let i = 0; i < testDoctorsAmount; i++) {
      await Doctor.create({
        firstName: 'Test',
        lastName: 'Doctor ' + i,
        phoneNumber: randomPhoneNumber(),
        address: 'Egnatias ' + (i + 1),
        specialty: randomArrayElement(specialties),
        hospitalId: hospitalIds.length ? randomArrayElement(hospitalIds) : null,
      });
    }
  }
}

module.exports = createDoctors;
