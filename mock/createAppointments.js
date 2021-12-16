const Appointment = require('../models/appointment');
const Hospital = require('../models/hospital');
const { specialtyToDepartment } = require('../utils/dataUtils');
const {
  randomArrayElement,
  randomAppointmentDate,
} = require('../utils/randomUtils');

const createAppointments = async (amount = 10, userIds = [], doctors = []) => {
  for (let i = 0; i < amount; i++) {
    const doctor = randomArrayElement(doctors);
    const hospital = await Hospital.findById(doctor.hospital.id);

    await Appointment.create({
      userId: userIds.length && randomArrayElement(userIds),
      doctor: doctor && {
        id: doctor.id,
        firstName: doctor.firstName,
        lastName: doctor.lastName,
      },
      date: randomAppointmentDate('2021-01-01', '2021-01-01', 9, 17),
      hospital: hospital && {
        id: hospital.id,
        name: hospital.name,
      },
      department:
        doctor && doctor.specialty && specialtyToDepartment[doctor.specialty],
    });
  }
};

module.exports = createAppointments;
