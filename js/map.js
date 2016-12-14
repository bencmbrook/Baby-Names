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

MapVis = function(_parentElement, _eventHandler){
  this.parentElement = _parentElement;
	this.eventHandler = _eventHandler;

	this.initVis();
};

MapVis.prototype.initVis = function() {
  var vis = this;
  vis.margin = { top: 0, right: 0, bottom: 0, left: 0 };

  vis.width = 960 - vis.margin.left - vis.margin.right;
  vis.height = 500 - vis.margin.top - vis.margin.bottom;

  vis.path = d3.geo.path();

  vis.color = d3.scale.linear()
    .domain([0,27])
    .interpolate(d3.interpolateRgb)
    .range(['white', 'orange']);

  vis.svg = d3.select("#"+vis.parentElement).append("svg")
    .attr("width", vis.width)
    .attr("height", vis.height);

  queue()
    .defer(d3.json, "data/us-states.json")
    .defer(d3.json, "data/pred.json")
    .await(ready);

  function ready(error, us, pred) {
    vis.data = us.features;

    vis.svg.selectAll("states")
      .data(vis.data)
      .enter().insert("path", ".graticule")
      .attr("class", "states")
      .attr("fill", function(d) {
        state_code = states_hash[d.properties.name];
        if (state_code === "PR") { return "white"; }
        else {
          state_pred = pred[state_code]['0'].PercentForeign;
          return vis.color(state_pred);
        }
      })
      .attr("d", vis.path)
      .on('mouseover', function(d, i) {
        var currentState = this;
        d3.select(this)
          .style("fill-opacity", "0.5");
      })
      .on('mouseout', function(d, i) {
        d3.selectAll('path')
          .style("fill-opacity", "1");
      })
      .on('click', function(d, i) {
        $(vis.eventHandler).trigger("stateSelected", states_hash[d.properties.name]);
      });
  }
};
