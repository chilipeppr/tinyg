// This file does nothing
// It's just here to coerce require.js into
// ensuring that the ChiliPeppr app.js is completely
// run already, so that anything needing $.chiliPeppr
// defined can rely upon it
require(["chilipeppr_init2"], function() {
	//console.log("chilipeppr_init App.js is loaded, so the root chilipeppr object is defined.");
	//requirejs(["chilipeppr_ready"], function(cpready) {
		//define(["chilipeppr_ready"], function() {
			//console.log("ChiliPeppr Run-level 3: chilipeppr_ready Main.js is loaded now.");
			//console.log(chilipeppr);
			
			/*
			// test pubsub
			chilipeppr.subscribe("test", this, function(data) {
				console.log("Got my test subscription event. data: " + data);
			}, 1);
			chilipeppr.subscribe("test", function(data) {
				console.log("Got my test subscription event from simplified subscribe call. data: " + data);
			});
			chilipeppr.publish("test", "this is your data");
			*/
		//});
		
	//});
});