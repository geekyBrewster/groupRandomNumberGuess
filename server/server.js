var express = require("express");
var app = express();
var path = require("path");
var port = 5002;
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
var generateRandomNumber = require('./modules/randomNumber.js');
var randomNumber;

// Receives max number from client
app.post('/playGame', function(req, res) {
  var maxVal = parseInt(req.body.max);
  randomNumber = generateRandomNumber(maxVal);
  console.log("random number is: " + randomNumber);
  res.sendStatus(200);
});

// Receive players' guesses from client
app.post('/submitData', function(req, res){
  var playerGuesses = req.body.playerGuesses;   //retreiving data array (numbers are strings)
  // Game Logic: comparisons, generate hi/lo messages + winner?, send data back to client
  // NOTE: put this in a module once it works
  console.log(playerGuesses);
  var result;
  var returnData = [];
  for(var i = 0; i < playerGuesses.length; i++){
    var playersNumber = playerGuesses[i];
    if(playersNumber == randomNumber){
      result = "You win";
      console.log("result: " + result);
    }
    else if(playersNumber < randomNumber){
      result = "Your guess was low";
      console.log("result: " + result);
    }
    else{
      result = "Your guess was high";
      console.log("result: " + result);
    }

    returnData.push(result);

  }
  console.log("result array: " + returnData);
  res.send(returnData);



});

app.get("/*", function(req, res){
  var file = req.params[0] || "views/index.html";
  res.sendFile(path.join(__dirname, "public", file));
});

app.listen(port, function(){
  console.log("server running on port", port);
});
