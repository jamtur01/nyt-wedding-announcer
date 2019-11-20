$(function(){
  $('.gen-btn').on('click', function() {
    $.get( '/announce', function(data) {
      $('#resultsContainer').html(data);
      console.log(data);
    });
  });
});