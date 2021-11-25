const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hospitalSchema = new Schema({
  code: String,
  name: String,
  departments: Object,
  departmentsTest: [
    { name: String, doctorIds: [mongoose.SchemaTypes.ObjectId] },
  ],
  address: String,
  phoneNumber: String,
});

const Hospital = mongoose.model('Hospital', hospitalSchema);

module.exports = Hospital;
