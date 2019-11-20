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

const places_met = [
  'on OkCupid', 'via a mutual friend', 'at a wedding', 'on Tinder', 'at a college reunion', 'boating', 'at college', 'while summering in the Hamptons', 'at a bar', 'at a restaurant', 'at Whole Foods', 'leaf peeping', 'trick or treating', 'at a pottery class', 'at a poetry reading', 'at an experimental interpretative dance experience'
]

const places = [
  'Four Seasons Hotel', 'Fifth Avenue Presbyterian Church', 'Mandarin Oriental hotel', 'Beverly Hills Hotel', 'Ace Hotel', 'Waldorf-Astoria', "the brides family summer home in Nantucket", 'United Methodist Church'
]

const offrel = [
  'a friend', 'cousin', 'a college room mate', 'family friend'
]

const ivy_config = {
  dictionaries: [ivy],
  length: 1,
  style: "capital"
};

const placemet_config = {
  dictionaries: [places_met],
  length: 1,
};

const places_config = {
  dictionaries: [places],
  length: 1,
};

const offrel_config = {
  dictionaries: [offrel],
  length: 1,
};

var brideName = fakerator.names.nameF();
var brideMum = fakerator.names.nameF();
var brideDad = fakerator.names.nameM();
var brideJob = faker.fake("{{name.jobTitle}} at {{company.companyName}}");
var brideFormerJob = faker.fake("{{name.jobTitle}} at {{company.companyName}}");
var brideMotherJob = faker.fake("{{name.jobTitle}} at {{company.companyName}}");
var brideFatherJob = faker.fake("{{name.jobTitle}} at {{company.companyName}}");
var bridePlace = fakerator.populate("#{address.city}");
var brideGrad = uniqueNamesGenerator(ivy_config);
var groomName = fakerator.names.nameM();
var groomGrad = uniqueNamesGenerator(ivy_config);
var groomDad = fakerator.names.nameM();
var groomMum = fakerator.names.nameF();
var groomJob = faker.fake("{{name.jobTitle}} at {{company.companyName}}");
var groomFatherJob = faker.fake("{{name.jobTitle}} at {{company.companyName}}");
var groomMotherJob = faker.fake("{{name.jobTitle}} at {{company.companyName}}");
var groomPlace = fakerator.populate("#{address.city}");
var state = faker.address.state();
var age = (Math.floor(Math.random() * 30) + 21).toString();
var officiant = fakerator.names.nameM();
var offRelationship = uniqueNamesGenerator(offrel_config);
var wherePlace = uniqueNamesGenerator(placemet_config);
var whereLocation = fakerator.populate("#{address.city}");
var place = uniqueNamesGenerator(places_config);

// This is the Tracery grammar.
let notes = {
  bride: [brideName],
  groom: [groomName],
  age: [age],
  place: [place],
  state: [state],
  officant: [officiant],
  offrel: [offRelationship],
  bridejob: [brideJob],
  bridplace: [bridePlace],
  brideformer: [brideFormerJob],
  bridegrad: [brideGrad],
  bridepostgrad: ["bride's postgrad"],
  bridemum: [brideMum],
  bridedad: [brideDad],
  brideplace: [bridePlace],
  bridefatherjob: [brideFatherJob],
  bridemotherjob: [brideMotherJob],
  groomjob: [groomJob],
  groomgrad: [groomGrad],
  groommum: [groomMum],
  groomdad: [groomDad],
  groomplace: [groomPlace],
  groommotherjob: [groomMotherJob],
  groomfatherjob: [groomFatherJob],
  whereplace: [wherePlace],
  wherelocation: [whereLocation],
  origin: [
    `
<div id=\"results\">
<h2>#bride#, #groom#</h2>

<p>#bride# and #groom# were married Nov. 16 at the #place# in #state#. #officant#, #offrel# of the couple, officiated.</p>

<p>The bride, #age#, is a #bridejob#, and is formerly a #brideformer#. She graduated from #bridegrad#, and received a #bridepostgrad#.</p>

<p>The bride is the daughter of #bridemum# and #bridedad# of #brideplace#. The bride’s father, who is retired, was a #bridefatherjob# and the bride's mother is a #bridemotherjob#.</p>
    
<p>The groom, also #age#, is #groomjob#. He graduated magna cum laude from #groomgrad#.</p>
    
<p>The groom is the son of #groommum# and #groomdad# of #groomplace#. The groom’s mother is a #groommotherjob# and the groom's father is a #groomfatherjob#.</p>
    
<p>The couple first met #whereplace# in #wherelocation#.</p>
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
