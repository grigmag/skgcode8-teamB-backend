const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  userId: mongoose.SchemaTypes.ObjectId,
  doctorId: mongoose.SchemaTypes.ObjectId,
  date: Date,
  hospital: String,
  department: String,
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
