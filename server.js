/* global tracery */

var express = require("express");
var app = express();
var path = require("path");
var tracery = require("tracery-grammar");
var bodyParser = require("body-parser");

var faker = require("faker");

var Fakerator = require("fakerator");
var fakerator = Fakerator();

const { uniqueNamesGenerator } = require("unique-names-generator");

const ivy = [
  "Brown",
  "Columbia",
  "Cornell",
  "Dartmouth",
  "Harvard",
  "the University of Pennsylvania",
  "Princeton",
  "Yale",
  "NYU",
  "Stanford"
];

const 
const ivy_config = {
  dictionaries: [ivy],
  length: 1,
  style: "capital"
};

var brideName = fakerator.names.nameF();
var brideMum = fakerator.names.nameF();
var brideDad = fakerator.names.nameM();
var brideJob = faker.fake("{{name.jobTitle}} at {{company.companyName}}");
var brideFormerJob = faker.fake("{{name.jobTitle}} at {{company.companyName}}");
var brideMotherJob = faker.fake("{{name.jobTitle}} at {{company.companyName}}");
var brideFatherJob = faker.fake("{{name.jobTitle}} at {{company.companyName}}");
var bridePlace = fakerator.populate("#{address.city}");
var groomName = fakerator.names.nameM();
var groomGrad = uniqueNamesGenerator(ivy_config);
var groomDad = fakerator.names.nameM();
var groomMum = fakerator.names.nameF();
var groomJob = faker.fake("{{name.jobTitle}} at {{company.companyName}}");
var groomFatherJob = faker.fake("{{name.jobTitle}} at {{company.companyName}}");
var groomMotherJob = faker.fake("{{name.jobTitle}} at {{company.companyName}}");
var groomPlace = fakerator.populate("#{address.city}");
var state = faker.address.state();
var age = (Math.floor(Math.random() * 30) + 19).toString();
var where

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
  groomgrad: [groomGrad],
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
  announcement = "";
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
