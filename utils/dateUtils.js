const moment = require('moment');

/**
 * Creates an array of moment date objects between workdayStart hour and workdayEnd hour in half hour intervals
 * @param date Date object, string, or moment date. Only year, month, date will be used.
 * @param workdayStart number (the starting hour of the workday -> 0 to 23)
 * @param workdayEnd number (the ending hour of the workday -> 0 to 23)
 * @returns array of moment dates
 */
const createTimeSlotsArray = (date, workdayStart, workdayEnd) => {
  const arr = [];
  const startTime = moment(date).startOf('day').hours(workdayStart);
  const endTime = moment(startTime).hours(workdayEnd);

  const tempTime = moment(startTime);

  while (tempTime < endTime) {
    arr.push(moment(tempTime));
    tempTime.add(30, 'minutes');
  }

  return arr;
};

/**
 * Returns an array of moment dates that results from subtracting the booked appointment dates
 * from the timeSlots array of dates
 * @param timeSlots array of moment dates, probably created with createTimeSlotsArray
 * @param bookedAppointmentsDates array of booked dates
 */
const subtractAppointmentsFromSlots = (timeSlots, bookedAppointmentsDates) => {
  return timeSlots.filter(
    (slot) =>
      !bookedAppointmentsDates.some((time) => time.isSame(slot, 'minute'))
  );
  // .map((time) => time.format());
};

module.exports = { createTimeSlotsArray, subtractAppointmentsFromSlots };
