// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

console.log('hello world :o');

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
    "Why I left New York",
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
    "average",
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
    "Someone you'll never meet"
    "Your former colleage roommate"
  ],
  origin: [
    `
We are sending this letter to communicate our #appreciation#
for your #essay# titled, \"#subject#\". It is with great pleasure that
we must reject your #great# work, and wish you #success# with
#another_publisher# .

Sincerely,
#someone#
`
  ]
};



function generate() {
  var myGrammar = tracery.createGrammar(notes);
  
  // Generates 1 sample outputs from the grammar.
  var results = document.getElementById("results");
  while (results.hasChildNodes()) {  
      results.removeChild(results.firstChild);
  }
  for (var i = 0; i < 1; i += 1) {
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(myGrammar.flatten("#origin#")));
    results.appendChild(li);
  }
};
