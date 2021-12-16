const { randomArrayElement } = require('./randomUtils');
const Doctor = require('../models/doctor');

/**
 *
 * @param doctorIds Array of mongodb doctor ids
 * @returns Object containing doctor id, firstName, lastName
 */
const randomDoctorNameObj = async (doctorIds) => {
  const randomId = randomArrayElement(doctorIds);
  const doctor = await Doctor.findById(randomId);

  return {
    id: doctor.id,
    firstName: doctor.firstName,
    lastName: doctor.lastName,
  };
};

module.exports = { randomDoctorNameObj };
