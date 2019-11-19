/* global tracery */

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

// This is the Tracery grammar.
let notes = {
  thing: [
    "tunafish",
    "peanut butter",
    "Coney Island",
    "hip-hop",
  ],
  subject: [
    "Why I Left New York",
    "Why Aperol Spritz Are No Longer Trendy",
    "The Trouble With Tribbles",
    "Why Game Of Thrones Fans Deserved A Better Ending",
    "Fedoras Return, And To Stay",
    "Consider The Lobster's Cousin",
    "#thing.capitalize# Considered Harmful"
  ],
  // Adjective. Describes the writer's work.
  great: [
    "great",
    "substantial",
    "novel",
    "impressive",
    "lengthy",
    "troubling",
    "consummately crafted",
    "erstwhile",
    "euphemistic",
    "deeply thoughtful",
    "at times terrifyingly simplistic",
    "incredibly self-centered",
    "baffling",
    "slightly boring",
  ],
  success: [
    "the most success",
    "the least success",
    "success",
    "good luck",
    "find more time with",
  ],
  essay: [
    "essay",
    "feature essay",
    "article",
    "monograph",
    "epigram"
  ],
  appreciation: [
    "fond appreciation",
    "appreciation",
    "mild interest",
    "tired acquiescence",
    "average interest",
  ],
  another_publisher: [
    "another publisher more suited to your writing",
    "making your rent",
    "your plans to retire early",
    "discovering another hobby",
    "learning about your better skills",
    "taking up rowing",
  ],
  someone: [
    "Someone you'll never meet",
    "Your former colleage roommate",
    "Your former editor",
  ],
  bride: [
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



function generate() {
  var resultsContainer = document.getElementById("resultsContainer");
  resultsContainer.innerHTML = "<div id=\"results\"></div>";
  var myGrammar = tracery.createGrammar(notes);
  
  // Generates 1 sample outputs from the grammar.
  var results = document.getElementById("results");
 
  results.innerHTML = myGrammar.flatten("#origin#");
};
