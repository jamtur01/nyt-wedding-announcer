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
  place: [
    "place",
  ],
  location: [
    "location",
  ],
  
  origin: [
    `
<p>
#bride# and #groom# were married Nov. 16 at the #place# in #location#. Rory Team, a friend of the couple who became a Universal Life minister for the event, officiated.

The bride, #age#, is a middle school science teacher at 75 Morton in New York, and is a former Teach for America corps member. She graduated from Agnes Scott College in Decatur, Ga., and received a master’s degree in teaching secondary biology at Fordham.
    
She is the daughter of Dana S. Bello and Ariel Bello of Carlsbad, Calif. The bride’s father is a captain for United Airlines and is based in Los Angeles. Her mother retired as a Los Angeles-based flight attendant.
    
The groom, also #age#, is a project manager and architectural designer at BuiltIN Studio, an architectural firm in New York. He graduated from California Polytechnic State University, San Luis Obispo.
    
He is a son of Leslie K. Venolia and Craig A. Landau, also of Carlsbad. The groom’s mother is a Carlsbad-based freelance technical writer and editor, and a former newspaper editor at The San Diego Reader. His father, who works remotely from Carlsbad, is an area manager and sales representative of Associated Ready Mixed Concrete.
    
The couple met #wheremet# at #whereplace# in #wherelocation#.
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
