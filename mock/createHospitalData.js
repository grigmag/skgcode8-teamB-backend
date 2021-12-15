const Hospital = require('../models/hospital');
const { randomPhoneNumber } = require('../utils/randomUtils');
const { departments } = require('../utils/dataUtils');

const createHospitalData = async (amount = 10) => {
  for (let i = 0; i < amount; i++) {
    await Hospital.create({
      name: `Hospital ${i}`,
      departments: departments,
      phoneNumber: randomPhoneNumber(),
      address: `Tsimiski ${i + 1}`,
      city: 'Thessaloniki',
      email: `hospital${i}@testmail.com`,
    });
  }
};

module.exports = createHospitalData;
