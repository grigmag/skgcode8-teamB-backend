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

const randomMobileNumber = () =>
  '+3069' + randomArrayElement([0, 3, 7, 8]) + randomIntArray(0, 9, 7).join('');

module.exports = {
  randomInt,
  randomIntArray,
  randomArrayElement,
  randomMobileNumber,
};
