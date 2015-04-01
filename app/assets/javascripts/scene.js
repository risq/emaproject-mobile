let THREE = require('n3d-threejs');
let TWEEN = require('tween');


let width = window.innerWidth;
let height = window.innerHeight;

let scene, camera, renderer, cube;
 
function init () {

	scene = new THREE.Scene()
	camera = new THREE.PerspectiveCamera( 45, width/height, 0.1, 10000 );
	renderer = new THREE.WebGLRenderer();

	renderer.setSize(width, height);

	document.body.appendChild( renderer.domElement );

	let geometry = new THREE.BoxGeometry( 1, 1, 1 );
	let material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );

	cube = new THREE.Mesh( geometry, material );
	scene.add( cube );

	camera.position.z = 5;

	animate();

}


 
function animate () {

	requestAnimationFrame( animate );
	update();
	render();

}
 
function update() {

	cube.rotation.x += 0.1;
	cube.rotation.y += 0.1;

}
 
function render(){

	renderer.render( scene, camera );
	
}
 

module.exports = {

	init: init

}