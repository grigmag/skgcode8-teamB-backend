const Diagnosis = require('../models/diagnosis');
const { randomArrayElement, randomDate } = require('../utils/randomUtils');
const { randomDoctorNameObj } = require('../utils/modelRandomUtils');

const createDiagnoses = async (amount = 10, userIds = [], doctorIds = []) => {
  for (let i = 0; i < amount; i++) {
    await Diagnosis.create({
      userId: userIds.length && randomArrayElement(userIds),
      doctor: doctorIds.length && (await randomDoctorNameObj(doctorIds)),
      date: randomDate('2021-01-01', '2021-12-31'),
      examination: 'Test Diagnosis Examination',
      results:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      diagnosis: 'Test Diagnosis ' + i,
    });
  }
};

module.exports = createDiagnoses;
