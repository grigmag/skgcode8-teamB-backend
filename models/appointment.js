const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  userId: Schema.Types.ObjectId,
  doctorId: Schema.Types.ObjectId,
  date: Date,
  hospitalId: Schema.Types.ObjectId,
  department: String,
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
