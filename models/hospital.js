const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hospitalSchema = new Schema({
  code: String,
  name: String,
  departments: Object,
  address: String,
  phoneNumber: String,
});

const Hospital = mongoose.model('Hospital', hospitalSchema);

module.exports = Hospital;
