const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
  firstName: String,
  lastName: String,
  phoneNumber: String,
  address: String,
  specialty: String,
  hospitalId: Schema.Types.ObjectId,
  department: String,
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
