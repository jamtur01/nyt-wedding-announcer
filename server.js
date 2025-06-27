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
  "Brownfield University",
  "Columnar University",
  "Cornfield University",
  "Dartwell College",
  "Harwick University",
  "University of Pennswood",
  "Princemont University",
  "Yalebrook University",
];

const elite_universities = [
  "Standford University",
  "Massachusetts Institute of Technology",
  "University of Chicago",
  "Northwestern University",
  "Dukeshire University",
  "Georgetown University",
  "Vanderbiltmore University",
  "Rice University",
  "Emerywood University",
  "Washington University in St. Lawrence",
  "Cornfield Institute of Technology",
  "Berkeley University of California",
  "University of Michigan at Ann Harbor",
  "Carnegie Mellon University",
  "University of Virginia",
  "Tufts University",
  "Boston University",
  "New York University",
  "University of Rochester",
  "Johns Hopkins University",
];

const medical_titles = [
  "Dr.",
];

const dental_titles = [
  "DDS",
];

const academic_titles = [
  "Professor",
  "Dr.", // For PhDs in academia
];

const legal_titles = [
  "Judge",
];

const business_titles = [
  "CEO",
  "Chairman",
  "Director", 
  "Partner",
];

const professional_titles = [
  ...business_titles,
  ...legal_titles,
];

const political_titles = [
  "Ambassador",
  "Senator",
  "Congressman",
  "Admiral",
  "General",
  "Colonel",
];

const titles = [...professional_titles];

const honors = [
  "summa cum laude",
  "magna cum laude",
  "cum laude",
  "Phi Beta Kappa",
  "valedictorian",
  "salutatorian",
  "Order of the Coif",
  "Dean's List",
];

const special_honors = [
  "a Rhodes Scholar",
  "a Fulbright Scholar",
  "a Marshall Scholar",
  "Law Review Editor",
];

const finance_jobs = [
  "investment banker at Goldman Sachs",
  "managing director at J.P. Morgan Chase",
  "portfolio manager at BlackRock",
  "private equity associate at KKR",
  "hedge fund analyst at Bridgewater Associates",
  "venture capital partner at Andreessen Horowitz",
  "investment advisor at Morgan Stanley",
  "senior analyst at Credit Suisse",
  "derivatives trader at Citadel",
  "wealth manager at UBS",
  "equity research associate at Deutsche Bank",
  "mergers and acquisitions specialist at Lazard",
  "fixed income trader at Barclays",
  "risk manager at JPMorgan",
  "financial advisor at Merrill Lynch",
];

const legal_jobs = [
  "partner at Cravath, Swaine & Moore",
  "associate at Sullivan & Cromwell",
  "senior counsel at Skadden, Arps, Slate, Meagher & Flom",
  "litigation partner at Latham & Watkins",
  "corporate lawyer at Simpson Thacher & Bartlett",
  "federal prosecutor in the Southern District of New York",
  "public defender in Manhattan",
  "general counsel at Apple Inc",
  "securities lawyer at Wachtell, Lipton, Rosen & Katz",
  "intellectual property attorney at Fish & Richardson",
  "tax lawyer at Cleary Gottlieb Steen & Hamilton",
  "environmental lawyer at Natural Resources Defense Council",
  "civil rights attorney at the ACLU",
  "Supreme Court clerk",
  "judicial law clerk for the Second Circuit",
];

const medical_jobs = [
  "physician at Mount Sinai Hospital",
  "surgeon at Massachusetts General Hospital",
  "cardiologist at Cleveland Clinic",
  "oncologist at Memorial Sloan Kettering",
  "psychiatrist at McLean Hospital",
  "pediatrician at Children's Hospital of Philadelphia",
  "radiologist at Johns Hopkins Hospital",
  "anesthesiologist at Mayo Clinic",
  "emergency physician at Bellevue Hospital",
  "neurologist at NewYork-Presbyterian",
  "dermatologist at NYU Langone",
  "orthopedic surgeon at Hospital for Special Surgery",
  "infectious disease specialist at the CDC",
  "research scientist at the National Institutes of Health",
  "medical director at Pfizer",
];

