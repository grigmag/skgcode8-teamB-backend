const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hospitalSchema = new Schema({
  name: String,
  departments: [{ name: String, doctorIds: [Schema.Types.ObjectId] }],
  city: String,
  address: String,
  phoneNumber: String,
});

const Hospital = mongoose.model('Hospital', hospitalSchema);

module.exports = Hospital;
