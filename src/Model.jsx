import { Suspense, useRef, useState, useEffect } from 'react'
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber'
//import { Environment } from '@react-three/drei'
import { Html, useProgress } from '@react-three/drei'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import Maxillary from './components/Maxillary'
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';
import { defaultTimer } from './contants';

extend({ OrbitControls });


const CameraControls = () => {
  // Get a reference to the Three.js Camera, and the canvas html element.
  // We need these to setup the OrbitControls class.
  // https://threejs.org/docs/#examples/en/controls/OrbitControls

  const {
    camera,
    gl: { domElement }
  } = useThree();

  // Ref to the controls, so that we can update them on every frame using useFrame
  const controls = useRef();
  useFrame(state => controls.current.update());
  return (
    <orbitControls
      ref={controls}
      args={[camera, domElement]}
      enableZoom={true}
      maxAzimuthAngle={Math.PI / 2}
      maxPolarAngle={Math.PI}
      minAzimuthAngle={-Math.PI / 2}
      minPolarAngle={0}
    />
  );
};


export default function Model({ data }) {
  const [state, dispatch] = useStateValue();
  const { isPlaying, steps, step } = state;

  const setStepInc = (val) => {
    dispatch({
      type: actionTypes.INC_STEP,
      step: val
    })
  }

  const resetStep = () => {
    dispatch({ type: actionTypes.RESET_STEP })
  }

  const refTimerId = useRef(); //when using: .current

  const handleStart = (timer = 500) => {
    refTimerId.current = setInterval(() => {
      setStepInc(1)
    }, timer)
  }

  const handlePlay = () => {
    if (isPlaying && refTimerId.current) {
      handlePause()
    } else {
      handleStart(defaultTimer)
    }
    dispatch({ type: actionTypes.TOGGLE_PLAY })
  }

  const handlePause = () => {
    clearInterval(refTimerId.current)
  }

  const handleStop = () => {
    //clearInterval(refTimerId.current)
    handlePause()
    resetStep()

  }

  const handleLoaderFinished = () => {
    handleStop();
  }

  useEffect(() => {
    if (Object.keys(steps).length <= 0 || step >= Object.keys(steps).length - 1) {
      handlePause()
    }
    //
    return () => {

    }


  }, [state.step]);

  useEffect(() => {
    return () => {
      handleStop();
      console.log('unmount!!!')
    }
  }, [])
  return (
    <div className="w-full h-full">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 150], fov: 50 }} >
        <Suspense fallback={<Loader isFinished={handleLoaderFinished} />}>
          {/* <mesh
                    onClick={(e) => console.log('click')}
                    onContextMenu={(e) => console.log('context menu')}
                    onDoubleClick={(e) => console.log('double click')}
                    onWheel={(e) => console.log('wheel spins')}
                    onPointerUp={(e) => console.log('up')}
                    onPointerDown={(e) => console.log('down')}
                    onPointerOver={(e) => console.log('over')}
                    onPointerOut={(e) => console.log('out')}
                    onPointerEnter={(e) => console.log('enter')}
                    onPointerLeave={(e) => console.log('leave')}
                    onPointerMove={(e) => console.log('move')}
                    onPointerMissed={() => console.log('missed')}
                    onUpdate={(self) => console.log('props have been updated')}
                    > */}
          {/* {[...Array(28)].map((val,index) => {
                            const url = `/assets/rang/Maxillary-${index}.stl`
                            //console.log(url)
                            return (
                                <></>
                            )
                        })} */}
          {
            Object.keys(steps).length > 0 && Object.keys(steps).map((val, index) => (state.step == -1 || state.step == index) && <Maxillary key={index} url={steps[val]} />)
          }
          {/* <Maxillary url={url} /> */}

          {/* </mesh> */}

          {/*<spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} shadow-mapSize={[512, 512]} castShadow /> */}
          {/* den ambient */}
          <ambientLight intensity={0.1} />

          {/* phia truoc */}
          <pointLight position={[200, 30, 200]} />
          <pointLight position={[-200, 30, 200]} />

          {/* phia duoi */}
          <pointLight position={[0, -200, -50]} />

          {/* phia tren */}
          <pointLight position={[0, 200, 10]} />
          <CameraControls />
          {/* <Environment preset="sunset" background /> */}
        </Suspense>

      </Canvas>
      {<div className='absolute bottom-[50px] left-2'>
        <h2 className="text-2xl" >{state.step >= 0 ? state.step : ""}</h2>
        <div className='flex items-center'>

          <button onClick={handlePlay} className="px-2 w-[50px] h-[50px] flex justify-center items-center py-1 bg-slate-300 rounded-full mr-2">
            {
              isPlaying ?
                <img src='/assets/pause.svg' height={'25px'} width={'25px'} />
                :
                <img src='/assets/play.svg' height={'25px'} width={'25px'} />
            }
          </button>

          <button onClick={handleStop} className="px-2 py-1 w-[35px] h-[35px] bg-slate-300 rounded-full mr-2">
          <img src='/assets/reset.svg' height={'25px'} width={'25px'} /> 
          </button>
        </div>
      </div>}
    </div>
  )
}



function Loader({ isFinished }) {
  const { progress } = useProgress()
  console.log({ progress })
  if (progress === 100) isFinished();
  return <Html center >
    <div className='flex flex-col justify-center items-center' >
      <svg role="status" className="w-12 h-12 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
      </svg>
      {progress.toFixed(1)}%
    </div>


  </Html>
}