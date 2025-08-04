'use client'
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function CSS3DTechObjects() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const techStack = [
    { name: 'React', color: '#61DAFB', position: { x: -100, y: 50, z: 0 }, size: 40 },
    { name: 'Next.js', color: '#ffffff', position: { x: 120, y: -40, z: 20 }, size: 35 },
    { name: 'Node.js', color: '#339933', position: { x: -80, y: -80, z: -10 }, size: 38 },
    { name: 'JS', color: '#F7DF1E', position: { x: 90, y: 100, z: 15 }, size: 42 },
    { name: 'CSS', color: '#1572B6', position: { x: -150, y: -20, z: 25 }, size: 36 },
    { name: 'Git', color: '#F05032', position: { x: 40, y: -120, z: -15 }, size: 34 }
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = e.currentTarget?.getBoundingClientRect();
      if (rect) {
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        setMousePosition({
          x: (e.clientX - centerX) / 20,
          y: (e.clientY - centerY) / 20
        });
      }
    };

    const container = document.getElementById('css3d-tech-objects');
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <div 
      id="css3d-tech-objects"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Tech objects */}
      {techStack.map((tech, index) => (
        <motion.div
          key={tech.name}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: `${tech.size}px`,
            height: `${tech.size}px`,
            background: `linear-gradient(135deg, ${tech.color}, ${tech.color}88)`,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: tech.color === '#ffffff' ? '#000' : '#fff',
            fontWeight: 'bold',
            fontSize: '12px',
            textAlign: 'center',
            boxShadow: `0 10px 40px ${tech.color}44`,
            border: `2px solid ${tech.color}66`,
            transformStyle: 'preserve-3d',
            transform: `translate(-50%, -50%) translate3d(${tech.position.x}px, ${tech.position.y}px, ${tech.position.z}px)`
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            rotateY: 360,
            rotateX: mousePosition.y * 0.3,
            rotateZ: mousePosition.x * 0.2,
            y: Math.sin(Date.now() * 0.001 + index) * 10
          }}
          transition={{ 
            delay: index * 0.2,
            duration: 0.8,
            type: 'spring',
            stiffness: 200,
            rotateY: { duration: 20 + index * 3, repeat: Infinity, ease: 'linear' },
            rotateX: { duration: 0.2 },
            rotateZ: { duration: 0.2 },
            y: { duration: 3 + index * 0.5, repeat: Infinity, ease: 'easeInOut' }
          }}
        >
          {/* Inner glow */}
          <motion.div
            style={{
              position: 'absolute',
              top: '20%',
              left: '20%',
              right: '20%',
              bottom: '20%',
              borderRadius: '50%',
              background: `radial-gradient(circle, ${tech.color}66, transparent)`,
              opacity: 0.6
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.6, 0.9, 0.6]
            }}
            transition={{
              duration: 2 + index * 0.3,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />

          {/* Tech name */}
          <span style={{ zIndex: 2, position: 'relative' }}>
            {tech.name}
          </span>

          {/* Orbital ring */}
          <motion.div
            style={{
              position: 'absolute',
              top: '-5px',
              left: '-5px',
              right: '-5px',
              bottom: '-5px',
              borderRadius: '50%',
              border: `2px solid ${tech.color}44`,
              opacity: 0.5
            }}
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{
              rotate: { duration: 8 + index, repeat: Infinity, ease: 'linear' },
              scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
            }}
          />
        </motion.div>
      ))}

      {/* Floating particles */}
      {Array.from({ length: 25 }).map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: '3px',
            height: '3px',
            borderRadius: '50%',
            background: `linear-gradient(45deg, #00d4ff, #ff00ff)`,
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
            transformStyle: 'preserve-3d'
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, Math.random() * 60 - 30, 0],
            z: [0, Math.random() * 30 - 15, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
            rotateX: [0, 360, 0],
            rotateY: [0, 360, 0]
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: 'easeInOut'
          }}
        />
      ))}

      {/* Connection lines */}
      {techStack.map((tech, index) => (
        <motion.div
          key={`line-${index}`}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '1px',
            height: Math.sqrt(tech.position.x ** 2 + tech.position.y ** 2) / 2,
            background: `linear-gradient(to bottom, ${tech.color}33, transparent)`,
            transformOrigin: 'bottom',
            transform: `translate(-50%, 0) rotate(${Math.atan2(tech.position.y, tech.position.x) * 180 / Math.PI + 90}deg)`,
            opacity: 0.3
          }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scaleY: [1, 1.2, 1]
          }}
          transition={{
            duration: 4 + index,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  );
}
