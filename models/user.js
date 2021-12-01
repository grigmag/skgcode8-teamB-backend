const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  healthIdNumber: { type: String, required: true },
  password: { type: String, required: true },
  firstName: String,
  lastName: String,
  birthDate: Date,
  email: { type: String, required: true, lowercase: true },
  phoneNumber: String,
  bloodType: String,
  familyDoctorId: Schema.Types.ObjectId,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
