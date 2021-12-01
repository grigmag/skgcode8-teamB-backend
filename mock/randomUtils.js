/** Returns a random integer between AND INCLUDING min and max */
const randomInt = (min, max) =>
  Math.floor(min + Math.random() * (max - min + 1));

const randomArrayElement = (arr) => arr[randomInt(0, arr.length - 1)];

module.exports = { randomInt, randomArrayElement };
