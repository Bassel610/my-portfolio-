'use client'
import { motion, useScroll, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function ScrollProgress({ currentPage, totalPages, isMobile = false }) {
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  
  useEffect(() => {
    if (!isMobile) {
      // Desktop: use currentPage prop
      const pageIndex = ['page-one', 'page-two', 'page-three', 'page-four'].indexOf(currentPage);
      const newProgress = ((pageIndex + 1) / totalPages) * 100;
      setProgress(newProgress);
      setActiveIndex(pageIndex);
    } else {
      // Mobile: track scroll position
      const handleScroll = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        setProgress(scrollPercent);
        
        // Calculate which section is active based on scroll
        const sectionHeight = docHeight / totalPages;
        const currentSection = Math.min(
          Math.floor(scrollTop / sectionHeight),
          totalPages - 1
        );
        setActiveIndex(currentSection);
      };

      window.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial call

      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [currentPage, totalPages, isMobile]);

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
      backdropFilter: 'blur(10px)',
      width: '100%'
    }}>
      <motion.div
        style={{
          height: '100%',
          width: '100%',
          background: 'linear-gradient(90deg, #00d4ff, #ff00ff, #ffff00)',
          borderRadius: '0 2px 2px 0',
          scaleX: isMobile ? progress / 100 : springProgress / 100,
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
        gap: '8px',
        zIndex: 1001
      }}>
        {Array.from({ length: totalPages }, (_, i) => (
          <motion.div
            key={i}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: i === activeIndex
                ? '#00d4ff' 
                : 'rgba(255, 255, 255, 0.3)',
              boxShadow: i === activeIndex 
                ? '0 0 8px #00d4ff' 
                : 'none',
              transition: 'all 0.3s ease'
            }}
            whileHover={{ scale: 1.2 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          />
        ))}
      </div>
    </div>
  );
}
