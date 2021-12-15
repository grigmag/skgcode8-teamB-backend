const User = require('../models/user');
const { randomDate, randomIntArray } = require('../utils/randomUtils');
const { randomDoctorNameObj } = require('../utils/modelRandomUtils');

const createUsers = async (testUsersAmount = 10, familyDoctorIds = []) => {
  for (let i = 0; i < testUsersAmount; i++) {
    await User.create({
      healthIdNumber: randomIntArray(11, 0, 9).join(''),
      password: 'asdfasdf',
      firstName: 'Test',
      lastName: 'User' + i,
      birthDate: randomDate('1960-01-01', '2002-12-31'),
      email: `testuser${i}@test.com`,
      phoneNumber: '+30697123456' + i,
      bloodType: 'A-',
      familyDoctor:
        familyDoctorIds.length && (await randomDoctorNameObj(familyDoctorIds)),
    });
  }
};

module.exports = createUsers;
