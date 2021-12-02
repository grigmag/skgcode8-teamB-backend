const User = require('../models/user');
const Doctor = require('../models/doctor');

const createUsers = async (testUsersAmount = 10) => {
  const testUsers = await User.find({ firstName: 'Test' });
  if (testUsers.length !== testUsersAmount) {
    for (const testUser of testUsers) {
      await User.findByIdAndDelete(testUser.id);
    }
    const doctors = await Doctor.find();

    for (let i = 0; i < testUsersAmount; i++) {
      await User.create({
        healthIdNumber: 100 + i,
        password: 'asdfasdf',
        firstName: 'Test',
        lastName: 'User' + i,
        birthDate: Date.now(),
        email: `testuser${i}@test.com`,
        phoneNumber: '+30697123456' + i,
        bloodType: 'A-',
        familyDoctorId: doctors[i], //change to fetched id
      });
    }
  }
};

module.exports = createUsers;
