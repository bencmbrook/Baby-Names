LineVis = function(_parentElement){
  this.parentElement = _parentElement;

	this.initVis();
};

LineVis.prototype.initVis = function() {
  var vis = this;
  vis.margin = { top: 0, right: 0, bottom: 0, left: 0 };

  vis.width = 960 - vis.margin.left - vis.margin.right;
  vis.height = 500 - vis.margin.top - vis.margin.bottom;

  // Set ranges
  vis.x = d3.scale.linear().range([0, vis.width]);
  vis.y = d3.scale.linear().range([vis.height, 0]);

  // Define the axes
  vis.xAxis = d3.svg.axis().scale(vis.x)
      .orient("bottom").ticks(5);

  vis.yAxis = d3.svg.axis().scale(vis.y)
      .orient("left").ticks(5);

  // Define the line
  vis.valueline = d3.svg.line()
    .x(function(d, i) { return x(i); })
    .y(function(d) { return y(d.PercentForeign); });

  // Adds the svg canvas
  vis.svg = d3.select("#"+vis.parentElement)
    .append("svg")
      .attr("width", vis.width + vis.margin.left + vis.margin.right)
      .attr("height", vis.height + vis.margin.left + vis.margin.right)
    .append("g")
      .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");

  vis.svg = d3.select("#"+vis.parentElement).append("svg")
    .attr("width", vis.width)
    .attr("height", vis.height);

  d3.json("data/pred.json", ready);

  function ready(error, pred) {
    // Scale the range of the data
    vis.x.domain(d3.extent(vis.data, function(d, i) { return i; }));
    vis.y.domain([0, d3.max(vis.data, function(d) { return d.PercentForeign; })]);

    // Add the valueline path.
    vis.svg.append("path")
        .attr("class", "line")
        .attr("d", vis.valueline(vis.data));

    // Add the X Axis
    vis.svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + vis.height + ")")
        .call(vis.xAxis);

    // Add the Y Axis
    vis.svg.append("g")
        .attr("class", "y axis")
        .call(vis.yAxis);

    vis.updateVis(0);
  }
};

LineVis.prototype.updateVis = function(year) {
  var vis = this;

  // Scale the range of the data again
  vis.x.domain(d3.extent(vis.data, function(d, i) { return i; }));
  vis.y.domain([0, d3.max(vis.data, function(d) { return d.PercentForeign; })]);

  // Select the section we want to apply our changes to
  vis.svg = d3.select("#"+vis.parentElement).transition();

  // Make the changes
  vis.svg.select(".line")   // change the line
      .duration(750)
      .attr("d", vis.valueline(vis.data));
  vis.svg.select(".x.axis") // change the x axis
      .duration(750)
      .call(vis.xAxis);
  vis.svg.select(".y.axis") // change the y axis
      .duration(750)
      .call(vis.yAxis);
};
