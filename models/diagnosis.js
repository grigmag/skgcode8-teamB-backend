const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const diagnosisSchema = new Schema({
  userId: mongoose.SchemaTypes.ObjectId,
  date: Date,
  description: String,
  diagnosis: String,
});

const Diagnosis = mongoose.model('Diagnosis', diagnosisSchema);

module.exports = Diagnosis;
