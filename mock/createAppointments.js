const Appointment = require('../models/appointment');
const { specialtyToDepartment } = require('./dataUtils');
const { randomArrayElement } = require('./randomUtils');

const createAppointments = async (amount = 10, userIds = [], doctors = []) => {
  const oldAppointments = await Appointment.find();
  if (oldAppointments.length !== amount) {
    for (const appointment of oldAppointments) {
      Appointment.findByIdAndDelete(appointment.id);
    }

    for (let i = 0; i < amount; i++) {
      const doctor = randomArrayElement(doctors);
      await Appointment.create({
        userId: userIds.length && randomArrayElement(userIds),
        doctorId: doctor && doctor.id,
        date: Date.now(),
        hospitalId: doctor && doctor.hospitalId,
        department:
          doctor && doctor.specialty && specialtyToDepartment[doctor.specialty],
      });
    }
  }
};

module.exports = createAppointments;
