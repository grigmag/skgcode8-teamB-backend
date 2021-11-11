const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  healthIdNumber: Number,
  birthDate: Date,
  email: String,
  phoneNumber: String,
  bloodType: String,
  familyDoctorId: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
