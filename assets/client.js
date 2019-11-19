$(function(){
  $('.gen-btn').on('click', function() {
    $.post( '/', function() {
      console.log("whee!")
    });
    console.log("whee!")
  });
});