const dental_jobs = [
  "dentist in private practice",
  "oral surgeon at NYU College of Dentistry",
  "orthodontist in Manhattan",
  "pediatric dentist at Children's Hospital",
  "endodontist at Mount Sinai Dental",
  "periodontist in private practice",
  "oral and maxillofacial surgeon",
  "prosthodontist at Columbia Dental",
];

const consulting_jobs = [
  "management consultant at McKinsey & Company",
  "senior associate at Bain & Company",
  "principal at Boston Consulting Group",
  "strategy consultant at Deloitte Consulting",
  "senior manager at PricewaterhouseCoopers",
  "director at Accenture",
  "partner at Ernst & Young",
  "management consultant at Booz Allen Hamilton",
  "senior consultant at KPMG",
  "strategy advisor at Oliver Wyman",
  "business analyst at Monitor Deloitte",
  "engagement manager at McKinsey Digital",
  "senior consultant at Capgemini",
  "principal consultant at IBM Global Services",
  "director of strategy at Slalom Consulting",
];

const tech_jobs = [
  "senior software engineer at Google",
  "product manager at Meta",
  "data scientist at Microsoft",
  "software architect at Amazon",
  "machine learning engineer at OpenAI",
  "senior developer at Salesforce",
  "product designer at Apple",
  "engineering manager at Netflix",
  "cybersecurity analyst at Palantir",
  "cloud architect at Amazon Web Services",
  "senior engineer at Uber",
  "data engineer at Airbnb",
  "DevOps engineer at GitHub",
  "AI researcher at DeepMind",
  "principal engineer at Tesla",
];

const media_arts_jobs = [
  "senior editor at The New Yorker",
  "foreign correspondent for The Wall Street Journal",
  "producer at CNN",
  "writer for The Atlantic",
  "documentary filmmaker",
  "curator at the Metropolitan Museum of Art",
  "director of development at the Museum of Modern Art",
  "arts critic for The New York Times",
  "senior editor at Condé Nast",
  "television producer at HBO",
  "literary agent at Creative Artists Agency",
  "book editor at Random House",
  "film producer at A24",
  "music critic for Rolling Stone",
  "gallery director in Chelsea",
];

const academic_jobs = [
  "professor of economics at Columbia University",
  "associate professor of literature at Harwick University",
  "dean of admissions at Yalebrook University",
  "research professor at MIT",
  "visiting scholar at the Brookings Institution",
  "professor of political science at Georgetown University",
  "associate dean at Standford Law School",
  "professor of art history at Princeton University",
  "chair of the English department at Brownfield University",
  "professor of international relations at Johns Hopkins University",
  "visiting professor at Oxford University",
  "research fellow at the American Enterprise Institute",
  "professor of philosophy at University of Chicago",
  "dean of the business school at Northwestern University",
  "professor of public policy at the Kennedy School",
];

const government_jobs = [
  "senior policy advisor at the State Department",
  "deputy chief of staff in the White House",
  "senior counsel to the Attorney General",
  "foreign service officer",
  "policy analyst at the Congressional Budget Office",
  "legislative director for Senator Johnson",
  "senior advisor at the Department of Treasury",
  "program officer at the National Science Foundation",
  "intelligence analyst at the CIA",
  "policy advisor at the Federal Reserve",
  "senior economist at the World Bank",
  "diplomatic attaché to the United Kingdom",
  "senior fellow at the Council on Foreign Relations",
  "policy researcher at the RAND Corporation",
  "program director at the United Nations",
];

const nonprofit_jobs = [
  "program director at the Ford Foundation",
  "senior analyst at Human Rights Watch",
  "development director at Doctors Without Borders",
  "policy advocate at the American Civil Liberties Union",
  "program officer at the Gates Foundation",
  "executive director of Environmental Defense Fund",
  "senior researcher at Amnesty International",
  "policy director at the Brookings Institution",
  "grant writer for the Robin Hood Foundation",
  "program manager at Teach for America",
  "development associate at the Metropolitan Opera",
  "fundraising director at the Whitney Museum",
  "program coordinator at the Red Cross",
  "policy analyst at the Urban Institute",
  "communications director at Greenpeace",
];

