const moment = require('moment');

/** Returns a random integer between AND INCLUDING min and max */
const randomInt = (min, max) =>
  Math.floor(min + Math.random() * (max - min + 1));

const randomIntArray = (num, min, max) => {
  const arr = [];
  for (let i = 0; i < num; i++) {
    arr.push(randomInt(min, max));
  }
  return arr;
};

const randomArrayElement = (arr) => arr[randomInt(0, arr.length - 1)];

const randomPhoneNumber = () =>
  '+302' + randomInt(1, 8) + randomIntArray(8, 0, 9).join('');

const randomMobileNumber = () =>
  '+3069' + randomArrayElement([0, 3, 7, 8]) + randomIntArray(7, 0, 9).join('');

/**
 * Returns a random date in a given range
 * @param start moment date or string
 * @param end moment date or string
 *
 * @returns moment date
 */
const randomDate = (start = moment(), end = moment()) => {
  const startDate =
    typeof start === 'string' ? moment(start) : start.isValid() ? start : null;

  const endDate =
    typeof end === 'string' ? moment(end) : end.isValid() ? end : null;

  if (!startDate || !endDate) {
    throw new Error('wrong date type');
  }
  const date = moment(
    startDate.valueOf() +
      Math.random() * (endDate.valueOf() - startDate.valueOf())
  );
  return date;
};

/**
 * Returns an array of given length of random dates in a given range (start - end)
 * @param amount number (amount of dates in the returned array)
 * @param start moment date or string (the starting date of range)
 * @param end moment date or string (the ending date of range)
 *
 * @returns moment date
 */
const randomDatesArray = (amount, start, end) => {
  const arr = [];
  for (let i = 0; i < amount; i++) {
    arr.push(randomDate(start, end));
  }
  return arr;
};

/**
 * Returns a random date between start and end, 
 * with hours between workdayStart and workdayEnd
 * and minutes rounded to previous half hour. 
 * @param start moment date or date string
 * @param end moment date or date string
 * @param workdayStart number (the starting hour of the workday -> 0 to 23)
 * @param workdayEnd number (the ending hour of the workday -> 0 to 23)
 *
 * @returns moment date
 */
const randomAppointmentDate = (start, end, workdayStart, workdayEnd) => {
  let date = randomDate(start, end);

  if (date.hour() < workdayStart || date.hour() >= workdayEnd) {
    date.hour(randomInt(workdayStart, workdayEnd - 1));
  }

  roundDateToHalfHour(date);

  return date;
};

const roundDateToHalfHour = (date) => {
  if (date.minutes() < 30) {
    date.minutes(0);
  } else {
    date.minutes(30);
  }

  return date;
};

module.exports = {
  randomInt,
  randomIntArray,
  randomArrayElement,
  randomPhoneNumber,
  randomMobileNumber,
  randomDate,
  randomDatesArray,
  randomAppointmentDate,
};
