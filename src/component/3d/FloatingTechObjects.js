'use client'
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

// Individual floating tech object
function TechObject({ position, color, text, rotationSpeed = 1 }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01 * rotationSpeed;
      meshRef.current.rotation.y += 0.01 * rotationSpeed;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group ref={meshRef} position={position}>
        {/* Glowing sphere */}
        <Sphere args={[0.3, 32, 32]}>
          <meshStandardMaterial 
            color={color}
            emissive={color}
            emissiveIntensity={0.2}
            transparent
            opacity={0.8}
          />
        </Sphere>
        
        {/* Inner core */}
        <Sphere args={[0.15, 16, 16]}>
          <meshStandardMaterial 
            color={color}
            emissive={color}
            emissiveIntensity={0.5}
          />
        </Sphere>

        {/* Simple text replacement with mesh */}
        <mesh position={[0, -0.6, 0]}>
          <planeGeometry args={[0.8, 0.2]} />
          <meshBasicMaterial color="white" transparent opacity={0.8} />
        </mesh>
      </group>
    </Float>
  );
}

// Particle system
function ParticleField() {
  const points = useRef();
  const particleCount = 100;
  
  const positions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y += 0.001;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#00d4ff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export default function FloatingTechObjects() {
  const techStack = [
    { text: 'React', color: '#61DAFB', position: [-2, 1, 0] },
    { text: 'Next.js', color: '#ffffff', position: [2, -1, 1] },
    { text: 'Node.js', color: '#339933', position: [-1, -2, -1] },
    { text: 'JS', color: '#F7DF1E', position: [1.5, 2, -0.5] },
    { text: 'CSS', color: '#1572B6', position: [-2.5, 0, 1.5] },
    { text: 'Git', color: '#F05032', position: [0, 1.5, 2] }
  ];

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 1
    }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff00ff" />
        
        {/* Tech objects */}
        {techStack.map((tech, index) => (
          <TechObject
            key={tech.text}
            position={tech.position}
            color={tech.color}
            text={tech.text}
            rotationSpeed={0.5 + index * 0.2}
          />
        ))}
        
        {/* Particle field */}
        <ParticleField />
      </Canvas>
    </div>
  );
}
