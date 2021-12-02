const Prescription = require('../models/prescription');
const {
  randomArrayElement,
  randomIntArray,
  randomDates,
} = require('./randomUtils');

const createPrescriptions = async (
  amount = 10,
  userIds = [],
  doctorIds = []
) => {
  const oldPrescriptions = await Prescription.find();
  if (oldPrescriptions.length !== amount) {
    for (const prescription of oldPrescriptions) {
      Prescription.findByIdAndDelete(prescription.id);
    }

    for (let i = 0; i < amount; i++) {
      await Prescription.create({
        userId: userIds.length && randomArrayElement(userIds),
        doctorId: doctorIds.length && randomArrayElement(doctorIds),
        title: 'Test Prescription ' + i,
        description: 'Test Prescription Description',
        drugCode: randomIntArray(0, 9, 8).join(''),
        date: randomDates(1, 'Prescriptions', '2021-01-01'),
      });
    }
  }
};

module.exports = createPrescriptions;
