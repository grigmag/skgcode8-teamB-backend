const mongoose = require('mongoose');
const User = require('./models/user');

const createMockData = async () => {
  await mongoose.connection.dropCollection('users');

  for (let i = 0; i < 10; i++) {
    await User.create({
      username: 'testUser' + i,
      password: 'asdfasdf',
      firstName: 'Test' + i,
      lastName: 'User',
      healthIdNumber: i,
      email: `testuser${i}@test.com`,
      phoneNumber: '+30697123456' + i,
      bloodType: 'A-',
    });
  }

  const users = await User.find();
  console.log('users:', users);
};

module.exports = createMockData;
