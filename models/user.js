const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  healthIdNumber: {
    type: String,
    required: [true, 'health id number is required'],
    unique: true,
    maxlength: 11,
    minlength: 11,
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
  familyDoctorId: Schema.Types.ObjectId,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
