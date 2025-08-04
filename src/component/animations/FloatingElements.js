'use client'
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function FloatingElements({ count = 20 }) {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    const newElements = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.5 + 0.1
    }));
    setElements(newElements);
  }, [count]);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 1
    }}>
      {elements.map((element) => (
        <motion.div
          key={element.id}
          style={{
            position: 'absolute',
            left: element.x,
            top: element.y,
            width: element.size,
            height: element.size,
            borderRadius: '50%',
            background: `linear-gradient(45deg, #00d4ff${Math.floor(element.opacity * 255).toString(16)}, #ff00ff${Math.floor(element.opacity * 255).toString(16)})`,
            filter: 'blur(1px)'
          }}
          animate={{
            y: [element.y, element.y - 100, element.y],
            x: [element.x, element.x + 50, element.x - 50, element.x],
            scale: [1, 1.2, 0.8, 1],
            opacity: [element.opacity, element.opacity * 1.5, element.opacity * 0.5, element.opacity]
          }}
          transition={{
            duration: element.duration,
            repeat: Infinity,
            delay: element.delay,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  );
}
