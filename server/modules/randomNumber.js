function randomNumber(min, max) {
  var rNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return rNumber;
}

module.exports = randomNumber;
