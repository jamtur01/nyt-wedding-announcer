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
  subject: [
    "Why I left New York",
    "Why Aperol Spritz are no longer trendy",
    "the Trouble with Tribbles"
    "Why Game of Thrones Deserved "
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
    "deeply thoughtful"
  ],
  success: [
    "the most success",
    "the least success",
    "success",
    "good luck"
    "find more time with"
  ],
  essay: [
    "feature essay"
  ],
  appreciation: [
    "fond appreciation",
    "appreciation",
    "mild interest",
  ],
  another_publisher: [
    "another publisher more suited to your writing",
    "making your rent",
    "your plans to retire early"
    "discovering another hobby"
    "learning about your better skills"
  ],
  origin: [
    `
We are sending this letter to communicate our #appreciation#
for your feature essay titled, \"#subject#\". It is with great pleasure that
we must reject your #great# work, and wish you #success# with
#another_publisher# .
`
  ]
};



function generate() {
  var myGrammar = tracery.createGrammar(notes);
  
  // Store away the default pluralize ".s" function.
  var old_pluralize = myGrammar.modifiers.s;
  // Replace the pluralize ".s" function with a special variant.
  myGrammar.modifiers.s = function my_pluralize(to_modify) {
    // TODO: mass nouns
    if (to_modify == "crash") {
      return "crashes";
    } else {
      // Delegate to the default one that we stored away.
      return old_pluralize(to_modify);
    }
  };

  // Generates 10 sample outputs from the grammar.
  var results = document.getElementById("results");
  while (results.hasChildNodes()) {  
      results.removeChild(results.firstChild);
  }
  for (var i = 0; i < 10; i += 1) {
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(myGrammar.flatten("#origin#")));
    results.appendChild(li);
  }

  // Computes the "abundance" number rough estimate of how many unique outputs the grammar can generate.
  // This uses a "mark and recapture" formula that biologists use to estimate, for example, bird populations.
  var seenFirst = [];
  var effort = 10000;
  for (var i = 0; i < effort; i += 1) {
    var item = myGrammar.flatten("#origin#");
    if (seenFirst.indexOf(item) < 0) {
      seenFirst.push(item);
    }
  }
  var K = seenFirst.length;
  var k = 0;
  var seenSecond = [];
  for (var i = 0; i < effort; i += 1) {
    var item = myGrammar.flatten("#origin#");
    if (seenSecond.indexOf(item) < 0) {
      seenSecond.push(item);
      if (seenFirst.indexOf(item) >= 0) {
        // we saw this one before
        k += 1;
      }
    }
  }
  var n = seenSecond.length;
  var li = document.createElement("li");
  if (n <= 2) {
    li.appendChild(document.createTextNode("abundance is approximately infinite"));
  } else if (n <= 3) {
    li.appendChild(document.createTextNode("abundance is approximately " + Math.floor((K-1)*(n-1)/(k-2))));
  } else {
    li.appendChild(document.createTextNode("abundance is " +
                        Math.floor((K-1)*(n-1)/(k-2)) +
                        " plus or minus " +
                        Math.sqrt((K-1)*(n-1)*(K-k-1)*(n-k+1)/((k-2)*(k-2)*(k-3))).toPrecision(4)
                        ));
  }
  results.appendChild(li);
};
