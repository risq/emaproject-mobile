let THREE = require('n3d-threejs');
let TWEEN = require('tween.js');
let Stats = require('stats-js');
let Bar = require('./Bar');
let $ = require('jquery');
let width = window.innerWidth;
let height = window.innerHeight;

let scene, 
	stats,
	camera, 
	renderer,
	light,
	rootContainer,
	texture,
    onClickCallback;

let bars = {
	t0: {
		container: new THREE.Object3D(),
		objects: []
	},
	t1: {
		container: new THREE.Object3D(),
		objects: []
	},
	t2: {
		container: new THREE.Object3D(),
		objects: []
	}
};

let initTime, currentTime;

let currentHighlighted = -1;

let startX, startY, moveX, moveY;


const nbBars = 64; 
 
function init () {

	initTime = Date.now();

	stats = new Stats();

	stats.domElement.style.position = 'absolute';
	stats.domElement.style.left = '0px';
	stats.domElement.style.top = '0px';
	 
	document.body.appendChild( stats.domElement );

	scene = new THREE.Scene();
	
	camera = new THREE.PerspectiveCamera( 60, width/height, 0.1, 10000 );
	camera.position.z = 2.5;

	light = new THREE.DirectionalLight( 0xffffff , 0.5); // soft white light
	light.position.set( 0, 0, 2 );
	scene.add( light );
	
	renderer = new THREE.WebGLRenderer({
		antialias: true
	});

	renderer.setSize( width, height );
	renderer.setClearColor(0x141A33);

	document.body.appendChild( renderer.domElement );

	rootContainer = new THREE.Object3D();

	rootContainer.add( bars.t0.container );
	rootContainer.add( bars.t1.container );
	rootContainer.add( bars.t2.container );
	
	scene.add( rootContainer );


	texture = THREE.ImageUtils.loadTexture('/assets/images/texture.png', {}, function () {
		generateBars();
	});

	initEvents();

	animate();


}

function setOnClick( callback ) {
    
    onClickCallback = callback;
    
}
 
function animate () {

	requestAnimationFrame( animate );
	update();
	render();

}
 
function update () {

	stats.update();
	TWEEN.update();

	// camera.rotation.z += 0.001;

	let lastTime = currentTime;
	currentTime = Date.now() - initTime;
    

	let sin1 = Math.sin(currentTime * 0.001) * 0.1;
	let sin2 = Math.sin(currentTime * 0.001 + 2 * Math.PI / 3) * 0.1;
	let sin3 = Math.sin(currentTime * 0.001 + 4 * Math.PI / 3) * 0.1;

	bars.t0.objects.forEach(bar => {
		bar.mesh.position.y = sin3 * 0.4 * bar.randConst;
		// bar.mesh.position.z = sin1 * 0.5 * bar.randConst;
		// bar.mesh.rotation.x = sin1 * 0.01;
	});
	bars.t1.objects.forEach(bar => {
		bar.mesh.position.y = sin1 * 0.4 * bar.randConst;
		// bar.mesh.position.z = sin2 * 0.5 * bar.randConst;
		// bar.mesh.rotation.x = sin2 * 0.01;
	});
	bars.t2.objects.forEach(bar => {
		bar.mesh.position.y = sin2 * 0.4 * bar.randConst;
		// bar.mesh.position.z = sin3 * 0.5 * bar.randConst;
		// bar.mesh.rotation.x = sin3 * 0.01;
	});

	if ( moveX && moveX > -1 ) {

		rootContainer.rotation.set(0, - moveX , 0 );

	} else if ( moveX === -1 )  {

		var tween = new TWEEN.Tween( rootContainer.rotation, { y: rootContainer.rotation.y } )
			.to( { y: 0 }, 400 )
			.easing( TWEEN.Easing.Quartic.InOut )
			.start();

		moveX = null;
	}

}
 
function render () {

	renderer.render( scene, camera );
	
}

