let THREE = require('n3d-threejs');
let TWEEN = require('tween');

let Bar = require('./Bar');


let width = window.innerWidth;
let height = window.innerHeight;

let scene, 
	camera, 
	renderer,
	light,
	barsContainer;

let bars;

const nbBars = 512; 
 
function init () {

	scene = new THREE.Scene()
	
	camera = new THREE.PerspectiveCamera( 45, width/height, 0.1, 10000 );
	camera.position.z = 5;

	light = new THREE.DirectionalLight( 0xffffff ); // soft white light
	light.position.set( 0, 0, 2 );
	scene.add( light );
	
	renderer = new THREE.WebGLRenderer();

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

}
 
function render () {

	renderer.render( scene, camera );
	
}

function generateBars () {
	
	let randWidth, randHeight, randX, size, pos, bar;


	for ( let i = 0; i < nbBars; i++ ) {

		randWidth =  Math.random() / 50;
		randHeight =  Math.random() * 5;
		randX = (randomInt(0, 560) - 280 ) / 100;

		size = new THREE.Vector3( randWidth, randHeight, randWidth * 10 );
		pos = new THREE.Vector3( randX, 0, 0 );

		bar = new Bar( size, pos, randomInt(0, 3) );
		
		scene.add(bar.mesh);

	}



}

function randomInt ( min, max ) {

    return Math.floor( Math.random() * ( max - min + 1 ) + min );

}
 

module.exports = {

	init: init

}