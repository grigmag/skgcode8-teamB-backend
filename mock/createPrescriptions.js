const Prescription = require('../models/prescription');
const {
  randomArrayElement,
  randomIntArray,
  randomDate,
} = require('../utils/randomUtils');
const { randomDoctorNameObj } = require('../utils/modelRandomUtils');

const createPrescriptions = async (
  amount = 10,
  userIds = [],
  doctorIds = []
) => {
  for (let i = 0; i < amount; i++) {
    await Prescription.create({
      userId: userIds.length && randomArrayElement(userIds),
      doctor: doctorIds.length && (await randomDoctorNameObj(doctorIds)),
      title: 'Test Prescription ' + i,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      drugCode: randomIntArray(8, 0, 9).join(''),
      date: randomDate('2021-01-01'),
    });
  }
};

module.exports = createPrescriptions;