const father_jobs = [
  "retired partner at Cravath, Swaine & Moore",
  "former ambassador to the United Kingdom",
  "retired chief executive of General Electric",
  "retired managing director at Goldman Sachs",
  "former federal appellate judge",
  "retired professor of literature at Harwick University",
  "founder of Greentech Innovations",
  "retired surgeon at Massachusetts General Hospital",
  "retired partner at Sullivan & Cromwell",
  "retired investment banker at Morgan Stanley",
  "former chief financial officer of IBM",
  "retired dean of Yalebrook Law School",
  "former deputy secretary of the Treasury",
  "retired admiral in the U.S. Navy",
  "former president of the Rockefeller Foundation",
  "retired professor emeritus at MIT",
  "former chief justice of the state supreme court",
  "retired CEO of Johnson & Johnson",
  "former United Nations ambassador",
  "retired partner at McKinsey & Company",
  "former secretary of Health and Human Services",
  "founder of a biotechnology company",
  "retired colonel in the U.S. Army",
];

const mother_jobs = [
  "philanthropist and board member of the Whitmore Museum",
  "former editor-in-chief of Harper's Bazaar",
  "board chair of the American Heart Association",
  "philanthropist and art collector",
  "former editor-in-chief of Condé Nast",
  "retired professor of art history at Columbia University",
  "former curator at the Whitney Museum",
  "board member of the Metropolitan Opera",
  "former deputy director of the State Department",
  "retired federal judge",
  "former vice president at Goldman Sachs",
  "founder of an educational nonprofit",
  "retired professor of medicine at Johns Hopkins",
  "former ambassador to France",
  "board chair of Doctors Without Borders",
  "former chief marketing officer at IBM",
  "retired partner at Latham & Watkins",
  "founder of a sustainable fashion company",
  "former senior advisor to the President",
  "retired professor of economics at MIT",
  "former director of the National Gallery",
];

const prestigious_jobs = [
  ...finance_jobs,
  ...legal_jobs,
  ...medical_jobs,
  ...dental_jobs,
  ...consulting_jobs,
  ...tech_jobs,
  ...media_arts_jobs,
  ...academic_jobs,
  ...government_jobs,
  ...nonprofit_jobs,
];

const places_met = [
  "at the annual organization fair at their university",
  "during a mock trial competition in college",
  "at a group dinner at a Manhattan restaurant",
  "while sharing an UberPool ride from Manhattan to Brooklyn",
  "at a mutual friend's wedding in the Hamptons",
  "during a Harwick Law School reunion",
  "at a charity gala for the Whitmore Museum",
  "while both working at Goldman Sachs",
  "at a wine tasting in Napa Valley",
  "during a literature conference at Columbia",
  "at their college's debate team tryouts",
  "while summering in Martha's Vineyard",
  "at a friend's rooftop party in SoHo",
  "during a semester abroad at Oxford",
  "at a political fundraiser in Georgetown",
  "while volunteering for Habitat for Humanity",
  "at an art gallery opening in Chelsea",
  "during a sailing regatta in Newport",
  "at their MBA program orientation at Wharton",
  "while hiking in the Adirondacks",
  "at a book club meeting in the Upper East Side",
  "during a Rhodes Scholar reunion",
  "at a chamber music concert at Lincoln Center",
  "while working at the same law firm",
  "at a foreign policy symposium",
  "during a medical conference in Boston",
  "at a technology startup incubator",
  "while studying for the bar exam",
  "at a private equity networking event",
  "during a diplomatic reception",
  "at a sustainable energy conference",
  "while volunteering at a literacy program",
  "at an environmental summit",
  "during a journalism fellowship",
  "at a venture capital mixer",
];

