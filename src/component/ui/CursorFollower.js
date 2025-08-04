'use client'
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function CursorFollower() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [cursorVariant, setCursorVariant] = useState('default');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = (e) => {
      const target = e.target;
      if (target.tagName === 'BUTTON' || target.closest('button')) {
        setCursorVariant('button');
        setIsHovering(true);
      } else if (target.tagName === 'A' || target.closest('a')) {
        setCursorVariant('link');
        setIsHovering(true);
      } else if (target.closest('[data-cursor="hover"]')) {
        setCursorVariant('hover');
        setIsHovering(true);
      } else {
        setCursorVariant('default');
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseover', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseover', handleMouseEnter);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1,
      backgroundColor: 'rgba(0, 212, 255, 0.3)',
      border: '2px solid rgba(0, 212, 255, 0.8)',
    },
    button: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      scale: 1.5,
      backgroundColor: 'rgba(255, 0, 255, 0.2)',
      border: '2px solid rgba(255, 0, 255, 0.8)',
    },
    link: {
      x: mousePosition.x - 20,
      y: mousePosition.y - 20,
      scale: 1.2,
      backgroundColor: 'rgba(255, 159, 219, 0.3)',
      border: '2px solid rgba(255, 159, 219, 0.8)',
    },
    hover: {
      x: mousePosition.x - 32,
      y: mousePosition.y - 32,
      scale: 2,
      backgroundColor: 'rgba(255, 255, 0, 0.1)',
      border: '2px solid rgba(255, 255, 0, 0.6)',
    }
  };

  return (
    <>
      {/* Main cursor */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'difference',
        }}
        variants={variants}
        animate={cursorVariant}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
          mass: 0.5
        }}
      />

      {/* Trailing dots */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: `${8 - i}px`,
            height: `${8 - i}px`,
            borderRadius: '50%',
            backgroundColor: `rgba(0, 212, 255, ${0.6 - i * 0.1})`,
            pointerEvents: 'none',
            zIndex: 9998 - i,
          }}
          animate={{
            x: mousePosition.x - (4 - i / 2),
            y: mousePosition.y - (4 - i / 2),
          }}
          transition={{
            type: 'spring',
            stiffness: 150 - i * 20,
            damping: 20 + i * 5,
            mass: 0.2 + i * 0.1
          }}
        />
      ))}

      {/* Ripple effect on click */}
      <motion.div
        style={{
          position: 'fixed',
          top: mousePosition.y - 25,
          left: mousePosition.x - 25,
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          border: '2px solid rgba(0, 212, 255, 0.8)',
          pointerEvents: 'none',
          zIndex: 9997,
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={isHovering ? { scale: 1, opacity: 0.5 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
      />
    </>
  );
}
