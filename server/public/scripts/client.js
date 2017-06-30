console.log("js sourced");
var max = 0;

$(document).ready(function(){

// Define buttons & their maximum number
  $('#easy').on('click', function() {
    max = 10;
  });
  $('#medium').on('click', function() {
    max = 25;
  });
  $('#hard').on('click', function() {
    max = 100;
  });

//Send max number to the server & hides difficulty button and shows player inputs
  $('#startGame').on('click', function() {
    $.ajax({
      type : 'POST',
      url: '/playGame',
      data: {max : max},
      success: function(response){
        $('.difficulty').hide();
        $('.inputs').show();
      }
    });
  });

// Accept 4 player inputs and send to server
$('#submit').on('click', function(){
  //Build array of players' guesses
  var playerGuesses = [];
  for (var i = 1; i <=4; i++){
    var player = "#player" + i;       //makes #player1 for use in selector
    var playerGuess = $(player).val();
    playerGuesses.push(playerGuess);
  }
  console.log(playerGuesses);
  //send data array to the server
  $.ajax({
    type: 'POST',
    url: '/submitData',
    data: {playerGuesses: playerGuesses},
    success: function(response){
      console.log("Players guesses sent to server.");
      console.log(response);
    }
  });
});


});// End of Doc.ready
