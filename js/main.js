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

// Listen for onclick event on state
$(eventHandler).bind("stateSelected", function(_, state) {
  console.log(state);
  MapVis.updateVis(100);
});
