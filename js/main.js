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
$(eventHandler).bind("stateSelected", function(_, stateData) {
  console.log(stateData);
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
