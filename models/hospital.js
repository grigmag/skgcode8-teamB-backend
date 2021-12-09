const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hospitalSchema = new Schema({
  name: {
    type: String,
    required: [true, 'hospital name is required'],
  },
  departments: {
    type: [String],
    required: [true, 'departments are required'],
  },
  city: {
    type: String,
    required: [true, 'city is required'],
  },
  address: {
    type: String,
    required: [true, 'address is required'],
  },
  phoneNumber: {
    type: String,
    required: [true, 'phone number is required'],
  },
});

const Hospital = mongoose.model('Hospital', hospitalSchema);

module.exports = Hospital;
