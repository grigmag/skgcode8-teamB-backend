const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hospitalSchema = new Schema({
  name: String,
  departments: [{ name: String, doctorIds: [mongoose.SchemaTypes.ObjectId] }],
  address: String,
  phoneNumber: String,
});

const Hospital = mongoose.model('Hospital', hospitalSchema);

module.exports = Hospital;
