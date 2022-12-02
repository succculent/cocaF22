import * as THREE from 'three'

export default class Camera
{
    constructor( )
    {
        
    }
    createCameraShader( sizes )
    {
        this.sizes = sizes;
        this.camera = new THREE.PerspectiveCamera( 75, sizes.width / sizes.height, 1, 100 );
        this.camera.position.set( -50, -50, -50 );
        this.camera.lookAt( 0, 0, 0 );
    }
};