'use client';
import React, { useState, useEffect } from "react";
import { 
  Box, 
  Typography, 
  Button, 
  useTheme
} from "@mui/material";
import { motion } from "framer-motion";
import TypingAnimation from "../animations/TypingAnimation";
import GradientText from "../ui/GradientText";
import TiltCard from "../ui/TiltCard";


const HeroSection = () => {
  const theme = useTheme();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // This ensures the code only runs on client-side
    if (typeof window === 'undefined') return;
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < theme.breakpoints.values.sm);
    };
    
    // Initial check
    checkMobile();
    
    // Add event listener for resize
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, [theme.breakpoints.values.sm]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <Box
      sx={{
        minHeight: "33vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        px: 3,
        py: 10,
        position: "relative",
        overflow: "hidden"
      }}
    >

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ width: '100%' }}
      >
        <motion.div variants={itemVariants}>
          <Typography
            variant={isMobile ? "h4" : "h2"}
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              color: "#E0D3FF",
              mb: 2,
            }}
          >
            Hi, I'm{" "}
            <GradientText variant="cyber" animate={true}>
              Basel Sherif
            </GradientText>
          </Typography>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Typography
            variant={isMobile ? "h6" : "h4"}
            component="h2"
            sx={{
              fontWeight: 400,
              color: "#E0D3FF",
              mb: 2,
              maxWidth: "800px",
              mx: "auto",
            }}
          >
            I'm a{" "}
            <TypingAnimation 
              texts={[
                "React.js Developer",
                "Frontend Engineer", 
                "UI/UX Enthusiast",
                "Problem Solver"
              ]}
              speed={100}
              deleteSpeed={50}
              delayBetweenTexts={2000}
              style={{
                color: "#00d4ff",
                fontWeight: 600
              }}
            />
          </Typography>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Typography
            variant={isMobile ? "body1" : "h6"}
            sx={{
              fontWeight: 400,
              color: "rgba(224, 211, 255, 0.8)",
              mb: 4,
              maxWidth: "600px",
              mx: "auto",
              lineHeight: 1.6
            }}
          >
            I build solutions that are{" "}
            <motion.span 
              style={{ 
                color: "#FF9FDB",
                fontWeight: 600
              }}
              whileHover={{ scale: 1.05 }}
            >
              efficient, scalable, and user-focused
            </motion.span>
            .
          </Typography>
        </motion.div>
      </motion.div>
    </Box>
  );
};

export default HeroSection;