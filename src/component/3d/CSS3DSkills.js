'use client'
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function CSS3DSkills() {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const skills = [
    { name: 'React.js', level: 95, color: '#61DAFB', position: { x: 0, y: 0, z: 0 } },
    { name: 'JavaScript', level: 90, color: '#F7DF1E', position: { x: 120, y: -60, z: 20 } },
    { name: 'Next.js', level: 85, color: '#ffffff', position: { x: -100, y: 80, z: -10 } },
    { name: 'Node.js', level: 75, color: '#339933', position: { x: 80, y: 120, z: 30 } },
    { name: 'TypeScript', level: 80, color: '#3178C6', position: { x: -120, y: -40, z: 25 } },
    { name: 'CSS', level: 88, color: '#1572B6', position: { x: 60, y: -100, z: -20 } }
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = e.currentTarget?.getBoundingClientRect();
      if (rect) {
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        setMousePosition({
          x: (e.clientX - centerX) / 10,
          y: (e.clientY - centerY) / 10
        });
      }
    };

    const container = document.getElementById('css3d-skills');
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <div 
      id="css3d-skills"
      style={{
        width: '400px',
        height: '350px',
        margin: '2rem auto',
        position: 'relative',
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Central hub */}
      <motion.div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '80px',
          height: '80px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '14px',
          boxShadow: '0 10px 40px rgba(102, 126, 234, 0.4)',
          transform: 'translate(-50%, -50%)',
          zIndex: 10,
          transformStyle: 'preserve-3d'
        }}
        animate={{
          rotateY: 360,
          scale: hoveredSkill ? 1.1 : 1,
          rotateX: mousePosition.y * 0.1,
          rotateZ: mousePosition.x * 0.1
        }}
        transition={{
          rotateY: { duration: 20, repeat: Infinity, ease: 'linear' },
          scale: { duration: 0.3 },
          rotateX: { duration: 0.1 },
          rotateZ: { duration: 0.1 }
        }}
      >
        Skills
        {hoveredSkill && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              position: 'absolute',
              top: '-50px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(0, 0, 0, 0.9)',
              color: '#00d4ff',
              padding: '8px 12px',
              borderRadius: '8px',
              fontSize: '12px',
              whiteSpace: 'nowrap',
              border: `1px solid ${skills.find(s => s.name === hoveredSkill)?.color}66`
            }}
          >
            {hoveredSkill}: {skills.find(s => s.name === hoveredSkill)?.level}%
          </motion.div>
        )}
      </motion.div>

      {/* Skill spheres */}
      {skills.map((skill, index) => (
        <motion.div
          key={skill.name}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '60px',
            height: '60px',
            background: `linear-gradient(135deg, ${skill.color}, ${skill.color}88)`,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: skill.color === '#ffffff' ? '#000' : '#fff',
            fontWeight: 'bold',
            fontSize: '10px',
            textAlign: 'center',
            cursor: 'pointer',
            boxShadow: `0 8px 32px ${skill.color}44`,
            border: `2px solid ${skill.color}66`,
            transformStyle: 'preserve-3d',
            transform: `translate(-50%, -50%) translate3d(${skill.position.x}px, ${skill.position.y}px, ${skill.position.z}px)`
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: 1, 
            scale: hoveredSkill === skill.name ? 1.3 : 1,
            rotateY: 360,
            rotateX: mousePosition.y * 0.2,
            rotateZ: mousePosition.x * 0.2,
            y: hoveredSkill === skill.name ? -20 : 0
          }}
          transition={{ 
            delay: index * 0.1,
            duration: 0.5,
            type: 'spring',
            stiffness: 300,
            rotateY: { duration: 15 + index * 2, repeat: Infinity, ease: 'linear' },
            rotateX: { duration: 0.1 },
            rotateZ: { duration: 0.1 }
          }}
          onHoverStart={() => setHoveredSkill(skill.name)}
          onHoverEnd={() => setHoveredSkill(null)}
          whileHover={{ 
            scale: 1.3, 
            y: -20,
            boxShadow: `0 15px 50px ${skill.color}66`
          }}
          whileTap={{ scale: 0.9 }}
        >
          {/* Skill name (abbreviated) */}
          <span style={{ zIndex: 2, position: 'relative' }}>
            {skill.name.split(/[\s.]/)[0].slice(0, 4)}
          </span>

          {/* Proficiency ring */}
          <motion.div
            style={{
              position: 'absolute',
              top: '-3px',
              left: '-3px',
              right: '-3px',
              bottom: '-3px',
              borderRadius: '50%',
              border: `3px solid transparent`,
              borderTopColor: skill.color,
              opacity: hoveredSkill === skill.name ? 1 : 0
            }}
            animate={{
              rotate: hoveredSkill === skill.name ? 360 : 0,
              opacity: hoveredSkill === skill.name ? 1 : 0
            }}
            transition={{
              rotate: { duration: 1, repeat: Infinity, ease: 'linear' },
              opacity: { duration: 0.3 }
            }}
          />

          {/* Connection line to center */}
          <motion.div
            style={{
              position: 'absolute',
              width: '2px',
              height: Math.sqrt(skill.position.x ** 2 + skill.position.y ** 2) / 2,
              background: `linear-gradient(to bottom, ${skill.color}66, transparent)`,
              transformOrigin: 'bottom',
              bottom: '50%',
              left: '50%',
              transform: `translate(-50%, 100%) rotate(${Math.atan2(skill.position.y, skill.position.x) * 180 / Math.PI + 90}deg)`,
              opacity: hoveredSkill === skill.name ? 0.8 : 0.3
            }}
            animate={{
              opacity: hoveredSkill === skill.name ? 0.8 : 0.3,
              scaleY: hoveredSkill === skill.name ? 1.2 : 1
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      ))}

      {/* Floating particles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            background: `linear-gradient(45deg, #00d4ff, #ff00ff)`,
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`,
            transformStyle: 'preserve-3d'
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 40 - 20, 0],
            z: [0, Math.random() * 20 - 10, 0],
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.5, 1],
            rotateX: [0, 360, 0],
            rotateY: [0, 360, 0]
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: 'easeInOut'
          }}
        />
      ))}

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
        Move mouse to interact • Hover skills for details
      </div>
    </div>
  );
}
