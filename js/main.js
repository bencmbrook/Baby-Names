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
var countVis = new MapVis("map-area", eventHandler);
$(eventHandler).bind("click", function() {
  
});
