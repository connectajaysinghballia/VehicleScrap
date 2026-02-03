"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei"
import * as THREE from "three"

function TruckModel(props: any) {
    const group = useRef<THREE.Group>(null)

    // Rotate the truck
    useFrame((state) => {
        if (group.current) {
            group.current.rotation.y += 0.005
        }
    })

    return (
        <group ref={group} {...props} dispose={null}>
            {/* CHASSIS */}
            {/* Main Frame */}
            <mesh position={[0, 0.5, 0]}>
                <boxGeometry args={[2, 0.2, 4.5]} />
                <meshStandardMaterial color="#333" />
            </mesh>

            {/* CABIN */}
            {/* Lower Cabin */}
            <mesh position={[0, 1.2, 1.5]}>
                <boxGeometry args={[1.9, 1.2, 1.4]} />
                <meshStandardMaterial color="#f97316" metalness={0.6} roughness={0.2} /> {/* Orange-500 */}
            </mesh>
            {/* Upper Cabin (Windshield area) */}
            <mesh position={[0, 2.1, 1.4]}>
                <boxGeometry args={[1.8, 0.8, 1.1]} />
                <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.1} transparent opacity={0.7} /> {/* Glass */}
            </mesh>
            {/* Roof */}
            <mesh position={[0, 2.55, 1.4]}>
                <boxGeometry args={[1.85, 0.1, 1.15]} />
                <meshStandardMaterial color="#f97316" />
            </mesh>
            {/* Front Grille */}
            <mesh position={[0, 1, 2.21]}>
                <boxGeometry args={[1.6, 0.6, 0.1]} />
                <meshStandardMaterial color="#111" />
            </mesh>
            {/* Headlights */}
            <mesh position={[-0.6, 1, 2.22]}>
                <boxGeometry args={[0.3, 0.3, 0.05]} />
                <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={2} />
            </mesh>
            <mesh position={[0.6, 1, 2.22]}>
                <boxGeometry args={[0.3, 0.3, 0.05]} />
                <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={2} />
            </mesh>

            {/* REAR BED (Flatbed) */}
            <mesh position={[0, 0.9, -1]}>
                <boxGeometry args={[2, 0.6, 2.8]} />
                <meshStandardMaterial color="#475569" metalness={0.5} roughness={0.5} /> {/* Slate-600 */}
            </mesh>

            {/* CRANE / TOW MECHANISM */}
            {/* Vertical Post */}
            <mesh position={[0, 1.6, -1.8]} rotation={[0.2, 0, 0]}>
                <boxGeometry args={[0.3, 1.8, 0.3]} />
                <meshStandardMaterial color="#facc15" /> {/* Yellow */}
            </mesh>
            {/* Boom arm */}
            <mesh position={[0, 2.4, -0.8]} rotation={[0.7, 0, 0]}>
                <boxGeometry args={[0.2, 2.5, 0.2]} />
                <meshStandardMaterial color="#facc15" />
            </mesh>
            {/* Hook Cable */}
            <mesh position={[0, 1.2, 0.3]}>
                <cylinderGeometry args={[0.02, 0.02, 1.5]} />
                <meshStandardMaterial color="#111" />
            </mesh>
            {/* Hook */}
            <mesh position={[0, 0.5, 0.3]}>
                <torusGeometry args={[0.1, 0.04, 8, 16]} />
                <meshStandardMaterial color="#94a3b8" metalness={1} roughness={0.2} />
            </mesh>

            {/* WHEELS */}
            {/* Front Left */}
            <mesh position={[-1.1, 0.4, 1.5]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.4, 0.4, 0.3, 32]} />
                <meshStandardMaterial color="black" />
            </mesh>
            {/* Front Left Rim */}
            <mesh position={[-1.26, 0.4, 1.5]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.2, 0.2, 0.05, 16]} />
                <meshStandardMaterial color="#ddd" metalness={0.8} />
            </mesh>

            {/* Front Right */}
            <mesh position={[1.1, 0.4, 1.5]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.4, 0.4, 0.3, 32]} />
                <meshStandardMaterial color="black" />
            </mesh>
            {/* Front Right Rim */}
            <mesh position={[1.26, 0.4, 1.5]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.2, 0.2, 0.05, 16]} />
                <meshStandardMaterial color="#ddd" metalness={0.8} />
            </mesh>

            {/* Rear Left */}
            <mesh position={[-1.1, 0.4, -1.5]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.45, 0.45, 0.35, 32]} />
                <meshStandardMaterial color="black" />
            </mesh>
            {/* Rear Left Rim */}
            <mesh position={[-1.29, 0.4, -1.5]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.25, 0.25, 0.05, 16]} />
                <meshStandardMaterial color="#ddd" metalness={0.8} />
            </mesh>

            {/* Rear Right */}
            <mesh position={[1.1, 0.4, -1.5]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.45, 0.45, 0.35, 32]} />
                <meshStandardMaterial color="black" />
            </mesh>
            {/* Rear Right Rim */}
            <mesh position={[1.29, 0.4, -1.5]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.25, 0.25, 0.05, 16]} />
                <meshStandardMaterial color="#ddd" metalness={0.8} />
            </mesh>

        </group>
    )
}

export default function TowTruckScene() {
    return (
        <div className="w-full h-[400px] lg:h-[600px] relative">
            <Canvas shadows camera={{ position: [5, 3, 5], fov: 45 }}>
                <group position={[0, -0.5, 0]}>
                    <TruckModel scale={0.7} />
                    <ContactShadows resolution={1024} scale={10} blur={1} opacity={0.5} far={10} color="#000" />
                </group>

                {/* Lighting */}
                <ambientLight intensity={0.7} />
                <spotLight
                    position={[10, 10, 10]}
                    angle={0.15}
                    penumbra={1}
                    intensity={100}
                    castShadow
                    shadow-mapSize={1024}
                />
                <pointLight position={[-10, -10, -10]} intensity={10} color="orange" />

                {/* Environment - gives metallic reflections */}
                <Environment preset="city" />

                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
            </Canvas>
        </div>
    )
}
