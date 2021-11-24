const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const prescriptionSchema = new Schema({
  userId: mongoose.SchemaTypes.ObjectId,
  title: String,
  description: String,
  date: Date,
  code: String,
});

const Prescription = mongoose.model('Prescription', prescriptionSchema);

module.exports = Prescription;
