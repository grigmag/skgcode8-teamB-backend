const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const diagnosisSchema = new Schema({
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
  examination: {
    type: String,
    required: [true, 'examination is required'],
  },
  results: {
    type: String,
    required: [true, 'results are required'],
  },
  diagnosis: {
    type: String,
    required: [true, 'diagnosis is required'],
  },
});

const Diagnosis = mongoose.model('Diagnosis', diagnosisSchema);

module.exports = Diagnosis;
