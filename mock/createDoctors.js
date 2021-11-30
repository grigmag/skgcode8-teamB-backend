const Hospital = require('../models/hospital');
const Doctor = require('../models/doctor');

const testDoctorsAmount = 5;
const testDoctors = await Doctor.find({ firstName: 'Test' });
if (testDoctors.length !== testDoctorsAmount) {
  const getHospitalId = async (index) => {
    const hospital = await Hospital.findOne({
      name: `Hospital ${index}`,
    });
    return hospital.id;
  };

  getHospitalId(1);

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
