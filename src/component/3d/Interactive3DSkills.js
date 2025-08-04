'use client'
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, Ring } from '@react-three/drei';
import { useRef, useState } from 'react';
import * as THREE from 'three';

// Individual skill sphere
function SkillSphere({ position, skill, onHover, isHovered }) {
  const meshRef = useRef();
  const textRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      if (isHovered) {
        meshRef.current.scale.setScalar(1.2 + Math.sin(state.clock.elapsedTime * 3) * 0.1);
      } else {
        meshRef.current.scale.setScalar(1);
      }
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.3}>
      <group 
        position={position}
        onPointerEnter={() => onHover(skill.name)}
        onPointerLeave={() => onHover(null)}
      >
        {/* Main sphere */}
        <Sphere 
          ref={meshRef}
          args={[0.4, 32, 32]}
        >
          <meshStandardMaterial
            color={skill.color}
            emissive={skill.color}
            emissiveIntensity={isHovered ? 0.3 : 0.1}
            transparent
            opacity={0.8}
            roughness={0.2}
            metalness={0.8}
          />
        </Sphere>

        {/* Skill level ring */}
        <Ring args={[0.5, 0.6, 32]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial
            color={skill.color}
            transparent
            opacity={0.3}
          />
        </Ring>

        {/* Simple text replacement */}
        <mesh position={[0, -0.8, 0]}>
          <planeGeometry args={[1, 0.3]} />
          <meshBasicMaterial color="white" transparent opacity={0.8} />
        </mesh>

        {/* Level indicator */}
        <mesh position={[0, -1.1, 0]}>
          <planeGeometry args={[0.6, 0.2]} />
          <meshBasicMaterial color={skill.color} transparent opacity={0.9} />
        </mesh>
      </group>
    </Float>
  );
}

// Central hub
function CentralHub({ hoveredSkill }) {
  const hubRef = useRef();
  
  useFrame((state) => {
    if (hubRef.current) {
      hubRef.current.rotation.y += 0.005;
      hubRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={hubRef}>
      <Sphere args={[0.6, 32, 32]}>
        <meshStandardMaterial
          color="#667eea"
          emissive="#667eea"
          emissiveIntensity={0.2}
          transparent
          opacity={0.7}
          roughness={0.1}
          metalness={0.9}
        />
      </Sphere>
      
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[1.2, 0.4]} />
        <meshBasicMaterial color="white" transparent opacity={0.9} />
      </mesh>

      {hoveredSkill && (
        <mesh position={[0, -0.4, 0]}>
          <planeGeometry args={[1.5, 0.3]} />
          <meshBasicMaterial color="#00d4ff" transparent opacity={0.8} />
        </mesh>
      )}
    </group>
  );
}

export default function Interactive3DSkills() {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const skills = [
    { name: 'React', level: 95, color: '#61DAFB', position: [2, 1, 0] },
    { name: 'JavaScript', level: 90, color: '#F7DF1E', position: [-2, 1, 1] },
    { name: 'Next.js', level: 85, color: '#ffffff', position: [1, -1, 2] },
    { name: 'Node.js', level: 75, color: '#339933', position: [-1, -2, 0] },
    { name: 'TypeScript', level: 80, color: '#3178C6', position: [2, 0, -2] },
    { name: 'CSS', level: 88, color: '#1572B6', position: [-2, 0, -1] }
  ];

  return (
    <div style={{
      width: '400px',
      height: '350px',
      margin: '2rem auto',
      position: 'relative'
    }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff00ff" />
        <spotLight position={[0, 10, 0]} intensity={0.5} color="#00d4ff" />

        {/* Central hub */}
        <CentralHub hoveredSkill={hoveredSkill} />

        {/* Skill spheres */}
        {skills.map((skill) => (
          <SkillSphere
            key={skill.name}
            position={skill.position}
            skill={skill}
            onHover={setHoveredSkill}
            isHovered={hoveredSkill === skill.name}
          />
        ))}


      </Canvas>

      {/* UI Overlay */}
      <div style={{
        position: 'absolute',
        bottom: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: '12px',
        textAlign: 'center'
      }}>
        Drag to rotate • Hover to interact
      </div>
    </div>
  );
}
