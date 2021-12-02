const Hospital = require('../models/hospital');
const { randomPhoneNumber } = require('./randomUtils');
const { departments } = require('./dataUtils');

const createHospitalData = async (amount = 10) => {
  const hospitals = await Hospital.find();
  if (hospitals.length !== amount) {
    for (const hospital of hospitals) {
      Hospital.findByIdAndDelete(hospital.id);
    }

    for (let i = 0; i < amount; i++) {
      await Hospital.create({
        name: `Hospital ${i}`,
        departments: departments,
        phoneNumber: randomPhoneNumber(),
        address: `Tsimiski ${i + 1}`,
        city: 'Thessaloniki',
      });
    }
  }
};

module.exports = createHospitalData;
