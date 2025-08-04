'use client'
import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';

// Lazy load heavy components
const VantaBackground = lazy(() => import('../Vanta/Vanta'));
const FloatingElements = lazy(() => import('../animations/FloatingElements'));
const CompactSkills = lazy(() => import('../animations/CompactSkills'));
const TypingAnimation = lazy(() => import('../animations/TypingAnimation'));

// Loading fallback component
const LoadingFallback = ({ height = '100px' }) => (
  <div style={{
    height,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'transparent'
  }}>
    <motion.div
      style={{
        width: '40px',
        height: '40px',
        border: '3px solid rgba(0, 212, 255, 0.3)',
        borderTop: '3px solid #00d4ff',
        borderRadius: '50%'
      }}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    />
  </div>
);

// Optimized wrapper components
export const OptimizedVantaBackground = () => (
  <Suspense fallback={null}>
    <VantaBackground />
  </Suspense>
);

export const OptimizedFloatingElements = ({ count = 15 }) => (
  <Suspense fallback={null}>
    <FloatingElements count={count} />
  </Suspense>
);

export const OptimizedCompactSkills = () => (
  <Suspense fallback={<LoadingFallback height="250px" />}>
    <CompactSkills />
  </Suspense>
);

export const OptimizedTypingAnimation = (props) => (
  <Suspense fallback={<span style={{ color: '#00d4ff' }}>React Developer</span>}>
    <TypingAnimation {...props} />
  </Suspense>
);
