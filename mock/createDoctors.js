const Hospital = require('../models/hospital');
const Doctor = require('../models/doctor');

async function createDoctors(testDoctorsAmount = 5) {
  const testDoctors = await Doctor.find({ firstName: 'Test' });
  if (testDoctors.length !== testDoctorsAmount) {
    for (const testDoctor of testDoctors) {
      await Doctor.findByIdAndDelete(testDoctor.id);
    }

    const getHospitalId = async (index) => {
      const hospital = await Hospital.findOne({
        name: `Hospital ${index}`,
      });
      console.log(hospital.id);
      return hospital.id;
    };

    for (let i = 0; i < testDoctorsAmount; i++) {
      await Doctor.create({
        firstName: 'Test',
        lastName: 'Doctor ' + i,
        phoneNumber: '+306986666666',
        address: 'Egnatias ' + (i + 1),
        specialty: 'Cardiology',
        hospitalId: await getHospitalId(i),
      });
    }
  }
}

module.exports = createDoctors;
