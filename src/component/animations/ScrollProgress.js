'use client'
import { motion, useScroll, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function ScrollProgress({ currentPage, totalPages }) {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const pageIndex = ['page-one', 'page-two', 'page-three', 'page-four'].indexOf(currentPage);
    const newProgress = ((pageIndex + 1) / totalPages) * 100;
    setProgress(newProgress);
  }, [currentPage, totalPages]);

  const springProgress = useSpring(progress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '4px',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      zIndex: 1000,
      backdropFilter: 'blur(10px)'
    }}>
      <motion.div
        style={{
          height: '100%',
          background: 'linear-gradient(90deg, #00d4ff, #ff00ff, #ffff00)',
          borderRadius: '0 2px 2px 0',
          scaleX: springProgress / 100,
          transformOrigin: '0%'
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: progress / 100 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
      
      {/* Page indicators */}
      <div style={{
        position: 'absolute',
        top: '8px',
        right: '20px',
        display: 'flex',
        gap: '8px'
      }}>
        {Array.from({ length: totalPages }, (_, i) => (
          <motion.div
            key={i}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: i === Math.floor((progress / 100) * totalPages) 
                ? '#00d4ff' 
                : 'rgba(255, 255, 255, 0.3)'
            }}
            whileHover={{ scale: 1.2 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          />
        ))}
      </div>
    </div>
  );
}
