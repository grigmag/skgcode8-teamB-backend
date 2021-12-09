const Doctor = require('../models/doctor');
const { specialtiesAndDepartments } = require('../utils/dataUtils');
const {
  randomArrayElement,
  randomPhoneNumber,
  randomInt,
} = require('../utils/randomUtils');

async function createDoctors(hospitalIds = []) {
  for (const hospitalId of hospitalIds) {
    for (const element of specialtiesAndDepartments) {
      for (let i = 0; i < randomInt(2, 5); i++) {
        await Doctor.create({
          firstName: 'Test',
          lastName: 'Doctor ' + i,
          phoneNumber: randomPhoneNumber(),
          address: 'Egnatias ' + (i + 1),
          specialty: element.specialty,
          hospitalId: hospitalId,
          department: element.department,
        });
      }
    }
  }
}

module.exports = createDoctors;
