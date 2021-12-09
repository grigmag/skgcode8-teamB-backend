const Appointment = require('../models/appointment');
const { specialtyToDepartment } = require('./dataUtils');
const { randomArrayElement, randomAppointmentDate } = require('./randomUtils');

const createAppointments = async (amount = 10, userIds = [], doctors = []) => {
  for (let i = 0; i < amount; i++) {
    const doctor = randomArrayElement(doctors);
    await Appointment.create({
      userId: userIds.length && randomArrayElement(userIds),
      doctorId: doctor && doctor.id,
      date: randomAppointmentDate('2021-01-01', '2021-12-31', 9, 17),
      hospitalId: doctor && doctor.hospitalId,
      department:
        doctor && doctor.specialty && specialtyToDepartment[doctor.specialty],
    });
  }
};

module.exports = createAppointments;
