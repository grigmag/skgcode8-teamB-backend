const Diagnosis = require('../models/diagnosis');
const { randomArrayElement } = require('./randomUtils');

const createDiagnoses = async (amount = 10, userIds = [], doctorIds = []) => {
  const oldDiagnoses = await Diagnosis.find();
  if (oldDiagnoses.length !== amount) {
    for (const diagnosis of oldDiagnoses) {
      Diagnosis.findByIdAndDelete(diagnosis.id);
    }

    for (let i = 0; i < amount; i++) {
      await Diagnosis.create({
        userId: userIds.length && randomArrayElement(userIds),
        doctorId: doctorIds.length && randomArrayElement(doctorIds),
        date: Date.now(),
        examination: 'Test Diagnosis Examination',
        results: 'Test Diagnosis Results',
        diagnosis: 'Test Diagnosis ' + i,
      });
    }
  }
};

module.exports = createDiagnoses;
