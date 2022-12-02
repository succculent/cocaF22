import _ from 'lodash';
import './style.css';
import * as THREE from 'three'
import Renderer from './Components/Renderer.js' 
import sceneShader from './Scenes/sceneShader.js'
// import osc from 'osc'
// require("osc/dist/osc-browser");

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
    let s = new sceneShader( sizes );
    let scenes = [ s ];
    let curSceneIndex = 0;
    let curScene = scenes[ curSceneIndex ];

    //open & connect to supercollider websocket server
    // var oscPort = new osc.WebSocketPort({
    //   url: "ws://localhost:8081", // URL to your Web Socket server.
    //   metadata: true
    // });

    // oscPort.open();

    // oscPort.on("message", function (oscMsg) {
    //   console.log("An OSC message just arrived!", oscMsg);
    // });

    //define scene switching function (from supercollider sequencer?)
    // // case "ArrowLeft":
          //   if ( curSceneIndex == 0 ) curSceneIndex = scenes.length - 1;
          //   else curSceneIndex--;
          //   curScene = scenes[ curSceneIndex ];
          //   break;
          // case "ArrowRight":
          //   curSceneIndex = ( curSceneIndex + 1 ) % scenes.length;
          //   curScene = scenes[ curSceneIndex ];
          //   break;
    //

    let R = new Renderer( canvas, sizes );

    window.addEventListener( 'resize', ( ) =>
    {
        sizes.width = window.innerWidth;
        sizes.height = window.innerHeight;
        curScene.resize( sizes );
    });

    const clock = new THREE.Clock( );
    const tick = ( ) =>
    {   
      var deltaTime = clock.getDelta( );
      var elapsedTime = clock.getElapsedTime( );
      R.render( curScene.scene, curScene.C.camera );
      curScene.tick( deltaTime, elapsedTime );
      window.requestAnimationFrame( tick );
    };
    tick( );

    return element;
}

document.body.appendChild( component() );