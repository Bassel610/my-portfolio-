import { Box, IconButton } from "@mui/material";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Projects from "./projects";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function MobileProjectSlider({ projects }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const projectKeys = Object.keys(projects);
  const totalProjects = projectKeys.length;

  const handleNext = () => {
    if (currentIndex < totalProjects - 1) {
      setDirection(1);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    setIsDragging(false);
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
    const distance = Math.abs(touchStartX.current - touchEndX.current);
    if (distance > 10) {
      setIsDragging(true);
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    
    const swipeDistance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0) {
        // Swiped left - go to next
        handleNext();
      } else {
        // Swiped right - go to previous
        handlePrev();
      }
    }
    
    setIsDragging(false);
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0
    })
  };

  const currentProjectKey = projectKeys[currentIndex];
  const currentProject = projects[currentProjectKey];

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        touchAction: 'pan-y pinch-zoom'
      }}
    >
      {/* Slider Container */}
      <Box 
        sx={{
          flex: 1,
          position: 'relative',
          overflow: 'hidden',
          width: '100%'
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              overflow: 'auto',
              pointerEvents: isDragging ? 'none' : 'auto'
            }}
          >
            <Projects {...currentProject.props} />
          </motion.div>
        </AnimatePresence>
      </Box>

      {/* Navigation Arrows */}
      {currentIndex > 0 && (
        <IconButton
          onClick={handlePrev}
          disableRipple
          sx={{
            position: 'absolute',
            left: 10,
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: 'white',
            zIndex: 10,
            '&:hover': {
              background: 'rgba(255, 255, 255, 0.2)'
            },
            '&:active': {
              transform: 'translateY(-50%) scale(0.95)'
            }
          }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>
      )}

      {currentIndex < totalProjects - 1 && (
        <IconButton
          onClick={handleNext}
          disableRipple
          sx={{
            position: 'absolute',
            right: 10,
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: 'white',
            zIndex: 10,
            '&:hover': {
              background: 'rgba(255, 255, 255, 0.2)'
            },
            '&:active': {
              transform: 'translateY(-50%) scale(0.95)'
            }
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      )}

      {/* Pagination Dots */}
      <Box sx={{
        position: 'absolute',
        bottom: 20,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: 1,
        zIndex: 10
      }}>
        {projectKeys.map((_, index) => (
          <Box
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            sx={{
              width: currentIndex === index ? 24 : 8,
              height: 8,
              borderRadius: '4px',
              background: currentIndex === index 
                ? 'linear-gradient(45deg, #667eea, #764ba2)' 
                : 'rgba(255, 255, 255, 0.3)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: currentIndex === index 
                  ? 'linear-gradient(45deg, #667eea, #764ba2)' 
                  : 'rgba(255, 255, 255, 0.5)'
              }
            }}
          />
        ))}
      </Box>

      {/* Swipe Hint (shows only on first project) */}
      {currentIndex === 0 && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 3, duration: 1 }}
          style={{
            position: 'absolute',
            bottom: 60,
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '0.85rem',
            textAlign: 'center',
            zIndex: 10
          }}
        >
          ← Swipe to navigate →
        </motion.div>
      )}
    </Box>
  );
}
