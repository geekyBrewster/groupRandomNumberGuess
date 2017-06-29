console.log("js sourced");
var max = 0;

$(document).ready(function(){

  $('#easy').on('click', function() {
    max = 10;
  });
  $('#medium').on('click', function() {
    max = 25;
  });
  $('#hard').on('click', function() {
    max = 100;
  });
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
});// End of Doc.ready
