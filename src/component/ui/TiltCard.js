'use client'
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function TiltCard({ 
  children, 
  className = '',
  style = {},
  tiltIntensity = 15,
  scaleOnHover = 1.05,
  glowColor = '#00d4ff'
}) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e) => {
    if (!isHovering) return;
    
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    const rotateXValue = (mouseY / (rect.height / 2)) * -tiltIntensity;
    const rotateYValue = (mouseX / (rect.width / 2)) * tiltIntensity;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      className={className}
      style={{
        perspective: '1000px',
        ...style
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor="hover"
    >
      <motion.div
        style={{
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          position: 'relative',
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '20px',
          overflow: 'hidden',
          cursor: 'pointer'
        }}
        animate={{
          rotateX: rotateX,
          rotateY: rotateY,
          scale: isHovering ? scaleOnHover : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30
        }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Glow effect */}
        <motion.div
          style={{
            position: 'absolute',
            top: '-2px',
            left: '-2px',
            right: '-2px',
            bottom: '-2px',
            background: `linear-gradient(135deg, ${glowColor}22, transparent, ${glowColor}22)`,
            borderRadius: '22px',
            zIndex: -1,
            opacity: 0
          }}
          animate={{
            opacity: isHovering ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Shine effect */}
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
            zIndex: 1,
            pointerEvents: 'none'
          }}
          animate={{
            left: isHovering ? '100%' : '-100%',
          }}
          transition={{
            duration: 0.6,
            ease: 'easeInOut'
          }}
        />

        {/* Content */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          height: '100%',
          padding: '20px'
        }}>
          {children}
        </div>

        {/* Floating particles */}
        {isHovering && Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              background: glowColor,
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
              pointerEvents: 'none',
              zIndex: 3
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              y: [0, -30, -60],
              x: [0, Math.random() * 40 - 20, Math.random() * 80 - 40]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: 'easeOut'
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
