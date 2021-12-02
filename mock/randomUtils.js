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

// const randomDates = () => {
//   const start = new Date();
//   const end = new Date(2021, 11, 31);
//   let dates = [];
//   for (let i = 0; i < 3; i++) {
//     const date = new Date(
//       start.getTime() + Math.random() * (end.getTime() - start.getTime())
//     );
//     dates[i] = date;
//   }
//   return dates;
// };

module.exports = {
  randomInt,
  randomIntArray,
  randomArrayElement,
  randomPhoneNumber,
  randomMobileNumber,
};
