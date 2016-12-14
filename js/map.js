states_hash =
  {
    'Alabama': 'AL',
    'Alaska': 'AK',
    'American Samoa': 'AS',
    'Arizona': 'AZ',
    'Arkansas': 'AR',
    'California': 'CA',
    'Colorado': 'CO',
    'Connecticut': 'CT',
    'Delaware': 'DE',
    'District of Columbia': 'DC',
    'Federated States Of Micronesia': 'FM',
    'Florida': 'FL',
    'Georgia': 'GA',
    'Guam': 'GU',
    'Hawaii': 'HI',
    'Idaho': 'ID',
    'Illinois': 'IL',
    'Indiana': 'IN',
    'Iowa': 'IA',
    'Kansas': 'KS',
    'Kentucky': 'KY',
    'Louisiana': 'LA',
    'Maine': 'ME',
    'Marshall Islands': 'MH',
    'Maryland': 'MD',
    'Massachusetts': 'MA',
    'Michigan': 'MI',
    'Minnesota': 'MN',
    'Mississippi': 'MS',
    'Missouri': 'MO',
    'Montana': 'MT',
    'Nebraska': 'NE',
    'Nevada': 'NV',
    'New Hampshire': 'NH',
    'New Jersey': 'NJ',
    'New Mexico': 'NM',
    'New York': 'NY',
    'North Carolina': 'NC',
    'North Dakota': 'ND',
    'Northern Mariana Islands': 'MP',
    'Ohio': 'OH',
    'Oklahoma': 'OK',
    'Oregon': 'OR',
    'Palau': 'PW',
    'Pennsylvania': 'PA',
    'Puerto Rico': 'PR',
    'Rhode Island': 'RI',
    'South Carolina': 'SC',
    'South Dakota': 'SD',
    'Tennessee': 'TN',
    'Texas': 'TX',
    'Utah': 'UT',
    'Vermont': 'VT',
    'Virgin Islands': 'VI',
    'Virginia': 'VA',
    'Washington': 'WA',
    'West Virginia': 'WV',
    'Wisconsin': 'WI',
    'Wyoming': 'WY'
  };

var width = 960,
  height = 500;

var radius = d3.scale.sqrt()
  .domain([0, 1e6])
  .range([0, 10]);

var path = d3.geo.path();

// var color = d3.scale.Sequential(d3.interpolatePiYG);

var color = d3.scale.linear()
  .domain([0,20])
  .interpolate(d3.interpolateRgb)
  .range(['black', 'white']);

var svg = d3.select("#map-area").append("svg")
  .attr("width", width)
  .attr("height", height);

queue()
  // .defer(d3.json, "data/us.json")
  .defer(d3.json, "data/us-states.json")
  .defer(d3.json, "data/us-state-centroids.json")
  .defer(d3.json, "data/pred.json")
  .await(ready);

function ready(error, us, centroid, pred) {
  // var countries = topojson.feature(us, us.objects.states).features;
  var countries = us.features;
  // var neighbors = topojson.neighbors(us.objects.states.geometries);

  svg.selectAll("states")
    .data(countries)
    .enter().insert("path", ".graticule")
    .attr("class", "states")
    .attr("fill", function(d) {
      state_code = states_hash[d.properties.name];
      console.log(state_code);
      return color(d.properties.density);
    })
    .attr("d", path)
    .on('mouseover', function(d, i) {
      var currentState = this;
      d3.select(this).style('fill-opacity', 1);
    })
    .on('mouseout', function(d, i) {
      d3.selectAll('path')
      .style({
        'fill-opacity':0.7
      });
    });
}
