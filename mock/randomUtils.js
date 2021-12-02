/** Returns a random integer between AND INCLUDING min and max */
const randomInt = (min, max) =>
  Math.floor(min + Math.random() * (max - min + 1));

const randomIntArray = (min, max, num) => {
  const arr = new Array(num);
  for (let i = 0; i < num; i++) {
    arr.push(randomInt(min, max));
  }
  return arr;
};

const randomArrayElement = (arr) => arr[randomInt(0, arr.length - 1)];

const randomPhoneNumber = () =>
  '+302' + randomInt(1, 8) + randomIntArray(0, 9, 8).join('');

const randomMobileNumber = () =>
  '+3069' + randomArrayElement([0, 3, 7, 8]) + randomIntArray(0, 9, 7).join('');

const randomDates = (
  amount,
  location,
  start = new Date(),
  end = new Date()
) => {
  const startDate = typeof start === Object ? start : new Date(start);
  const endDate = typeof end === Object ? end : new Date(end);

  console.log(location, endDate);
  let dates = [];
  for (let i = 0; i < amount; i++) {
    const date = new Date(
      startDate.getTime() +
        Math.random() * (endDate.getTime() - startDate.getTime())
    );
    dates[i] = date;
  }

  if (dates.length < 2) {
    return dates[0];
  } else if (dates.lenght >= 2) {
    return dates;
  } else {
    return Date.now();
  }
};

module.exports = {
  randomInt,
  randomIntArray,
  randomArrayElement,
  randomPhoneNumber,
  randomMobileNumber,
  randomDates,
};
