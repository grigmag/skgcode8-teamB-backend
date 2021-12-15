const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'first name is required'],
  },
  lastName: {
    type: String,
    required: [true, 'last name is required'],
  },
  phoneNumber: {
    type: String,
    required: [true, 'phone number is required'],
  },
  address: {
    type: String,
    required: [true, 'address is required'],
  },
  specialty: {
    type: String,
    required: [true, 'specialty is required'],
  },
  hospital: {
    id: Schema.Types.ObjectId,
    name: String,
  },
  department: String,
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
