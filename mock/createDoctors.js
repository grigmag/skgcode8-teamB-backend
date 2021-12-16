const Doctor = require('../models/doctor');
const Hospital = require('../models/hospital');
const { specialtiesAndDepartments } = require('../utils/dataUtils');
const { randomPhoneNumber, randomInt } = require('../utils/randomUtils');

async function createDoctors(hospitalIds = []) {
  for (const hospitalId of hospitalIds) {
    const hospital = await Hospital.findById(hospitalId);
    for (const element of specialtiesAndDepartments) {
      for (let i = 0; i < randomInt(1, 3); i++) {
        await Doctor.create({
          firstName: 'Test',
          lastName: 'Doctor ' + i,
          phoneNumber: randomPhoneNumber(),
          address: 'Egnatias ' + (i + 1),
          specialty: element.specialty,
          hospital: {
            id: hospital.id,
            name: hospital.name,
          },
          department: element.department,
        });
      }
    }
  }
}

module.exports = createDoctors;
