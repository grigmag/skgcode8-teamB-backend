const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// mongoose.Schema.ObjectId
// mongoose.SchemaTypes.ObjectId
// mongoose.Types.ObjectId

const prescriptionSchema = new Schema({
  userId: mongoose.SchemaTypes.ObjectId,
  title: String,
  description: String,
  date: Date,
  code: String,
});

const Prescription = mongoose.model('Prescription', prescriptionSchema);

module.exports = Prescription;
