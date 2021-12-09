const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: [true, 'user Id is required'],
  },
  doctorId: {
    type: Schema.Types.ObjectId,
    required: [true, 'doctor Id is required'],
  },
  date: {type: Date,  required: [true, 'date is required'],},
  hospitalId: Schema.Types.ObjectId,
  department: String,
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
