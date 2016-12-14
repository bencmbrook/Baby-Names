LineVis = function(_parentElement){
  this.parentElement = _parentElement;

	this.initVis();
};

LineVis.prototype.initVis = function() {
  var vis = this;
  vis.margin = { top: 0, right: 0, bottom: 0, left: 0 };

  vis.width = 400 - vis.margin.left - vis.margin.right;
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
    vis.features = us.features;
    vis.data = pred;

    var states = vis.svg.selectAll(".states")
      .data(vis.features)
      .enter().insert("path", ".graticule")
      .attr("class", "states")
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
      })
      .attr("fill", function(d) {
        state_code = states_hash[d.properties.name];
        if (state_code === "PR") { return "white"; }
        else {
          state_pred = vis.data[state_code]['0'].PercentForeign;
          return vis.color(state_pred);
        }
      });

    vis.updateVis(0);
  }
};

LineVis.prototype.updateVis = function(year) {
  var vis = this;

  vis.svg.selectAll(".states")
    .transition()
    .duration(500)
    .attr("fill", function(d) {
      state_code = states_hash[d.properties.name];
      if (state_code === "PR") { return "white"; }
      else {
        state_pred = vis.data[state_code][year].PercentForeign;
        return vis.color(state_pred);
      }
    });
};
