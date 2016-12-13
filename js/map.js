var width = 960,
  height = 500;

var radius = d3.scale.sqrt()
  .domain([0, 1e6])
  .range([0, 10]);

var path = d3.geo.path();

var color = d3.scale.category20();

var svg = d3.select("#map-area").append("svg")
  .attr("width", width)
  .attr("height", height);

queue()
  .defer(d3.json, "data/us.json")
  .defer(d3.json, "data/us-state-centroids.json")
  .defer(d3.json, "data/pred.json")
  .await(ready);

function ready(error, us, centroid, pred) {
  var countries = topojson.feature(us, us.objects.states).features,
      neighbors = topojson.neighbors(us.objects.states.geometries);

  svg.selectAll("states")
    .data(countries)
    .enter().insert("path", ".graticule")
    .attr("class", "states")
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
