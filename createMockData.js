const mongoose = require('mongoose');
const User = require('./models/user');

const createMockData = async () => {
  await mongoose.connection.dropCollection('users');

  for (let i = 0; i < 10; i++) {
    await User.create({
      healthIdNumber: 100 + i,
      password: 'asdfasdf',
      firstName: 'Test' + i,
      lastName: 'User',
      birthDate: Date.now(),
      email: `testuser${i}@test.com`,
      phoneNumber: '+30697123456' + i,
      bloodType: 'A-',
      familyDoctorId: i + 526, //change to fetched id
    });
  }

  const users = await User.find();
  console.log('users:', users);
};

module.exports = createMockData;
