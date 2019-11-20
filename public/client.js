$(document).ready(function(){
  $('#gen-btn').click(function(){
    $('#resultsContainer').empty();
    
    $.ajaxSetup({cache: false});
    
    $.get( '/announce', { now: jQuery.now() }, function(data) {
      $('#resultsContainer').html(data);
      console.log(data);
    });
  });
});