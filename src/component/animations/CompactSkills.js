'use client'
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function CompactSkills() {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const skills = [
    { name: 'React.js', level: 95, color: '#61DAFB', x: 0, y: 0 },
    { name: 'JavaScript', level: 90, color: '#F7DF1E', x: 80, y: -40 },
    { name: 'Next.js', level: 85, color: '#ffffff', x: -70, y: 50 },
    { name: 'Node.js', level: 75, color: '#339933', x: 60, y: 80 },
    { name: 'Material-UI', level: 82, color: '#0081CB', x: -80, y: -30 },
    { name: 'Git', level: 85, color: '#F05032', x: 40, y: -80 },
    { name: 'TypeScript', level: 80, color: '#3178C6', x: -40, y: 90 },
    { name: 'REST APIs', level: 88, color: '#FF6B6B', x: 90, y: 20 }
  ];

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      maxWidth: '300px',
      height: '250px',
      margin: '2rem auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Central hub */}
      <motion.div
        style={{
          position: 'absolute',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '12px',
          boxShadow: '0 8px 32px rgba(102, 126, 234, 0.4)',
          zIndex: 10
        }}
        animate={{
          rotate: 360,
          scale: hoveredSkill ? 1.1 : 1
        }}
        transition={{
          rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
          scale: { duration: 0.3 }
        }}
      >
        Skills
      </motion.div>

      {/* Skill bubbles */}
      {skills.map((skill, index) => (
        <motion.div
          key={skill.name}
          style={{
            position: 'absolute',
            left: `calc(50% + ${skill.x}px)`,
            top: `calc(50% + ${skill.y}px)`,
            transform: 'translate(-50%, -50%)',
            cursor: 'pointer'
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: 1, 
            scale: hoveredSkill === skill.name ? 1.3 : 1,
            y: hoveredSkill === skill.name ? -10 : 0
          }}
          transition={{ 
            delay: index * 0.1,
            duration: 0.5,
            type: 'spring',
            stiffness: 300
          }}
          onHoverStart={() => setHoveredSkill(skill.name)}
          onHoverEnd={() => setHoveredSkill(null)}
          whileHover={{ scale: 1.3, y: -10 }}
        >
          {/* Connection line to center */}
          <motion.div
            style={{
              position: 'absolute',
              width: '2px',
              height: Math.sqrt(skill.x * skill.x + skill.y * skill.y),
              background: `linear-gradient(to bottom, ${skill.color}44, transparent)`,
              transformOrigin: 'bottom',
              bottom: '50%',
              left: '50%',
              transform: `translate(-50%, 100%) rotate(${Math.atan2(skill.y, skill.x) * 180 / Math.PI + 90}deg)`,
              opacity: hoveredSkill === skill.name ? 0.8 : 0.3
            }}
            animate={{
              opacity: hoveredSkill === skill.name ? 0.8 : 0.3,
              scaleY: hoveredSkill === skill.name ? 1.1 : 1
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Skill bubble */}
          <motion.div
            style={{
              width: '45px',
              height: '45px',
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${skill.color}, ${skill.color}88)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: skill.color === '#ffffff' ? '#000' : '#fff',
              fontWeight: 'bold',
              fontSize: '10px',
              textAlign: 'center',
              boxShadow: `0 4px 20px ${skill.color}44`,
              border: `2px solid ${skill.color}66`,
              position: 'relative',
              overflow: 'hidden'
            }}
            animate={{
              boxShadow: hoveredSkill === skill.name 
                ? `0 8px 32px ${skill.color}88` 
                : `0 4px 20px ${skill.color}44`
            }}
          >
            {/* Skill name (abbreviated) */}
            <span style={{ zIndex: 2, position: 'relative' }}>
              {skill.name.split(/[\s.]/)[0].slice(0, 4)}
            </span>

            {/* Proficiency ring */}
            <motion.div
              style={{
                position: 'absolute',
                top: '-2px',
                left: '-2px',
                right: '-2px',
                bottom: '-2px',
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
          </motion.div>

          {/* Tooltip */}
          {hoveredSkill === skill.name && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                position: 'absolute',
                top: '-60px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(0, 0, 0, 0.9)',
                color: 'white',
                padding: '8px 12px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 'bold',
                whiteSpace: 'nowrap',
                zIndex: 20,
                backdropFilter: 'blur(10px)',
                border: `1px solid ${skill.color}66`
              }}
            >
              {skill.name}: {skill.level}%
              <div style={{
                position: 'absolute',
                top: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: 0,
                height: 0,
                borderLeft: '6px solid transparent',
                borderRight: '6px solid transparent',
                borderTop: '6px solid rgba(0, 0, 0, 0.9)'
              }} />
            </motion.div>
          )}
        </motion.div>
      ))}

      {/* Floating particles */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            background: `linear-gradient(45deg, #00d4ff, #ff00ff)`,
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      ))}
    </div>
  );
}
