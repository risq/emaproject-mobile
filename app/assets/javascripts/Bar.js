let THREE = require('n3d-threejs');


class Bar {

    constructor (size, pos, type, opacity, map) {

    	opacity = opacity || 1;
    	
    	this.randConst = Math.random() * 4;
    	this.type = type;

        let material =  new THREE.MeshPhongMaterial( { 
                            transparent: true,
                            opacity: opacity,
                            map: map
                        } );

    	let color = type === 0 ? 0x1c4877:
    			    type === 1 ? 0x61857f:
    				             0xaf2f3f;

        material.color    = new THREE.Color(color);
        material.emissive = new THREE.Color(color);


    	pos  = pos  || new Vector3;
    	size = size || new Vector3;

    	let geometry = new THREE.BoxGeometry( size.x, size.y, size.z );

        console.log(size.y / 2)

        this.changeUVs(geometry, size.x * 10, 1, 0.5+pos.x, 0)

        this.mesh = new THREE.Mesh( geometry, material );
        this.setPos( pos );


    }

    setPos( pos ) {

    	this.mesh.position.copy(pos);

    }

    changeUVs( geometry, unitx, unity, offsetx, offsety ) {

        unitx   = unitx   < 0 ? 0 : unitx   > 1 ? 1 : unitx;
        unity   = unity   < 0 ? 0 : unity   > 1 ? 1 : unity;
        offsetx = offsetx < 0 ? 0 : offsetx > 1 ? 1 : offsetx;
        offsety = offsety < 0 ? 0 : offsety > 1 ? 1 : offsety;

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