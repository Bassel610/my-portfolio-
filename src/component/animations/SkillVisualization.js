'use client'
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';

export default function SkillVisualization({ skills = [] }) {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const defaultSkills = [
    { name: 'React.js', level: 95, color: '#61DAFB' },
    { name: 'JavaScript', level: 90, color: '#F7DF1E' },
    { name: 'Next.js', level: 85, color: '#000000' },
    { name: 'Node.js', level: 75, color: '#339933' },
    { name: 'Material-UI', level: 82, color: '#0081CB' },
    { name: 'Git', level: 85, color: '#F05032' }
  ];

  const skillsToShow = skills.length > 0 ? skills : defaultSkills;

  return (
    <div ref={ref} style={{ padding: '2rem 0' }}>
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{
          textAlign: 'center',
          marginBottom: '2rem',
          color: '#fff',
          fontSize: '2rem',
          fontWeight: 'bold'
        }}
      >
        Technical Skills
      </motion.h3>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem',
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        {skillsToShow.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              padding: '1rem',
              borderRadius: '12px',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.5rem'
            }}>
              <span style={{ color: '#fff', fontWeight: '600' }}>
                {skill.name}
              </span>
              <span style={{ color: skill.color, fontWeight: 'bold' }}>
                {skill.level}%
              </span>
            </div>
            
            <div style={{
              width: '100%',
              height: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <motion.div
                initial={{ width: 0 }}
                animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                transition={{ duration: 1, delay: index * 0.1 + 0.3, ease: 'easeOut' }}
                style={{
                  height: '100%',
                  background: `linear-gradient(90deg, ${skill.color}, ${skill.color}88)`,
                  borderRadius: '4px',
                  boxShadow: `0 0 10px ${skill.color}44`
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
