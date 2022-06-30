import { useCallback, useEffect, useRef, useState } from 'react'
import logo from './logo.svg'
import *as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import './App.css'

var renderer;

function App() {
  let scene

  const refContainer = useRef();
  const [count, setCount] = useState(0)
  //const [renderer, setRenderer] = useState();
  const [camera, setCamera] = useState()
  const [initialCameraPosition] = useState(
    new THREE.Vector3(
      20 * Math.sin(0.2 * Math.PI),
      10,
      20 * Math.cos(0.2 * Math.PI)
    )
  )


  // "Creating a scene" manual 
  // https://threejs.org/docs/#manual/en/introduction/Creating-a-scene
  const sceneSetup = () => {
    const { current: container } = refContainer
    
    // get container dimensions and use them for scene sizing
    const width = container.clientWidth;
    const height = container.clientHeight;

    scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(width, height)
    renderer.outputEncoding = THREE.sRGBEncoding
    container.appendChild(renderer.domElement)
    //setRenderer(renderer)
    console.log('ok scene', {renderer})
  };


  // Code below is taken from Three.js OBJ Loader example
  // https://threejs.org/docs/#examples/en/loaders/OBJLoader
  const loadTheModel = () => {
    // instantiate a loader
    const loader = new OBJLoader();

    // load a resource
    loader.load(
      // resource URL relative to the /public/index.html of the app
      'eleph.obj',
      // called when resource is loaded
      (object) => {
        scene.add(object);

        // get the newly added object by name specified in the OBJ model (that is Elephant_4 in my case)
        // you can always set console.log(this.scene) and check its children to know the name of a model
        const el = scene.getObjectByName("Elephant_4");

        // change some custom props of the element: placement, color, rotation, anything that should be
        // done once the model was loaded and ready for display
        el.position.set(0, -150, 0);
        el.material.color.set(0x50C878);
        el.rotation.x = 23.5;

        // make this element available inside of the whole component to do any animation later
        //model = el;
      },
      // called when loading is in progresses
      (xhr) => {

        const loadingPercentage = Math.ceil(xhr.loaded / xhr.total * 100);
        console.log((loadingPercentage) + '% loaded');

        // update parent react component to display loading percentage
        //this.props.onProgress(loadingPercentage);
      },
      // called when loading has errors
      (error) => {

        console.log('An error happened:' + error);

      }
    );
  };


  // adding some lights to the scene
  const addLights = () => {
    const lights = [];

    // set color and intensity of lights
    lights[0] = new THREE.PointLight(0xffffff, 1, 0);
    lights[1] = new THREE.PointLight(0xffffff, 1, 0);
    lights[2] = new THREE.PointLight(0xffffff, 1, 0);

    // place some lights around the scene for best looks and feel
    lights[0].position.set(0, 2000, 0);
    lights[1].position.set(1000, 2000, 1000);
    lights[2].position.set(- 1000, - 2000, - 1000);

    scene.add(lights[0]);
    scene.add(lights[1]);
    scene.add(lights[2]);
  };

  const handleWindowResize = useCallback(() => {
    const { current: container } = refContainer;
    if (container) {
      const width = container.clientWidth;
      const height = container.clientHeight;
  
      //renderer.setSize(width, height);
      console.log({ width, height, renderer })
    }
    
  }, []);


  //handle effect
  useEffect(() => {
    window.addEventListener('resize', handleWindowResize, false)
    return () => {
      window.removeEventListener('resize', handleWindowResize, false)
    }
  }, [renderer,handleWindowResize])

  useEffect(() => {
    //componentDidMount
    console.log('componentDidMount', refContainer.current.clientWidth)
    const { current: container } = refContainer
    if (container && !renderer) {
      sceneSetup(container);
    }

    return () => {
      //unmount
      console.log('componentWillUnmount');
      //renderer.dispose();
    }
  }, []);

  return (
    <div className="h-screen w-full">
      <div ref={refContainer} className="h-screen">
        <h1>QUAN</h1>
      </div>
    </div>
  )
}

export default App
