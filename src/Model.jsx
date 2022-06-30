import { Suspense, useRef, useState, useEffect } from 'react'
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber'
//import { Environment } from '@react-three/drei'
import { Html, useProgress } from '@react-three/drei'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import Maxillary from './components/Maxillary'
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';

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
    const handleStart = (timer = 1000) => {
        refTimerId.current = setInterval(() => {
            setStepInc(1)
        }, timer)
    }

    const handlePlay = () => {
        if (isPlaying && refTimerId.current) {
            handlePause()
        } else {
            handleStart()
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
        if (Object.keys(steps).length <= 0 || step >= Object.keys(steps).length) {
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
            <div className='absolute bottom-[50px] left-2'>
                <h2 className="text-2xl" >{state.step}</h2>
                <button onClick={handlePlay} className="px-2 w-[70px] py-1 bg-slate-300 rounded-md mr-2">{isPlaying ? "PAUSE" : "PLAY"}</button>

                <button onClick={handleStop} className="px-2 py-1 w-[70px] bg-slate-300 rounded-md mr-2">RESET</button>
            </div>
        </div>
    )
}



function Loader({ isFinished }) {
    const { progress } = useProgress()
    console.log({ progress })
    if (progress === 100) isFinished();
    return <Html center>{progress} % loaded</Html>
}