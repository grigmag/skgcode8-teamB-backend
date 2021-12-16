const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  healthIdNumber: {
    type: String,
    required: [true, 'health id number is required'],
    unique: true,
    match: [/^\d{11}$/, 'healthIdNumber should contain 11 digits.'],
  },
  password: {
    type: String,
    required: [true, 'password is required'],
  },
  firstName: String,
  lastName: String,
  birthDate: Date,
  email: {
    type: String,
    required: [true, 'email is required'],
    lowercase: true,
  },
  phoneNumber: String,
  bloodType: String,
  familyDoctor: {
    id: Schema.Types.ObjectId,
    firstName: String,
    lastName: String,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
