import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from '@react-three/fiber'
export default function Maxillary() {

    return (
        <Scene />
    )
}

function Scene() {
    const geom = useLoader(STLLoader, '/assets/quan.stl')
    return (
        <mesh>
            <bufferGeometry ref={geom} attach="geometry" />
            <meshStandardMaterial color="hotpink" />
        </mesh>
    )
}