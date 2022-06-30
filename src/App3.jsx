import { Suspense, useRef } from 'react'
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber'
//import { Environment } from '@react-three/drei'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import Model from './components/Maxillary'

extend({ OrbitControls });

const CameraControls = () => {
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


export default function App() {
    return (
        <div className="w-full h-screen bg-[#0099CC]">
            <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 150], fov: 50 }}>
                <Suspense fallback={null}>
                    {/* <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} shadow-mapSize={[512, 512]} castShadow /> */}
                    <mesh
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
                    >

                        <Model url={'/assets/rang/Maxillary0.stl'} />
                    </mesh>

                    {/* den ambient */}
                    <ambientLight intensity={0.1}/>

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
        </div>
    )
}