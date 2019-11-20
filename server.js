/* global tracery */

var express = require("express");
var app = express();
var path = require("path");
var tracery = require("tracery-grammar");
var bodyParser = require("body-parser");

var faker = require('faker');

var Fakerator = require("fakerator");
var fakerator = Fakerator();

const {
  uniqueNamesGenerator,
  names,
  colors,
  animals
} = require("unique-names-generator");


const states = [
  "Alabama",
  "Alaska",
  "American Samoa",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "District of Columbia",
  "Federated States of Micronesia",
  "Florida",
  "Georgia",
  "Guam",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Marshall Islands",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Palau",
  "Pennsylvania",
  "Puerto Rico",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virgin Island",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming"
];

const state_config = {
  dictionaries: [states],
  length: 1,
  style: "capital"
}

var brideName = fakerator.names.nameF()
var brideMum = fakerator.names.nameF()
var brideDad = fakerator.names.nameM()
var brideJob = faker.fake("{{name.jobTitle}} at {{company.companyName}}") 
var brideFormerJob = faker.fake("{{name.jobTitle}} at {{company.companyName}}") 
var brideMotherJob = faker.fake("{{name.jobTitle}} at {{company.companyName}}") 
var brideFatherJob = faker.fake("{{name.jobTitle}} at {{company.companyName}}") 
var bridePlace = fakerator.populate("#{address.city}")
var groomName = fakerator.names.nameM()
var groomDad = fakerator.names.nameM()
var groomMum = fakerator.names.nameF()
var groomJob = faker.fake("{{name.jobTitle}} at {{company.companyName}}") 
var groomFatherJob = faker.fake("{{name.jobTitle}} at {{company.companyName}}") 
var groomMotherJob = faker.fake("{{name.jobTitle}} at {{company.companyName}}") 
var groomPlace = fakerator.populate("#{address.city}")
var state = faker.address.state()
var age = (Math.floor(Math.random() * 30) + 19).toString();

// This is the Tracery grammar.
let notes = {
  bride: [brideName],
  groom: [groomName],
  age: [age],
  place: ["place"],
  state: [state],
  officant: ["officant"],
  offrel: ["offrel"],
  bridejob: [brideJob],
  bridplace: [bridePlace],
  brideformer: [brideFormerJob],
  bridegrad: ["bride's degree"],
  bridepostgrad: ["bride's postgrad"],
  bridegender: ["gender"],
  bridemum: [brideMum],
  bridedad: [brideDad],
  brideplace: [bridePlace],
  bridefatherjob: [brideFatherJob],
  bridemotherjob: [brideMotherJob],
  groomjob: [groomJob],
  groomgrad: ["location"],
  groomgender: ["blah"],
  groommum: [groomMum],
  groomdad: [groomDad],
  groomplace: [groomPlace],
  groommotherjob: [groomMotherJob],
  groomfatherjob: [groomFatherJob],
  wheremet: ["blah"],
  whereplace: ["blah"],
  wherelocation: ["blah"],
  origin: [
    `
<div id=\"results\">
<h2>#bride#, #groom#</h2>

<p>#bride# and #groom# were married Nov. 16 at the #place# in #state#. #officant#, #offrel# of the couple, officiated.</p>

<p>The bride, #age#, is a #bridejob#, and is formerly a #brideformer#. She graduated from #bridegrad#, and received a #bridepostgrad#.</p>

<p>#bridegender# is the daughter of #bridemum# and #bridedad# of #brideplace#. The bride’s father is #bridefatherjob# and the bride's mother is a #bridemotherjob#.</p>
    
<p>The groom, also #age#, is #groomjob#. He graduated from #groomgrad#.</p>
    
<p>The groom is the #groomgender# of #groommum# and #groomdad# of #groomplace#. The groom’s mother is a #groommotherjob# and the groom's father is a #groomfatherjob#.</p>
    
<p>The couple met #wheremet# at #whereplace# in #wherelocation#.</p>
</div>
`
  ]
};

function generate() {
  var myGrammar = tracery.createGrammar(notes);
  var results = myGrammar.flatten("#origin#");
  return results;
}

var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use("/assets", express.static("assets"));
app.use(express.static(path.join(__dirname + "/public")));

app.get("/announce", urlencodedParser, function(req, res) {
  var announcement = generate();
  res.send(announcement);
  announcement = ''
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
