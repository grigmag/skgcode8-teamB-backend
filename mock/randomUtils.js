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

const randomDatesArray = (amount, start, end) => {
  const arr = [];
  for (let i = 0; i < amount; i++) {
    arr.push(randomDate(start, end));
  }
  return arr;
};

const randomAppointmentDay = (start, end) => {
  let date = randomDate(start, end);
  
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
  randomAppointmentDay,
};
