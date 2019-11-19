/* global tracery */

var express = require('express');
var app = express();
var path = require('path');
var tracery = require('tracery-grammar');
var bodyParser = require('body-parser')

const { uniqueNamesGenerator, Config, names } = require('unique-names-generator');

// This is the Tracery grammar.
let notes = {
  bridefirst: [
    "bride's name",
  ],
  bridefirst: [
    "bride's name",
  ],
  groom: [
    "groom's name",
  ],
  age: [
    "age"
  ],
  place: [
    "place",
  ],
  location: [
    "location",
  ],
  officant: [
    "officant",
  ],
  offrel: [
    "offrel",
  ],
  bridejob: [
    "bride job",
  ],
  bridplace: [
    "bride's work",
  ],
  brideformer: [
    "bride's former job",
  ],
  bridegrad: [
    "bride's degree",
  ],
  bridepostgrad: [
    "bride's postgrad",
  ],
  bridegender: [
    "gender",
  ],
  bridemum: [
    "blah",
  ],
  bridedad: [
    "blah"
  ],
  brideplace: [
    "blah place",
  ],
  bridefatherjob: [
    "location",
  ],
  bridemotherjob: [
    "location",
  ],
  groomjob: [
    "location",
  ],
  groomgrad: [
    "location",
  ],
  groomgender: [
    "blah",
  ],
  groommum: [
    "blah",
  ],
  groomdad: [
    "blah",
  ],
  groomplace: [
    "blah",
  ],
  groommotherjob: [
    "blah",
  ],
  groomfatherjob: [
    "blah",
  ],
  wheremet: [
    "blah",
  ],
  whereplace: [
    "blah",
  ],
  wherelocation: [
    "blah",
  ],
  origin: [
`
<h2>#bride#, #groom#</h2>

<p>#bride# and #groom# were married Nov. 16 at the #place# in #location#. #officant#, #offrel# of the couple, officiated.</p>

<p>The bride, #age#, is a #bridejob# in #bridplace#, and is a #brideformer#. She graduated from #bridegrad#, and received a #bridepostgrad#.</p>

<p>#bridegender# is the daughter of #bridemum# and #bridedad# of #brideplace#. The bride’s father is #bridefatherjob# and the bride's mother is a #bridemotherjob#.</p>
    
<p>The groom, also #age#, is #groomjob#. He graduated from #groomgrad#.</p>
    
<p>The groom is the #groomgender# of #groommum# and #groomdad# of #groomplace#. The groom’s mother is #groommotherjob# and the groom's father is #groomfatherjob#.</p>
    
<p>The couple met #wheremet# at #whereplace# in #wherelocation#.</p>
`
  ]
};

// A helper function to weight some options in the Tracery grammar more heavily than others.
function weighted(dict) {
  var out = []
  for (var key in dict) {
    for (var i = 0; i < dict[key]; i++) {
      out.push(key)
    }
  }
  return out
}

function generate() {
  var resultsContainer = document.getElementById("resultsContainer");
  resultsContainer.innerHTML = "<div id=\"results\"></div>";
  var myGrammar = tracery.createGrammar(notes);
  
  // Generates 1 sample outputs from the grammar.
  var results = document.getElementById("results");
 
  results.innerHTML = myGrammar.flatten("#origin#");
};

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use('/assets', express.static('assets'))
app.use(express.static(path.join(__dirname + "/public")));

app.post('/', urlencodedParser, function (req, res) {
  var announcement = generate()
  res.send(announcement);
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