function generateBars () {
	
	let randWidth, randHeight, randType, randX, randZ, randOpacity, size, pos, bar;


	for ( let i = 0; i < nbBars; i++ ) {

		randWidth =  0.01 + Math.random() / 20;
		randHeight =  0.5 + Math.random() * 1;
		randX = ( randomInt( 0, 100 ) - 50 ) / 90;
		randZ = Math.random() - 0.5;
		randType = randomInt( 0, 2 );
		randOpacity = randomInt( 7, 10 ) * 0.1;

		size = new THREE.Vector3( randWidth, randHeight, randWidth * 0.001 );
		pos = new THREE.Vector3( randX, 0, randZ );

		bar = new Bar( size, pos, randType, randOpacity, texture );

		bars['t' + randType].objects.push(bar);
		
		bars['t' + randType].container.add(bar.mesh);

	}
}

function highlightT( type ) {

	// console.log(type)

	if (currentHighlighted > -1) {

		var unHighlight = currentHighlighted;
        currentHighlighted = -1;

		var tween = new TWEEN.Tween( { x: 100 } )
	      .to( { x: 0 }, 750 )
	      .easing( TWEEN.Easing.Quartic.InOut )
	      .onUpdate( function () {
	 
	        bars['t' + unHighlight].objects.forEach(bar => {
				bar.mesh.scale.x = 1 + this.x * 0.02 * bar.randConst;
				bar.mesh.scale.y = 1 + this.x * 0.002 * bar.randConst;
			});

	        bars['t' + unHighlight].container.position.set(0, 0, this.x * 0.004);

	      } )
	      .start();

	}

	if (type !== currentHighlighted && type > -1) {

		currentHighlighted = type;
        
        $('.dimensions-select').removeClass('t0 t1 t2').addClass('t' + type);

		var tween = new TWEEN.Tween( { x: 0 } )
	      .to( { x: 100 }, 750 )
	      .easing( TWEEN.Easing.Quartic.InOut )
	      .onUpdate( function () {
	 
	        bars['t' + type].objects.forEach(bar => {
				bar.mesh.scale.x = 1 + this.x * 0.02 * bar.randConst;
				bar.mesh.scale.y = 1 + this.x * 0.002 * bar.randConst;
			});

	        bars['t' + type].container.position.set(0, 0, this.x * 0.004);

	      } )
	      .start();
	  }
}

function highlightNext () {

	if (currentHighlighted === 2) {

		highlightT( 0 );

	} else {

		highlightT( currentHighlighted + 1 );

	}

}

function highlightPrev () {

	if (currentHighlighted <= 0) {

		highlightT( 2 );

	} else {

		highlightT( currentHighlighted - 1 );

	}

}


function initEvents () {

	renderer.domElement.addEventListener("touchstart", onTouchStart, false);
	renderer.domElement.addEventListener("touchmove", onTouchMove, false);
	renderer.domElement.addEventListener("touchend", onTouchEnd, false);
	renderer.domElement.addEventListener("click", onClick, false);

    window.addEventListener('resize', onWindowResize, false);

}

function onClick () {
    
    onClickCallback(currentHighlighted);
    
}

function onTouchStart ( event ) {

	startX = event.touches[0].clientX;
	startY = event.touches[0].clientY;

}

function onTouchMove ( event ) {

    moveX = (startX - event.touches[0].clientX) / width;
    moveY = (startY - event.touches[0].clientY) / height;

}

function onTouchEnd ( event ) {
    
    if ( moveX > 0.2 ) {
        
		highlightNext();
        
    } else if ( moveX < -0.2 ) {
        
		highlightPrev();
        
    }
	moveX = -1;
    moveY = -1;

}

function randomInt ( min, max ) {

    return Math.floor( Math.random() * ( max - min + 1 ) + min );

}


    function onWindowResize () {

        renderer.setSize( window.innerWidth, window.innerHeight );

        camera.aspect	= window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        
    }




 

module.exports = {

	init: init,
    highlightT: highlightT,
    setOnClick: setOnClick
    
};