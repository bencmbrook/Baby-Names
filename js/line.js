LineVis = function(_parentElement){
  this.parentElement = _parentElement;

	this.initVis();
};

LineVis.prototype.initVis = function() {
  var vis = this;
  vis.margin = { top: 1, right: 0, bottom: 20, left: 50 };

  vis.width = $("#"+vis.parentElement).width() - vis.margin.left - vis.margin.right;
  vis.height = 352 - vis.margin.top - vis.margin.bottom;

  // Set ranges
  vis.x = d3.scale.linear().range([0, vis.width]);
  vis.y = d3.scale.linear().range([vis.height, 0]);

  // Define the axes
  vis.xAxis = d3.svg.axis().scale(vis.x)
      .orient("bottom").ticks(5)
      .tickFormat(d3.format("d"));

  vis.yAxis = d3.svg.axis().scale(vis.y)
      .orient("left").ticks(5)
      .tickFormat(d3.format(".0%"));

  // Define the line
  vis.valueline = d3.svg.line()
    .x(function(d, i) { return vis.x(i + 1910); })
    .y(function(d) { return vis.y(d.PercentForeign / 100); });

  // Adds the svg canvas
  vis.svg = d3.select("#"+vis.parentElement)
    .append("svg")
      .attr("width", vis.width + vis.margin.left + vis.margin.right)
      .attr("height", vis.height + vis.margin.left + vis.margin.right)
    .append("g")
      .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");


  queue()
    .defer(d3.json, "data/pred.json")
    .defer(d3.json, "data/y.json")
    .await(ready);

  function ready(error, pred, y) {
    vis.allData = pred;
    // Turn state data into arrays
    for (var state in pred) {
      if (pred.hasOwnProperty(state)) {
        vis.allData[state] = $.map(pred[state], function(value, index) {
          return [value];
        });
      }
    }
    // Turn state data into arrays
    vis.allY = y;
    for (state in y) {
      if (y.hasOwnProperty(state)) {
        vis.allY[state] = $.map(y[state], function(value, index) {
          return [value];
        });
      }
    }

    // Use MA to start
    vis.data = vis.allData.MA;

    // Scale the range of the data
    vis.x.domain(d3.extent(vis.data, function(d, i) { return i + 1910; }));
    vis.y.domain([0, d3.max(vis.data, function(d) { return d.PercentForeign / 100; })]);

    // Add the valueline path.
    vis.svg.append("path")
        .attr("class", "line")
        .attr("d", vis.valueline(vis.data));

    // Add vertical lines
    vis.svg.append("path")
        .attr("class", "vertline")
        .attr("d", [
          "M"+vis.x(1924)+" 10 V "+vis.y(0),
          "M"+vis.x(1965)+" 10 V "+vis.y(0),
          "M"+vis.x(1990)+" 10 V "+vis.y(0),
          ]
        );

    // Add vertical line labels
    vis.svg.append("text")
        .attr("class", "vertlabel")
        .attr("x", vis.x(1924) + 5)
        .attr("y", 20)
        .text("Immigration Act");

    vis.svg.append("text")
        .attr("class", "vertlabel")
        .attr("x", vis.x(1965) + 5)
        .attr("y", 20)
        .text("Partial repeal");

    vis.svg.append("text")
        .attr("class", "vertlabel")
        .attr("x", vis.x(1990) + 5)
        .attr("y", 20)
        .text("Full repeal");

    // Add the X Axis
    vis.svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + vis.height + ")")
        .call(vis.xAxis);

    // Add the Y Axis
    vis.svg.append("g")
        .attr("class", "y axis")
        .call(vis.yAxis);

    vis.updateVis("MA");
  }
};

LineVis.prototype.updateVis = function(stateName) {
  var vis = this;

  // Get data for this state
  vis.data = vis.allData[stateName];

  // Scale the range of the data again
  vis.x.domain(d3.extent(vis.data, function(d, i) { return i + 1910; }));
  vis.y.domain([0, d3.max(vis.data, function(d) { return d.PercentForeign / 100; })]);

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
