let THREE = require('n3d-threejs');


class Bar {

    constructor (size, pos, type, opacity) {

    	opacity = opacity || 1;
    	this.type = type;

    	let material =  type === 0 ? new THREE.MeshPhongMaterial( { 
    									color: 0x00ff00,
    									emissive: 0x00ff00,
    									transparent: true,
    									opacity: opacity 
    								} ) :
    					type === 1 ? new THREE.MeshPhongMaterial( { 
    									color: 0xff0000,
    									emissive: 0xff0000,
    									transparent: true,
    									opacity: opacity 
    								} ) :
    							 	 new THREE.MeshPhongMaterial( { 
    							 	 	color: 0x0000ff,
    							 	 	emissive: 0x0000ff,
    							 	 	transparent: true,
    							 	 	opacity: opacity 
    							 	 } ) ;

    	pos 	 = pos 		|| new Vector3;
    	size 	 = size  	|| new Vector3;

    	let geometry = new THREE.BoxGeometry( size.x, size.y, size.z );

		this.mesh = new THREE.Mesh( geometry, material );
		this.setPos( pos );

    }

    setPos( pos ) {

    	this.mesh.position.copy(pos);

    }
    
}

module.exports = Bar;