const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const prescriptionSchema = new Schema({
  userId: Schema.Types.ObjectId,
  doctorId: Schema.Types.ObjectId,
  title: String,
  description: String,
  drugCode: String,
  date: Date,
});

const Prescription = mongoose.model('Prescription', prescriptionSchema);

module.exports = Prescription;