const wedding_venues = [
  "St. Michael's Cathedral in downtown Millbrook",
  "Skyline Armory in Riverside",
  "Edison Grand Ballroom in New York",
  "The Grandview Hotel in Manhattan",
  "Central Park Pavilion",
  "Brooklyn Botanical Gardens",
  "Temple Emmanuel on Fifth Avenue",
  "Four Seasons Hotel New York",
  "Fifth Avenue Presbyterian Church",
  "The Metropolitan Club",
  "Gramercy Park Hotel",
  "the bride's family estate in East Hampton",
  "Stone Barn Center for Sustainable Agriculture",
  "The New York Public Library",
  "One World Observatory",
  "Brooklyn Bridge Park Conservancy",
  "The High Line Hotel",
  "Mandarin Oriental New York",
  "The University Club of New York City",
  "Union Club of the City of New York",
  "the Willowbrook Country Club",
  "Riverside Manor in Connecticut",
  "the family vineyard in Sonoma County",
  "Oceanview Resort in the Hamptons",
  "the bride's ancestral home in Newport",
  "Mountain Lodge in Vermont",
  "the historic Pemberton Estate",
  "Sunset Harbor Yacht Club",
  "the family compound in Martha's Vineyard",
  "Countryside Manor in Westchester",
];

const fake_cities = [
  "Millbrook",
  "Riverside",
  "Brookhaven",
  "Westfield",
  "Fairview",
  "Oakwood",
  "Greenville",
  "Springfield",
  "Madison",
  "Franklin",
  "Georgetown",
  "Arlington",
  "Lexington",
  "Burlington",
  "Ashford",
  "Clearwater",
  "Bridgeport",
  "Woodland",
  "Highland",
  "Lakewood",
];

const officiant_types = [
  "a friend of the couple",
  "a cousin of the groom",
  "a college roommate of the couple",
  "a family friend of the couple",
  "the couple's former professor",
  "The Rev. Dr. Michael Patterson, a Presbyterian minister",
  "David Richardson, a Universal Life minister",
  "Christina Campbell, a friend of the couple who became a Universal Life minister for the event",
  "Rabbi Sarah Goldman",
  "Father Thomas O'Brien, a Catholic priest",
  "Judge Margaret Wilson, a family friend,",
  "The Hon. Robert Stevens, a retired federal judge",
  "Dr. Elizabeth Chen, a Unitarian Universalist minister",
  "The Very Rev. James Morrison, an Episcopal priest",
  "Imam Abdullah Hassan",
  "the couple's former professor who became ordained for the occasion",
];

const medical_degrees = [
  "an M.D. from Johns Hopkins School of Medicine",
  "an M.D. from Harvard Medical School",
  "an M.D. from Stanford University School of Medicine",
];

const dental_degrees = [
  "a D.D.S. from NYU College of Dentistry",
  "a D.M.D. from Harvard School of Dental Medicine",
  "a D.D.S. from Columbia University College of Dental Medicine",
];

const phd_degrees = [
  "a PhD in Art History from Princeton University",
  "a PhD in Economics from MIT", 
  "a PhD in Political Science from Columbia University",
  "a PhD in Computer Science from Carnegie Mellon",
  "a PhD in Psychology from Yalebrook University",
  "a PhD in History from Harwick University",
  "a PhD in Physics from Standford University",
];

const law_degrees = [
  "a J.D. from Harwick Law School",
  "an LL.M. from New York University",
  "a law degree from N.Y.U. School of Law",
  "a law degree from the University of Michigan",
];

const business_degrees = [
  "an M.B.A. with honors from Wharton",
  "a Master's in Business Administration from Northwestern Kellogg",
];

const other_degrees = [
  "a Master's degree in Public Health from Johns Hopkins",
  "a Master's in Social Work from Columbia University",
  "a Doctorate in Literature from Yalebrook University",
  "a Master's in Public Policy from Georgetown University",
  "a Master's in International Relations from Standford University",
  "a Master's in Education from Teachers College",
  "a Master's in Environmental Studies from Berkeley",
  "a Master's in Architecture from MIT",
  "a Master's in Journalism from Columbia",
  "a Master's in Fine Arts from Rhode Island School of Design",
  "a Master's in Urban Planning from MIT",
];

