let THREE = require('n3d-threejs');


class Bar {

    constructor (size, pos, type) {

    	this.type = type;

    	let material =  type === 0 ? new THREE.MeshPhongMaterial( { color: 0x00ff00 } ) :
    					type === 1 ? new THREE.MeshPhongMaterial( { color: 0xff0000 } ) :
    							 	 new THREE.MeshPhongMaterial( { color: 0x0000ff } ) ;

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