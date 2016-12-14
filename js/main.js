// // (1) Load data asynchronously
// queue()
//   .defer(d3.json, "data/us-states.json")
//   .defer(d3.json, "data/pred.json")
//   .await(createVis);
//
// function createVis(error, us, pred) {
// 	if(error) { console.log(error); }
//
// 	// (2) Make our data look nicer and more useful
// }

var eventHandler = {};
var MapVis = new MapVis("map-area", eventHandler);
var LineVis = new LineVis("line-area");

// Listen for onclick event on state
$(eventHandler).bind("stateSelected", function(_, stateName) {
  LineVis.updateVis(stateName);
  $("#line-title").text(stateHash[stateName]);
});

// Slider
d3.select('#slider').call(
  d3.slider()
    .axis(true)
    .min(1910)
    .max(2014)
    .step(1)
    .on("slide", function(_, year) {
      MapVis.updateVis(year-1910);
    })
);

var stateHash = {
    "AL": "Alabama",
    "AK": "Alaska",
    "AS": "American Samoa",
    "AZ": "Arizona",
    "AR": "Arkansas",
    "CA": "California",
    "CO": "Colorado",
    "CT": "Connecticut",
    "DE": "Delaware",
    "DC": "District Of Columbia",
    "FM": "Federated States Of Micronesia",
    "FL": "Florida",
    "GA": "Georgia",
    "GU": "Guam",
    "HI": "Hawaii",
    "ID": "Idaho",
    "IL": "Illinois",
    "IN": "Indiana",
    "IA": "Iowa",
    "KS": "Kansas",
    "KY": "Kentucky",
    "LA": "Louisiana",
    "ME": "Maine",
    "MH": "Marshall Islands",
    "MD": "Maryland",
    "MA": "Massachusetts",
    "MI": "Michigan",
    "MN": "Minnesota",
    "MS": "Mississippi",
    "MO": "Missouri",
    "MT": "Montana",
    "NE": "Nebraska",
    "NV": "Nevada",
    "NH": "New Hampshire",
    "NJ": "New Jersey",
    "NM": "New Mexico",
    "NY": "New York",
    "NC": "North Carolina",
    "ND": "North Dakota",
    "MP": "Northern Mariana Islands",
    "OH": "Ohio",
    "OK": "Oklahoma",
    "OR": "Oregon",
    "PW": "Palau",
    "PA": "Pennsylvania",
    "PR": "Puerto Rico",
    "RI": "Rhode Island",
    "SC": "South Carolina",
    "SD": "South Dakota",
    "TN": "Tennessee",
    "TX": "Texas",
    "UT": "Utah",
    "VT": "Vermont",
    "VI": "Virgin Islands",
    "VA": "Virginia",
    "WA": "Washington",
    "WV": "West Virginia",
    "WI": "Wisconsin",
    "WY": "Wyoming"
};
