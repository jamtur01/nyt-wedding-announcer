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
  // Noun Phrase. Singular. Synonyms of "bug".
  bug: [
    "bug",
    "flaw",
    "issue",
    "tuning issue",
    "reset",
    "fault",
    "glitch",
    "defect",
  ],
  // Prepositional Phrase. Something a Sim might do.
  in_circumstance: [
    "when they sit at the edge of a pool with a drink in hand",
    "when travelling to the future",
    "when switching between floors of a house",
    "#in_circumstance# #in_circumstance#",
  ],
  // Noun Phrase. Singular. In-game object.
  object: [
    "time portal",
    "chair",
    "diploma",
    "toilet",
  ],
  // Verb. A bad thing for an in-game object to do.
  behave_badly: [
    "disappear",
    "overflow",
  ],
  // Infinitive. A bad thing for a Sim to do.
  to_behave_badly: [
    "to disappear",
    "to scratch their back with their elbows",
  ],
  // Sentence. A good thing.
  user_story: [
    "Users can install and uninstall custom content in their game.",
  ],
  // Noun Phrase. Plural. Quite unusual kinds and categories of Sims.
  unusual_sims: [
    "Magicians",
    "Vampires",
    "Werewolves",
  ],
  // Noun Phrase. Plural. Various kinds and categories of Sims.
  sims: [
    "Sims",
    "Self-Employed Sims",
    "Children",
    "Toddlers",
    "#unusual_sims#",
  ],
  note: [
    "Fixed #bug.a# so that #sims# now vomit at acceptable levels.",
    "Fixed #bug.a# caused by setting the alarm for #sims#.",
    "Fixed #bug.a# where #object.s# could be stolen or reposessed.",
    "#unusual_sims# re-enabled.",

    "Fixed #bug.a# that caused #sims# #to_behave_badly# #in_circumstance#.",

    "The #object.capitalize# will no longer #behave_badly# #in_circumstance#.",
    "#sims# will no longer sit on #object.s# that are no longer present.",
    "#user_story#",
  ],
  origin: weighted({
    "#note#": 10,
    "[UNDOCUMENTED] #note#": 1,
    "[MAC ONLY] #note#": 1
  })
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
