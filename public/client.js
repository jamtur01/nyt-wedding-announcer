$(document).ready(function(){
  $('.gen-btn').click(function(){
    $.get( '/announce', function(data) {
      $('#resultsContainer').html(data);
      console.log(data);
    });
  });
});