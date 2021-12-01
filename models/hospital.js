const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hospitalSchema = new Schema({
  name: String,
  departments: [String],
  city: String,
  address: String,
  phoneNumber: String,
});

const Hospital = mongoose.model('Hospital', hospitalSchema);

module.exports = Hospital;
