'use client'
import { memo, useMemo, useCallback } from 'react';

// Performance monitoring hook
export const usePerformanceMonitor = () => {
  const logPerformance = useCallback((componentName) => {
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      const now = performance.now();
      console.log(`${componentName} rendered at ${now.toFixed(2)}ms`);
    }
  }, []);

  return { logPerformance };
};

// Optimized animation settings based on device performance
export const useOptimizedAnimations = () => {
  const animationSettings = useMemo(() => {
    if (typeof window === 'undefined') return { reduced: false };
    
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Check device performance indicators
    const isLowEndDevice = navigator.hardwareConcurrency <= 4 || 
                          navigator.deviceMemory <= 4 ||
                          /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    return {
      reduced: prefersReducedMotion || isLowEndDevice,
      particleCount: isLowEndDevice ? 8 : 15,
      animationDuration: isLowEndDevice ? 0.8 : 1.2,
      enableBlur: !isLowEndDevice,
      enable3D: !isLowEndDevice
    };
  }, []);

  return animationSettings;
};

// Memoized components for better performance
export const MemoizedMotionDiv = memo(({ children, ...props }) => {
  const { motion } = require('framer-motion');
  return <motion.div {...props}>{children}</motion.div>;
});

// Intersection Observer hook for performance
export const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [ref, setRef] = useState(null);

  useEffect(() => {
    if (!ref || typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      { threshold: 0.1, ...options }
    );

    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, options]);

  return [setRef, isIntersecting];
};

// Debounced resize hook
export const useDebouncedResize = (callback, delay = 250) => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(callback, delay);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, [callback, delay]);
};
