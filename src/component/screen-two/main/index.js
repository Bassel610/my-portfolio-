'use client'
import { Typography, Box, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import CompactSkills from '../../animations/CompactSkills';
import GradientText from '../../ui/GradientText';
import TiltCard from '../../ui/TiltCard';

export default function AboutSection() {
  const skills = [
    'React', 'Next.js', 'Material-UI', 
    'Node.js', 'REST APIs', 'Jest',
    'SQL/NoSQL', 'Figma', 'Git'
  ];

  return (
    <Box sx={{
      position: 'relative',
      height: 'calc(100vh - 80px)', // Accounts for footer
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#fff',
      textAlign: 'center',
      px: 4,
      overflow: 'hidden'
    }}>
      {/* Background overlay */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1
      }} />

      {/* Content */}
      <Box sx={{
        position: 'relative',
        zIndex: 2,
        maxWidth: '800px',
        width: '100%'
      }}>
        <Typography 
          variant="h2" 
          sx={{
            fontWeight: 700,
            mb: 3,
            fontSize: { xs: '2.5rem', md: '3rem' },
            textShadow: '0 2px 10px rgba(0,0,0,0.7)'
          }}
        >
          <GradientText variant="primary" animate={true}>
            Basel Sherif
          </GradientText>
        </Typography>

        <Typography 
          variant="h5" 
          sx={{
            fontWeight: 400,
            mb: 4,
            textShadow: '0 1px 5px rgba(0,0,0,0.5)'
          }}
        >
          <GradientText mb="5px" variant="accent" animate={true}>
            React Specialist | Full-Stack Developer
          </GradientText>
        </Typography>

        <Typography 
          paragraph 
          sx={{
            fontSize: '1.1rem',
            lineHeight: 1.8,
            mb: 4,
            textShadow: '0 1px 3px rgba(0,0,0,0.4)'
          }}
        >
Experienced React Developer with 2+ years of crafting high-performance web applications in agile environments. Passionate about turning complex problems into intuitive, user-centric solutions—whether working on frontend architectures, integrating APIs, or collaborating on full-stack features. Adept at writing clean, scalable code and thriving in team-driven settings where quality and maintainability matter. While most of my work has been in proprietary company projects, I bring a track record of delivering robust applications that meet both business and technical demands.
        </Typography>

        {/* Compact Skills Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5, type: 'spring' }}
        >
          <CompactSkills />
        </motion.div>
      </Box>
    </Box>
  );
}