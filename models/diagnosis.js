const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const diagnosisSchema = new Schema({
  userId: Schema.Types.ObjectId,
  doctorId: Schema.Types.ObjectId,
  date: Date,
  examination: String,
  results: String,
  diagnosis: String,
});

const Diagnosis = mongoose.model('Diagnosis', diagnosisSchema);

module.exports = Diagnosis;
