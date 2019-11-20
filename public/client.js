$(document).ready(function(){
  $('#gen-btn').click(function(){
    $('#resultsContainer').empty();

    $.get( '/announce', function(data) {
      $('#resultsContainer').html(data);
      console.log(data);
    });
  });
});