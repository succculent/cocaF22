import * as THREE from 'three'
import Objects from '../Components/Objects.js'
import Camera from '../Components/Camera.js'

export default class sceneShader
{
    constructor( sizes, frag )
    {
        //create scene
        this.scene = new THREE.Scene( );
        this.scene.background = new THREE.Color( 0.5, 0.5, 0.5 );
        //create objects
        this.O = new Objects( );
        this.O.objectsShader( this.scene, sizes, frag );
        //create camera
        this.C = new Camera( );
        this.C.createCameraShader( sizes );
    }
    resize( sizes )
    {
        // Update uniforms
        this.O.resizeShader( sizes );
    }
    tick( deltaTime, elapsedTime )
    {
        // uniforms
        this.O.tickShader( elapsedTime );
    }
};
