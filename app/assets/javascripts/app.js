/**
 * Created by jerek0 on 01/04/2015.
 */

let scene = require('./scene');

scene.init();

setInterval(function() {
	scene.highlightNext();
}, 5000);