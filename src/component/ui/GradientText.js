'use client'
import { motion } from 'framer-motion';

export default function GradientText({ 
  children, 
  variant = 'primary',
  animate = true,
  className = '',
  style = {} 
}) {
  const gradients = {
    primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    secondary: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    accent: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    rainbow: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
    gold: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
    cyber: 'linear-gradient(135deg, #00d4ff 0%, #ff00ff 50%, #ffff00 100%)'
  };

  const textStyle = {
    background: gradients[variant],
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    display: 'inline-block',
    fontWeight: 'bold',
    ...style
  };

  if (animate) {
    return (
      <motion.span
        className={className}
        style={textStyle}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        whileHover={{ 
          scale: 1.05,
          transition: { duration: 0.2 }
        }}
      >
        {children}
      </motion.span>
    );
  }

  return (
    <span className={className} style={textStyle}>
      {children}
    </span>
  );
}
