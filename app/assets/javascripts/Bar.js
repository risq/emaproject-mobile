let THREE = require('n3d-threejs');


class Bar {

    constructor (size, pos, type, opacity) {

    	opacity = opacity || 1;
    	
    	this.randConst = Math.random() * 4;
    	this.type = type;

    	let material =  type === 0 ? new THREE.MeshPhongMaterial( { 
    									color: 0x1B3D63,
    									emissive: 0x1B3D63,
    									transparent: true,
    									opacity: opacity 
    								} ) :
    					type === 1 ? new THREE.MeshPhongMaterial( { 
    									color: 0x0079FF,
    									emissive: 0x0079FF,
    									transparent: true,
    									opacity: opacity 
    								} ) :
    							 	 new THREE.MeshPhongMaterial( { 
    							 	 	color: 0xe9bc95,
    							 	 	emissive: 0xe9bc95,
    							 	 	transparent: true,
    							 	 	opacity: opacity 
    							 	 } ) ;

    	pos 	 = pos 		|| new Vector3;
    	size 	 = size  	|| new Vector3;

    	let geometry = new THREE.BoxGeometry( size.x, size.y, size.z );

    	// changeUVs(geometry, )

		this.mesh = new THREE.Mesh( geometry, material );
		this.setPos( pos );

    }

    setPos( pos ) {

    	this.mesh.position.copy(pos);

    }

    changeUVs( geometry, unitx, unity, offsetx, offsety ) {

		var faceVertexUvs = geometry.faceVertexUvs[ 0 ];

		for ( var i = 0; i < faceVertexUvs.length; i ++ ) {

			var uvs = faceVertexUvs[ i ];

			for ( var j = 0; j < uvs.length; j ++ ) {

				var uv = uvs[ j ];

				uv.x = ( uv.x + offsetx ) * unitx;
				uv.y = ( uv.y + offsety ) * unity;

			}
		}
	}
    
}

module.exports = Bar;