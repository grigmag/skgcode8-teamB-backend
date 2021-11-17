const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  healthIdNumber: Number,
  password: String,
  firstName: String,
  lastName: String,
  birthDate: Date,
  email: String,
  phoneNumber: String,
  bloodType: String,
  familyDoctorId: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
