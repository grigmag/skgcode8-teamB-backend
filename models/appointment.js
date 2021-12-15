const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: [true, 'user Id is required'],
  },
  doctor: {
    id: Schema.Types.ObjectId,
    firstName: String,
    lastName: String,
  },
  date: { type: Date, required: [true, 'date is required'] },
  hospitalId: Schema.Types.ObjectId,
  department: String,
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
