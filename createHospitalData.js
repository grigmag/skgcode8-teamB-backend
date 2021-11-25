const mongoose = require('mongoose');
const Hospital = require('./models/hospital');

const randomDates = () => {
  const start = new Date();
  const end = new Date(2021, 11, 31);
  let dates = [];
  for (let i = 0; i < 3; i++) {
    const date = new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
    dates[i] = date;
  }
  return dates;
};

createHospitalData = async () => {
  await mongoose.connection.dropCollection('hospitals');

  const testHospitalsAmount = 10;
  const testHospitals = await Hospital.find({ code: 'General Hospital' });
  if (testHospitals.length !== testHospitalsAmount) {
    for (let i = 0; i < testHospitalsAmount; i++) {
      await Hospital.create({
        code: 'General Hospital',
        name: `Hospital ${i}`,
        departments: [
          {
            name: 'Cardiology',
            doctors: ['Kaila Rimmer', 'Jayla Lyndon', 'Willie Gibb'],
          },
          {
            name: 'Neurology',
            doctors: ['Kelli Dudley', 'Katey Monday', 'Rodolph Mottershead'],
          },
          {
            name: 'Orthopaedics',
            doctors: ['Andi Colbert', 'Callahan Lindsay', 'Val Rickard'],
          },
        ],
        phoneNumber: '0900696969',
        address: 'Tsimiski',
      });
    }
  }
  const hospitals = await Hospital.find();
};

module.exports = createHospitalData;
