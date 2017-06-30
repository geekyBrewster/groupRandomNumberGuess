console.log("js sourced");
var max = 0;
var totalGuesses = 0;

$(document).ready(function(){

// Set-up Game
setDifficulty();
startGame();

// Game play
gameLogic();

// Reset game
resetGame();

});// End of Doc.ready

// FUNCTION DEFINITIONS

function setDifficulty(){
  // Define buttons & their maximum number
    $('#easy').on('click', function() {
      max = 10;
      $('#maxNumber').text(max);
      $('#levelSelect').text("Easy selected.");
    });
    $('#medium').on('click', function() {
      max = 25;
      $('#maxNumber').text(max);
      $('#levelSelect').text("Medium selected.");
    });
    $('#hard').on('click', function() {
      max = 100;
      $('#maxNumber').text(max);
      $('#levelSelect').text("Hard selected.");
    });
}

function startGame(){
  // Onc click, send max number to the server & hides difficulty button and shows player inputs
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
}

function gameLogic(){
  // Accept 4 player inputs and send to server
  $('#submit').on('click', function(){
    //Build array of players' guesses
    var playerGuesses = [];

    for (var i = 1; i <=4; i++){
      var player = "#player" + i;       //makes #player1 for use in selector
      var playerGuess = $(player).val();
      playerGuesses.push(playerGuess);
    }

    totalGuesses +=1;
    $('#totalGuesses').text(totalGuesses);
    console.log(totalGuesses);
    console.log(playerGuesses);

    //send data array to the server
    $.ajax({
      type: 'POST',
      url: '/submitData',
      data: {playerGuesses: playerGuesses},
      success: function(response){
        console.log("Players guesses sent to server.");
        console.log(response);

        //Now appending response array to DOM
        for(var i = 0; i <= response.length; i++) {
          var playerSpanID = "#p"+(i + 1) + "Guess";
          $(playerSpanID).text(response[i]);

          // Look for the winner
          if(response[i] == "You win"){
            $('.inputs').hide();
            $('#winningPlayer').text("Player " + (i + 1));
            $('#winner').show();
          }
        }
      }
    });
  });
}

function resetGame(){
  $('.restart').on('click', function(){
    // Reset variables
    max = 0;
    $('#maxNumber').text(max);
    totalGuesses = 0;
    $('#totalGuesses').text(totalGuesses);
    $('input').val("");
    for(var i = 1; i <= 4; i++) {
      var playerSpanID = "#p"+ i + "Guess";
      $(playerSpanID).text("");
    }
    //Hide inputs and show difficulty settings
    $('.difficulty').show();
    $('.inputs').hide();
    $('#winner').hide();
    }
  );
}
