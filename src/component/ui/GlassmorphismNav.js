'use client'
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function GlassmorphismNav({ currentPage, totalPages }) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollTime, setLastScrollTime] = useState(Date.now());

  const pages = [
    { id: 'page-one', name: 'Home', icon: '🏠' },
    { id: 'page-two', name: 'About', icon: '👨‍💻' },
    { id: 'page-three', name: 'Experience', icon: '🚀' },
    { id: 'page-four', name: 'Contact', icon: '📧' }
  ];

  useEffect(() => {
    setLastScrollTime(Date.now());
    setIsVisible(true);

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentPage]);

  const currentIndex = pages.findIndex(page => page.id === currentPage);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ 
        opacity: isVisible ? 1 : 0.3,
        y: 0,
        scale: isVisible ? 1 : 0.95
      }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        pointerEvents: 'none',
        width: 'auto',
        maxWidth: 'calc(100vw - 40px)'
      }}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '50px',
        padding: window.innerWidth < 768 ? '8px 16px' : '12px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: window.innerWidth < 768 ? '12px' : '20px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        pointerEvents: 'auto',
        fontSize: window.innerWidth < 768 ? '14px' : '16px',
        flexWrap: 'nowrap',
        overflow: 'hidden'
      }}>
        {/* Logo/Brand */}
        <motion.div
          style={{
            fontSize: window.innerWidth < 768 ? '16px' : '20px',
            fontWeight: 'bold',
            color: '#fff',
            marginRight: window.innerWidth < 768 ? '5px' : '10px',
            display: window.innerWidth < 480 ? 'none' : 'block'
          }}
          whileHover={{ scale: 1.1 }}
        >
          BS
        </motion.div>

        {/* Page Indicators */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          {pages.map((page, index) => (
            <motion.div
              key={page.id}
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 12px',
                borderRadius: '25px',
                cursor: 'pointer',
                color: currentIndex === index ? '#fff' : 'rgba(255, 255, 255, 0.6)',
                fontSize: '14px',
                fontWeight: '500'
              }}
              whileHover={{ 
                scale: 1.05,
                color: '#fff'
              }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Active background */}
              {currentIndex === index && (
                <motion.div
                  layoutId="activeNav"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))',
                    borderRadius: '25px',
                    border: '1px solid rgba(255, 255, 255, 0.3)'
                  }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}

              {/* Icon */}
              <span style={{ 
                fontSize: '16px',
                position: 'relative',
                zIndex: 1
              }}>
                {page.icon}
              </span>

              {/* Text (only show on hover or active) */}
              <motion.span
                style={{
                  position: 'relative',
                  zIndex: 1,
                  overflow: 'hidden',
                  whiteSpace: 'nowrap'
                }}
                initial={{ width: 0, opacity: 0 }}
                animate={{ 
                  width: currentIndex === index ? 'auto' : 0,
                  opacity: currentIndex === index ? 1 : 0
                }}
                whileHover={{ width: 'auto', opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {page.name}
              </motion.span>
            </motion.div>
          ))}
        </div>

        {/* Progress indicator */}
        <div style={{
          width: '60px',
          height: '4px',
          background: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '2px',
          overflow: 'hidden',
          marginLeft: '10px'
        }}>
          <motion.div
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, #00d4ff, #ff00ff)',
              borderRadius: '2px'
            }}
            initial={{ width: '0%' }}
            animate={{ width: `${((currentIndex + 1) / totalPages) * 100}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </div>
    </motion.div>
  );
}
