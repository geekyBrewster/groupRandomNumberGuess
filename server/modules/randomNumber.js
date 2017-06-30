function randomNumber(max) {
  var rNumber = Math.floor(Math.random() * (max)) + 1;
  return rNumber;
}

module.exports = randomNumber;
