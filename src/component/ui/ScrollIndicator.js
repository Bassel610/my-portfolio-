import { motion, AnimatePresence } from 'framer-motion';

/**
 * ScrollIndicator Component
 * Displays visual arrows indicating available scroll directions within a section
 * 
 * @param {boolean} canScrollDown - Whether user can scroll down
 * @param {boolean} canScrollUp - Whether user can scroll up
 * @param {string} position - Horizontal position ('left', 'right', 'center')
 */
export default function ScrollIndicator({ 
  canScrollDown = false, 
  canScrollUp = false, 
  position = 'right' 
}) {
  const getPositionStyle = () => {
    switch (position) {
      case 'left':
        return { left: '20px' };
      case 'center':
        return { left: '50%', transform: 'translateX(-50%)' };
      case 'right':
      default:
        return { right: '20px' };
    }
  };

  const positionStyle = getPositionStyle();

  // Base indicator style
  const indicatorStyle = {
    position: 'fixed',
    ...positionStyle,
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    color: 'rgba(255, 255, 255, 0.9)',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    zIndex: 900,
    pointerEvents: 'none', // Non-interactive, visual feedback only
    userSelect: 'none'
  };

  // Animation variants for fade in/out
  const fadeVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      scale: 1
    },
    exit: {
      opacity: 0,
      scale: 0.8
    }
  };

  // Pulsing animation
  const pulseAnimation = {
    scale: [1, 1.1, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  };

  return (
    <>
      {/* Up Arrow Indicator */}
      <AnimatePresence>
        {canScrollUp && (
          <motion.div
            style={{
              ...indicatorStyle,
              top: '20%'
            }}
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <motion.div
              animate={pulseAnimation}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ↑
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Down Arrow Indicator */}
      <AnimatePresence>
        {canScrollDown && (
          <motion.div
            style={{
              ...indicatorStyle,
              bottom: '20%'
            }}
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <motion.div
              animate={pulseAnimation}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ↓
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