const postgrad_degrees = [
  ...other_degrees,
  ...business_degrees,
  ...law_degrees,
  ...phd_degrees,
  ...medical_degrees,
  ...dental_degrees,
];

const relationship_details = [
  "After several months of friendship, they began dating and quickly realized they shared a passion for philanthropy and public service.",
  "They discovered they had numerous mutual friends and similar career ambitions in law and finance.",
  "Despite initial hesitation, they found they shared values around social justice and environmental sustainability.",
  "They bonded over their shared love of literature and classical music during long conversations.",
  "What began as a professional networking opportunity evolved into a deep personal connection.",
  "They were both immediately drawn to each other's intelligence and wit during their first conversation.",
  "After exchanging business cards, they discovered they had attended the same summer program at Oxford years earlier.",
  "Their first extended conversation revealed they both planned to pursue graduate degrees and had similar academic interests.",
  "They spent hours discussing their shared interest in international development and human rights.",
  "Both were surprised to learn they had grown up in neighboring towns but had never met until college.",
  "They discovered a mutual passion for documentary filmmaking and social entrepreneurship.",
  "Their shared experience as first-generation college graduates created an immediate bond.",
  "They found they both volunteers for the same literacy program, though in different cities.",
  "Both had spent gap years working for educational nonprofits in different countries.",
  "They realized they shared a commitment to criminal justice reform and public interest law.",
];

const story_titles = [
  "A Shared Passion for Justice",
  "Love in the Age of Innovation",
  "Two Hearts, One Mission",
  "A Match Made in Manhattan",
  "Finding Love Through Service",
  "A Modern Romance",
  "Destiny in the Details",
  "Love Across Boroughs",
  "When Worlds Collide",
  "A Meeting of Minds",
  "Serendipity in the City",
  "Love and Professional Ambition",
  "A Tale of Two Scholars",
  "Chemistry in Common",
  "The Perfect Partnership",
  "Unlikely Connections",
  "A Story of Second Chances",
  "Building Something Beautiful Together",
];

const all_universities = [...ivy, ...elite_universities];

const ivy_config = {
  dictionaries: [all_universities],
  length: 1,
  style: "capital",
};

const placemet_config = {
  dictionaries: [places_met],
  length: 1,
};

const venues_config = {
  dictionaries: [wedding_venues],
  length: 1,
};

const offrel_config = {
  dictionaries: [officiant_types],
  length: 1,
};

const postgrad_config = {
  dictionaries: [postgrad_degrees],
  length: 1,
};

const prestigious_jobs_config = {
  dictionaries: [prestigious_jobs],
  length: 1,
};

const father_jobs_config = {
  dictionaries: [father_jobs],
  length: 1,
};

const mother_jobs_config = {
  dictionaries: [mother_jobs],
  length: 1,
};

const special_honors_config = {
  dictionaries: [special_honors],
  length: 1,
};

const cities_config = {
  dictionaries: [fake_cities],
  length: 1,
};

const titles_config = {
  dictionaries: [titles],
  length: 1,
};

const political_titles_config = {
  dictionaries: [political_titles],
  length: 1,
};

const honors_config = {
  dictionaries: [honors],
  length: 1,
};

