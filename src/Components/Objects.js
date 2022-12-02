import * as THREE from 'three'
import vertexShader from '../shaders/vertexShader.glsl'
import fragmentShader01 from '../shaders/fragmentShader01.glsl'

export default class Objects
{
    constructor() 
    {

    }
    //SCENE SHADER
    objectsShader( scene, sizes )
    {
        var planeGeometry = new THREE.PlaneGeometry( sizes.width/2, sizes.height/2 );
        this.planeMaterial = new THREE.ShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader01,
            uniforms: {
                uTime: {value: 0.0},
                uResY: {value: sizes.height},
                uResX: {value: sizes.width},
            },
        });
        this.planeMaterial.needsUpdate = true;
        this.plane = new THREE.Mesh( planeGeometry, this.planeMaterial );
        this.plane.lookAt(new THREE.Vector3(-0.7, -0.7, -0.7));
        scene.add( this.plane );
    }
    resizeShader( sizes ) {
        this.planeMaterial.uniforms.uResY.value = sizes.height;
        this.planeMaterial.uniforms.uResX.value = sizes.width;
    }
    tickShader( elapsedTime )
    {
        this.planeMaterial.uniforms.uTime.value = elapsedTime;
    }
};