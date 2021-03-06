const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const prescriptionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: [true, 'user id is required'],
  },
  doctor: {
    id: Schema.Types.ObjectId,
    firstName: String,
    lastName: String,
  },
  title: {
    type: String,
    required: [true, 'title is required'],
  },
  description: {
    type: String,
    required: [true, 'description is required'],
  },
  drugCode: {
    type: String,
    required: [true, 'drug code is required'],
  },
  date: {
    type: Date,
    required: [true, 'date is required'],
  },
});

const Prescription = mongoose.model('Prescription', prescriptionSchema);

module.exports = Prescription;