function generate() {
  var brideName = fakerator.names.nameF();
  var brideMum = fakerator.names.nameF();
  var brideDad = fakerator.names.nameM();
  var brideJob = uniqueNamesGenerator(prestigious_jobs_config);
  var brideFormerJob = uniqueNamesGenerator(prestigious_jobs_config);
  var brideMotherJob = uniqueNamesGenerator(mother_jobs_config);
  var brideFatherJob = uniqueNamesGenerator(father_jobs_config);
  var bridePlace = uniqueNamesGenerator(cities_config);
  var brideGrad = uniqueNamesGenerator(ivy_config);
  var brideGrad2 = uniqueNamesGenerator(ivy_config);
  var brideHonor = uniqueNamesGenerator(honors_config);
  var brideSpecialHonor =
    Math.random() > 0.7 ? uniqueNamesGenerator(special_honors_config) : null;
  // Smart title and degree assignment based on job type
  function getCompatibleTitleAndDegree(job) {
    var title = "";
    var degree = "";
    
    if (medical_jobs.includes(job)) {
      title = Math.random() > 0.3 ? "Dr." : "";
      degree = medical_degrees[Math.floor(Math.random() * medical_degrees.length)];
    } else if (dental_jobs.includes(job)) {
      title = Math.random() > 0.5 ? "" : dental_titles[0]; // Use DDS title
      degree = dental_degrees[Math.floor(Math.random() * dental_degrees.length)];
    } else if (academic_jobs.includes(job)) {
      var usePhD = Math.random() > 0.4;
      title = usePhD && Math.random() > 0.3 ? "Dr." : (Math.random() > 0.5 ? "Professor" : "");
      degree = usePhD ? phd_degrees[Math.floor(Math.random() * phd_degrees.length)] 
                    : other_degrees[Math.floor(Math.random() * other_degrees.length)];
    } else if (legal_jobs.includes(job)) {
      title = Math.random() > 0.8 ? "Judge" : "";
      degree = law_degrees[Math.floor(Math.random() * law_degrees.length)];
    } else if (government_jobs.includes(job)) {
      title = Math.random() > 0.5 ? political_titles[Math.floor(Math.random() * political_titles.length)] : "";
      degree = other_degrees[Math.floor(Math.random() * other_degrees.length)];
    } else if (finance_jobs.includes(job) || consulting_jobs.includes(job)) {
      title = Math.random() > 0.7 ? business_titles[Math.floor(Math.random() * business_titles.length)] : "";
      degree = Math.random() > 0.6 ? business_degrees[Math.floor(Math.random() * business_degrees.length)] 
                                  : other_degrees[Math.floor(Math.random() * other_degrees.length)];
    } else {
      // Default for other jobs
      title = Math.random() > 0.8 ? professional_titles[Math.floor(Math.random() * professional_titles.length)] : "";
      degree = other_degrees[Math.floor(Math.random() * other_degrees.length)];
    }
    
    return { title, degree };
  }
  
  var brideJobInfo = getCompatibleTitleAndDegree(brideJob);
  var brideTitle = brideJobInfo.title;
  var bridePostGrad = brideJobInfo.degree;
  
  var groomName = fakerator.names.nameM();
  var groomGrad = uniqueNamesGenerator(ivy_config);
  var groomDad = fakerator.names.nameM();
  var groomMum = fakerator.names.nameF();
  var groomJob = uniqueNamesGenerator(prestigious_jobs_config);
  var groomFatherJob = uniqueNamesGenerator(father_jobs_config);
  
  // Ensure groom's mother has different job than bride's mother
  var groomMotherJob;
  do {
    groomMotherJob = uniqueNamesGenerator(mother_jobs_config);
  } while (groomMotherJob === brideMotherJob);
  var groomPlace = uniqueNamesGenerator(cities_config);
  var groomHonor = uniqueNamesGenerator(honors_config);
  var groomSpecialHonor =
    Math.random() > 0.7 ? uniqueNamesGenerator(special_honors_config) : null;
  
  // Smart title and degree assignment for groom based on job type
  var groomJobInfo = getCompatibleTitleAndDegree(groomJob);
  var groomTitle = groomJobInfo.title;
  var groomPostGrad = groomJobInfo.degree;
  var state = faker.address.state();
  var bstate = faker.address.state();
  var gstate = faker.address.state();
  var brideAge = (Math.floor(Math.random() * 15) + 25).toString();
  var groomAge = (Math.floor(Math.random() * 15) + 25).toString();
  var officiant = uniqueNamesGenerator(offrel_config);
  var wherePlace = uniqueNamesGenerator(placemet_config);
  var whereLocation = uniqueNamesGenerator(cities_config);
  var venue = uniqueNamesGenerator(venues_config);
  var meetingStory =
    relationship_details[
      Math.floor(Math.random() * relationship_details.length)
    ];
  var storyTitle =
    story_titles[Math.floor(Math.random() * story_titles.length)];

  // Add some randomness to include/exclude certain elements
  var includeBrideFormer = Math.random() > 0.5;
  var includeGroomPostGrad = Math.random() > 0.6;
  var includeBrideTitle = Math.random() > 0.7;
  var includeGroomTitle = Math.random() > 0.7;

  // Create proper graduation text
  function createGraduationText(honor, specialHonor, university) {
    if (specialHonor) {
      return `graduated ${honor} from ${university}. She was ${specialHonor}`;
    } else {
      return `graduated ${honor} from ${university}`;
    }
  }

  function createGroomGraduationText(honor, specialHonor, university) {
    if (specialHonor) {
      return `graduated ${honor} from ${university}. He was ${specialHonor}`;
    } else {
      return `graduated ${honor} from ${university}`;
    }
  }

  var brideGradText = createGraduationText(
    brideHonor,
    brideSpecialHonor,
    brideGrad
  );
  var groomGradText = createGroomGraduationText(
    groomHonor,
    groomSpecialHonor,
    groomGrad
  );

  // This is the Tracery grammar.
  let notes = {
    bride: [brideName],
    groom: [groomName],
    brideage: [brideAge],
    groomage: [groomAge],
    venue: [venue],
    state: [state],
    bstate: [bstate],
    gstate: [gstate],
    officiant: [officiant],
    bridejob: [brideJob],
    bridplace: [bridePlace],
    brideformer: [brideFormerJob],
    bridegrad: [brideGrad],
    bridegrad2: [brideGrad2],
    bridepostgrad: [bridePostGrad],
    bridegradtext: [brideGradText],
    groomgradtext: [groomGradText],
    bridetitle: [brideTitle],
    bridemum: [brideMum],
    bridedad: [brideDad],
    brideplace: [bridePlace],
    bridefatherjob: [brideFatherJob],
    bridemotherjob: [brideMotherJob],
    groomjob: [groomJob],
    groomgrad: [groomGrad],
    groomhonor: [groomHonor],
    groompostgrad: [groomPostGrad],
    groomtitle: [groomTitle],
    groommum: [groomMum],
    groomdad: [groomDad],
    groomplace: [groomPlace],
    groommotherjob: [groomMotherJob],
    groomfatherjob: [groomFatherJob],
    whereplace: [wherePlace],
    wherelocation: [whereLocation],
    meetingstory: [meetingStory],
    storytitle: [storyTitle],
    origin: [
      `
<div id="results">
<h2>#bride#, #groom#</h2>

<p>#bride# and #groom# were married Saturday at #venue#. #officiant# officiated.</p>

<p>${
        includeBrideTitle ? "#bridetitle# " : ""
      }#bride#, #brideage#, is a #bridejob#. She #bridegradtext# and received #bridepostgrad#.${
        includeBrideFormer ? " She was previously a #brideformer#." : ""
      }</p>

<p>She is a daughter of #bridemum# and #bridedad# of #brideplace#, #bstate#. Her father is a #bridefatherjob# and her mother is a #bridemotherjob#.</p>
    
<p>${
        includeGroomTitle ? "#groomtitle# " : ""
      }#groom#, #groomage#, is a #groomjob#. He #groomgradtext#${
        includeGroomPostGrad ? " and received #groompostgrad#" : ""
      }.</p>
    
<p>He is a son of #groommum# and #groomdad# of #groomplace#, #gstate#. His mother is a #groommotherjob# and his father is a #groomfatherjob#.</p>
    
<p>The couple met #whereplace# in #wherelocation#. #meetingstory#</p>
</div>
`,
      `
<div id="results">
<h2>#storytitle#: #bride# and #groom#</h2>

<p>#bride# and #groom# were married Saturday evening at #venue#. #officiant# officiated.</p>

<p>${
        includeBrideTitle ? "#bridetitle# " : ""
      }#bride#, #brideage#, who is keeping her name, is a #bridejob#. She #bridegradtext# and received #bridepostgrad#.</p>

<p>She is a daughter of #bridemum# and #bridedad# of #brideplace#, #bstate#. Her mother is a #bridemotherjob# and her father is a #bridefatherjob#.</p>
    
<p>${
        includeGroomTitle ? "#groomtitle# " : ""
      }#groom#, also #groomage#, is a #groomjob#. He #groomgradtext#${
        includeGroomPostGrad ? " and received #groompostgrad#" : ""
      }.</p>
    
<p>He is a son of #groommum# and #groomdad# of #groomplace#, #gstate#. His father is a #groomfatherjob# and his mother is a #groommotherjob#.</p>
    
<p>The couple first met #whereplace# in #wherelocation#. #meetingstory# They have been together since 2019.</p>
</div>
`,
      `
<div id="results">
<h2>#bride#, #groom#</h2>

<p>#bride# and #groom# were married Friday evening at #venue#. #officiant# officiated.</p>

<p>${
        includeBrideTitle ? "#bridetitle# " : "Ms. "
      }#bride#, #brideage#, is a #bridejob#. She #bridegradtext# and received #bridepostgrad#.${
        includeBrideFormer ? " She was previously a #brideformer#." : ""
      }</p>

<p>She is the daughter of #bridemum# and #bridedad# of #brideplace#, #bstate#. Her mother is a #bridemotherjob# and her father is a #bridefatherjob#.</p>
    
<p>${
        includeGroomTitle ? "#groomtitle# " : "Mr. "
      }#groom#, #groomage#, is a #groomjob#. He #groomgradtext#.</p>
    
<p>He is the son of #groommum# and #groomdad# of #groomplace#, #gstate#. His mother is a #groommotherjob# and his father is a #groomfatherjob#.</p>
    
<p>The couple met #whereplace# in #wherelocation# in 2018. #meetingstory#</p>
</div>
`,
    ],
  };

  var AnnounceGrammar = tracery.createGrammar(notes);
  var results = AnnounceGrammar.flatten("#origin#");
  return results;
}

