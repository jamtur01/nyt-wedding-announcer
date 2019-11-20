/* global tracery */

var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var tracery = require("tracery-grammar");
var faker = require("faker");
var Fakerator = require("fakerator");
var fakerator = Fakerator();
var { uniqueNamesGenerator } = require("unique-names-generator");

const ivy = [
  "Brown",
  "Columbia",
  "Cornell",
  "Dartmouth",
  "Harvard",
  "University of Pennsylvania",
  "Princeton",
  "Yale",
  "NYU",
  "Stanford"
];

const places_met = [
  "on the dating app JSwipe",
  "on the dating app Hinge",
  "at a mutual friend’s birthday party",
  "on OkCupid",
  "via a mutual friend",
  "at a wedding",
  "on Tinder",
  "at a college reunion",
  "boating",
  "at college",
  "while summering",
  "at a bar",
  "at a restaurant",
  "at Whole Foods",
  "leaf peeping",
  "trick or treating",
  "at a pottery class",
  "at a poetry reading",
  "at an experimental interpretative dance experience",
  "Burning Man"
];

const places = [
  "The Plaza",
  "The Boathouse",
  "The River Café",
  "the Botanic Gardens",
  "Temple Beth Israel",
  "Four Seasons Hotel",
  "Fifth Avenue Presbyterian Church",
  "Mandarin Oriental hotel",
  "Beverly Hills Hotel",
  "Ace Hotel",
  "Waldorf-Astoria",
  "the brides family summer home in Nantucket",
  "United Methodist Church"
];

const offrel = [
  "a friend",
  "a cousin",
  "a college room mate",
  "a family friend",
  "the meditation teacher"
];

const postgrad = [
  "a Master's degree in Public Health",
  "a PhD in Fine Art",
  "an M.B.A",
  "a Master's in Social Work",
  "a Doctorate in Literature",
  "a Doctorate of Philsophy"
];

const ivy_config = {
  dictionaries: [ivy],
  length: 1,
  style: "capital"
};

const placemet_config = {
  dictionaries: [places_met],
  length: 1
};

const places_config = {
  dictionaries: [places],
  length: 1
};

const offrel_config = {
  dictionaries: [offrel],
  length: 1
};

const postgrad_config = {
  dictionaries: [postgrad],
  length: 1
};

function generate() {
  var brideName = fakerator.names.nameF();
  var brideMum = fakerator.names.nameF();
  var brideDad = fakerator.names.nameM();
  var brideJob = faker.fake("{{name.jobTitle}} at {{company.companyName}}");
  var brideFormerJob = faker.fake(
    "{{name.jobTitle}} at {{company.companyName}}"
  );
  var brideMotherJob = faker.fake(
    "{{name.jobTitle}} at {{company.companyName}}"
  );
  var brideFatherJob = faker.fake(
    "{{name.jobTitle}} at {{company.companyName}}"
  );
  var bridePlace = fakerator.populate("#{address.city}");
  var brideGrad = uniqueNamesGenerator(ivy_config);
  var brideGrad2 = uniqueNamesGenerator(ivy_config);
  var bridePostGrad = uniqueNamesGenerator(postgrad_config);
  var groomName = faker.name.findName();
  var groomGrad = uniqueNamesGenerator(ivy_config);
  var groomDad = fakerator.names.nameM();
  var groomMum = fakerator.names.nameF();
  var groomJob = faker.fake("{{name.jobTitle}} at {{company.companyName}}");
  var groomFatherJob = faker.fake(
    "{{name.jobTitle}} at {{company.companyName}}"
  );
  var groomMotherJob = faker.fake(
    "{{name.jobTitle}} at {{company.companyName}}"
  );
  var groomPlace = fakerator.populate("#{address.city}");
  var state = faker.address.state();
  var age = (Math.floor(Math.random() * 30) + 21).toString();
  var officiant = fakerator.names.nameM();
  var offRelationship = uniqueNamesGenerator(offrel_config);
  var wherePlace = uniqueNamesGenerator(placemet_config);
  var whereLocation = fakerator.populate("#{address.city}");
  var wherePlace2 = uniqueNamesGenerator(placemet_config);
  var whereLocation2 = fakerator.populate("#{address.city}");
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
    bridegrad2: [brideGrad2],
    bridepostgrad: [bridePostGrad],
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
    whereplace2: [wherePlace2],
    wherelocation2: [whereLocation2],
    origin: [
      `
<div id=\"results\">
<h2>#bride#, #groom#</h2>

<p>#bride# and #groom# were married Nov. 16 at the #place# in #state#. #officant#, #offrel# of the couple, officiated.</p>

<p>The bride, #age#, is a #bridejob#, and was formerly a #brideformer#. The bride graduated from #bridegrad#, and also received #bridepostgrad# from #bridegrad2#.</p>

<p>The bride's parents are #bridemum# and #bridedad# of #brideplace#. The bride’s father, who is retired, was a #bridefatherjob# and the bride's mother is a #bridemotherjob#.</p>
    
<p>The groom, also #age#, is a #groomjob#. The groom graduated magna cum laude from #groomgrad#.</p>
    
<p>The groom's parents are #groommum# and #groomdad# of #groomplace#. The groom’s mother is a #groommotherjob# and the groom's father is a #groomfatherjob#.</p>
    
<p>The couple first met #whereplace# in #wherelocation# but didn't hit it off. A later meeting #whereplace2# in #wherelocation2# proved more fruitful and the couple have been dating since 2017.</p>
</div>
`
    ]
  };

  var AnnounceGrammar = tracery.createGrammar(notes);
  var results = AnnounceGrammar.flatten("#origin#");
  return results;
}

app.disable("etag");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.post("/", function(req, res) {
  var results = generate();
  res.send(results);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
