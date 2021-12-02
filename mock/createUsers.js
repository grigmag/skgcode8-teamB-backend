const User = require('../models/user');
const { randomArrayElement, randomDates } = require('./randomUtils');

const createUsers = async (testUsersAmount = 10, familyDoctorIds = []) => {
  const testUsers = await User.find({ firstName: 'Test' });
  if (testUsers.length !== testUsersAmount) {
    for (const testUser of testUsers) {
      await User.findByIdAndDelete(testUser.id);
    }

    for (let i = 0; i < testUsersAmount; i++) {
      await User.create({
        healthIdNumber: 100 + i,
        password: 'asdfasdf',
        firstName: 'Test',
        lastName: 'User' + i,
        birthDate: randomDates(1, 'Users', '1960-01-01', '2002-12-31'),
        email: `testuser${i}@test.com`,
        phoneNumber: '+30697123456' + i,
        bloodType: 'A-',
        familyDoctorId: familyDoctorIds.length
          ? randomArrayElement(familyDoctorIds)
          : null, // ?
      });
    }
  }
};

module.exports = createUsers;
