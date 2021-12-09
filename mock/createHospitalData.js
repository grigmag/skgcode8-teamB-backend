const Hospital = require('../models/hospital');
const { randomPhoneNumber } = require('./randomUtils');
const { departments } = require('./dataUtils');

const createHospitalData = async (amount = 10) => {
  for (let i = 0; i < amount; i++) {
    await Hospital.create({
      name: `Hospital ${i}`,
      departments: departments,
      phoneNumber: randomPhoneNumber(),
      address: `Tsimiski ${i + 1}`,
      city: 'Thessaloniki',
    });
  }
};

module.exports = createHospitalData;