app.disable("etag");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.post("/", function (req, res) {
  try {
    console.log(
      `${new Date().toISOString()} - Generating wedding announcement`
    );
    var results = generate();
    res.setHeader("Content-Type", "text/html");
    res.send(results);
    console.log(
      `${new Date().toISOString()} - Successfully generated announcement`
    );
  } catch (error) {
    console.error(
      `${new Date().toISOString()} - Error generating announcement:`,
      error
    );
    res.status(500).send(`
      <div class="error-message">
        <h3>Generation Error</h3>
        <p>Sorry, we encountered an error while crafting your wedding announcement.</p>
        <p>Please try again in a moment.</p>
      </div>
    `);
  }
});

// Add 404 handler
app.use(function (req, res) {
  res.status(404).send(`
    <html>
      <head><title>Page Not Found</title></head>
      <body style="font-family: Georgia, serif; text-align: center; padding: 50px;">
        <h1>404 - Page Not Found</h1>
        <p>The page you're looking for doesn't exist.</p>
        <p><a href="/" style="color: #000;">← Return to Wedding Announcer</a></p>
      </body>
    </html>
  `);
});

// Add error handler
app.use(function (err, req, res, next) {
  console.error(`${new Date().toISOString()} - Server error:`, err);
  res.status(500).send(`
    <html>
      <head><title>Server Error</title></head>
      <body style="font-family: Georgia, serif; text-align: center; padding: 50px;">
        <h1>Server Error</h1>
        <p>Something went wrong on our end.</p>
        <p><a href="/" style="color: #000;">← Return to Wedding Announcer</a></p>
      </body>
    </html>
  `);
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  const port = listener.address().port;
  console.log("🎩 NYT Wedding Announcer is running!");
  console.log(`📡 Server listening on port ${port}`);
  console.log(`🌐 Visit: http://localhost:${port}`);
  console.log(`💼 Ready to generate wedding announcements!`);
});
