'use client'
import { useState, useEffect } from 'react';
import { Box, IconButton, Fab } from '@mui/material';
import { KeyboardArrowUp, KeyboardArrowDown, Home, Person, Work, ContactMail } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

export default function MobileNavigation({ currentSection, onNavigate }) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const sections = [
    { id: 'First_screen', name: 'Home', icon: <Home /> },
    { id: 'Screen_tow', name: 'About', icon: <Person /> },
    { id: 'Screen_three', name: 'Experience', icon: <Work /> },
    { id: 'screen-four', name: 'Projects', icon: <ContactMail /> }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide nav when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToNext = () => {
    const currentIndex = sections.findIndex(s => s.id === currentSection);
    if (currentIndex < sections.length - 1) {
      scrollToSection(sections[currentIndex + 1].id);
    }
  };

  return (
    <>
      {/* Floating Navigation Dots */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            style={{
              position: 'fixed',
              right: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 1000,
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Box
                  onClick={() => scrollToSection(section.id)}
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    backgroundColor: currentSection === section.id 
                      ? '#667eea' 
                      : 'rgba(255, 255, 255, 0.3)',
                    border: '2px solid rgba(255, 255, 255, 0.5)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: currentSection === section.id 
                      ? '0 0 20px rgba(102, 126, 234, 0.6)' 
                      : 'none'
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Action Buttons */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            style={{
              position: 'fixed',
              bottom: '30px',
              right: '20px',
              zIndex: 1000,
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            {/* Scroll to Top */}
            <Fab
              size="small"
              onClick={scrollToTop}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)'
                }
              }}
            >
              <KeyboardArrowUp />
            </Fab>

            {/* Scroll to Next Section */}
            <Fab
              size="small"
              onClick={scrollToNext}
              sx={{
                backgroundColor: 'rgba(102, 126, 234, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(102, 126, 234, 1)'
                }
              }}
            >
              <KeyboardArrowDown />
            </Fab>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
