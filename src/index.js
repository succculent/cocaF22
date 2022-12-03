import _ from 'lodash';
import './style.css';
import * as THREE from 'three'
// import * as osc from 'osc'
import Renderer from './Components/Renderer.js' 
import sceneShader from './Scenes/sceneShader.js'
import frag1 from './shaders/fragmentShader01.glsl'
import frag2 from './shaders/fragmentShader02.glsl'

function component() {
    /*
     * Page Setup
     */
    const element = document.createElement( 'div' );
    var canvas = document.createElement( 'canvas' );
    canvas.classList.add( 'webgl' );
    element.appendChild( canvas );

    var sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    };

    //set up all scenes for the scene switching
    let s1 = new sceneShader( sizes, frag1 );
    let s2 = new sceneShader( sizes, frag2 );
    // let s3 = new sceneShader( sizes, frag3 );
    //shader switching
    let shaders = [ s1, s2, s1, s2 ];
    let curFragIndx = 0;
    let curFrag = shaders[ curFragIndx ];

    let R = new Renderer( canvas, sizes );

    window.addEventListener( 'resize', ( ) =>
    {
        sizes.width = window.innerWidth;
        sizes.height = window.innerHeight;
        curFrag.resize( sizes );
    });

    const clock = new THREE.Clock( );
    const bps = 140/60;
    const spb = 1/bps;
    const tick = ( ) =>
    {   
      var deltaTime = clock.getDelta( );
      var elapsedTime = clock.getElapsedTime( );
      //shader switching
      var indx = Math.floor((elapsedTime*bps)%(shaders.length));
      if (indx != curFragIndx) {
          console.log(indx);
          curFragIndx = indx;
          curFrag = shaders[ curFragIndx ];
      }
      R.render( curFrag.scene, curFrag.C.camera );
      curFrag.tick( deltaTime, elapsedTime );
      window.requestAnimationFrame( tick );
    };
    tick( );

    return element;
}

document.body.appendChild( component() );