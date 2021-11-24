const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  userId: mongoose.SchemaTypes.ObjectId,
  date: Date,
  description: String,
  completed: Boolean,
  hospital: String,
  doctorId: String,
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
