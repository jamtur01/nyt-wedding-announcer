'#gen-btn'.addEventListener('click', function() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/announce');
  xhr.onload = function() {
    if (xhr.status === 200) {
      document.getElementById('#resultsContainer').textContent = xhr.responseText;
    }
    else {
        console.log('Request failed.  Returned status of ' + xhr.status);
    }
  };
  xhr.send();
});