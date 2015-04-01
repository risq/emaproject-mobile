let THREE = require('n3d-threejs');
let TWEEN = require('tween');
let Stats = require('stats-js');

let Bar = require('./Bar');


let width = window.innerWidth;
let height = window.innerHeight;

let scene, 
	stats,
	camera, 
	renderer,
	light,
	barsContainer;

let bars = {
	t0: [],
	t1: [],
	t2: []
};

let initDate;

const nbBars = 256; 
 
function init () {

	initDate = Date.now();

	stats = new Stats();

	stats.domElement.style.position = 'absolute';
	stats.domElement.style.left = '0px';
	stats.domElement.style.top = '0px';
	 
	document.body.appendChild( stats.domElement );

	scene = new THREE.Scene();
	
	camera = new THREE.PerspectiveCamera( 45, width/height, 0.1, 10000 );
	camera.position.z = 5;

	light = new THREE.DirectionalLight( 0xffffff ); // soft white light
	light.position.set( 0, 0, 2 );
	scene.add( light );
	
	renderer = new THREE.WebGLRenderer({
		antialias: true
	});

	renderer.setSize( width, height );

	document.body.appendChild( renderer.domElement );

	barsContainer = new THREE.Object3D();
	scene.add( barsContainer );

	generateBars();

	animate();


}
 
function animate () {

	requestAnimationFrame( animate );
	update();
	render();

}
 
function update () {

	stats.update();

	let time = Date.now() - initDate;

	let sin1 = Math.sin(time * 0.001) * 0.1;
	let sin2 = Math.sin(time * 0.001 + 2 * Math.PI / 3) * 0.1;
	let sin3 = Math.sin(time * 0.001 + 4 * Math.PI / 3) * 0.1;

	bars.t0.forEach(bar => {
		bar.mesh.position.y = sin3 * 0.1;
		bar.mesh.position.z = sin1;
	})
	bars.t1.forEach(bar => {
		bar.mesh.position.y = sin1 * 0.1;
		bar.mesh.position.z = sin2;
	})
	bars.t2.forEach(bar => {
		bar.mesh.position.y = sin2 * 0.1;
		bar.mesh.position.z = sin3;
	})

}
 
function render () {

	renderer.render( scene, camera );
	
}

function generateBars () {
	
	let randWidth, randHeight, randType, randX, randOpacity, size, pos, bar;


	for ( let i = 0; i < nbBars; i++ ) {

		randWidth =  Math.random() / 30;
		randHeight =  Math.random() * 5;
		randX = (randomInt(0, 560) - 280 ) / 100;
		randType = randomInt(0, 2);
		randOpacity = randomInt(7, 10) * 0.1;

		size = new THREE.Vector3( randWidth, randHeight, randWidth * 10 );
		pos = new THREE.Vector3( randX, 0, 0 );

		bar = new Bar( size, pos, randType, randOpacity );

		bars['t' + randType].push(bar);
		
		scene.add(bar.mesh);

	}

	console.log(bars);



}

function randomInt ( min, max ) {

    return Math.floor( Math.random() * ( max - min + 1 ) + min );

}
 

module.exports = {

	init: init

}