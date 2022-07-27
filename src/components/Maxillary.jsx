import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'
import { useLoader, useThree } from '@react-three/fiber'
import { useRef, useEffect } from 'react';
import * as THREE from 'three'
import { teethColor } from '../contants';

function Maxillary({ url }) {
    const geom = useLoader(STLLoader, url);

    const ref = useRef();
    const { camera } = useThree();
    useEffect(() => {
        camera.lookAt(ref.current.position);
    });

    return (
        <>
            <mesh ref={ref}>
                <primitive object={geom} attach="geometry" />
                <meshStandardMaterial color={new THREE.Color('#999999')} />
            </mesh>

        </>
    );
}

export default Maxillary;