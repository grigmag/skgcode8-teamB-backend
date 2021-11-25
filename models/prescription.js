const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const prescriptionSchema = new Schema({
  userId: mongoose.SchemaTypes.ObjectId,
  doctorId: mongoose.SchemaTypes.ObjectId,
  title: String,
  description: String,
  drugCode: String,
  date: Date,
});

const Prescription = mongoose.model('Prescription', prescriptionSchema);

module.exports = Prescription;
