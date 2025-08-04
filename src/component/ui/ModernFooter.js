'use client'
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Box, Typography, IconButton, Divider } from '@mui/material';
import GradientText from './GradientText';

export default function ModernFooter() {
  const [hoveredSocial, setHoveredSocial] = useState(null);

  const socialLinks = [
    { name: 'GitHub', icon: '🐙', url: 'https://github.com/basel', color: '#333' },
    { name: 'LinkedIn', icon: '💼', url: 'https://linkedin.com/in/basel', color: '#0077B5' },
    { name: 'Twitter', icon: '🐦', url: 'https://twitter.com/basel', color: '#1DA1F2' },
    { name: 'Email', icon: '📧', url: 'mailto:basel@example.com', color: '#EA4335' }
  ];

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      style={{
        background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(35, 21, 60, 0.9) 100%)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '20px 20px 0 0',
        padding: '40px 20px 20px',
        marginTop: '60px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Animated background elements */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.1,
        pointerEvents: 'none'
      }}>
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: '2px',
              height: '2px',
              borderRadius: '50%',
              background: '#00d4ff',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      <Box sx={{
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 2
      }}>
        {/* Main footer content */}
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '2fr 1fr 1fr' },
          gap: 4,
          mb: 4
        }}>
          {/* Brand section */}
          <Box>
            <motion.div
              whileHover={{ scale: 1.05 }}
              style={{ display: 'inline-block', marginBottom: '16px' }}
            >
              <GradientText variant="cyber" style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                Basel Sherif
              </GradientText>
            </motion.div>
            
            <Typography variant="body1" sx={{
              color: 'rgba(255, 255, 255, 0.8)',
              mb: 3,
              lineHeight: 1.6
            }}>
              React Developer passionate about creating innovative web experiences 
              with modern technologies and beautiful design.
            </Typography>

            {/* Social links */}
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 16px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '25px',
                    color: 'white',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: `${social.color}22`,
                    borderColor: `${social.color}66`
                  }}
                  whileTap={{ scale: 0.95 }}
                  onHoverStart={() => setHoveredSocial(social.name)}
                  onHoverEnd={() => setHoveredSocial(null)}
                >
                  <span style={{ fontSize: '16px' }}>{social.icon}</span>
                  {social.name}
                </motion.a>
              ))}
            </Box>
          </Box>

          {/* Quick links */}
          <Box>
            <Typography variant="h6" sx={{
              color: 'white',
              mb: 2,
              fontWeight: 'bold'
            }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {quickLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  style={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    textDecoration: 'none',
                    padding: '8px 0',
                    fontSize: '14px',
                    borderLeft: '2px solid transparent',
                    paddingLeft: '12px',
                    transition: 'all 0.3s ease'
                  }}
                  whileHover={{
                    color: '#00d4ff',
                    paddingLeft: '20px'
                  }}
                >
                  {link.name}
                </motion.a>
              ))}
            </Box>
          </Box>

          {/* Contact info */}
          <Box>
            <Typography variant="h6" sx={{
              color: 'white',
              mb: 2,
              fontWeight: 'bold'
            }}>
              Get In Touch
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <motion.div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '14px'
                }}
                whileHover={{ color: '#00d4ff' }}
              >
                <span style={{ fontSize: '16px' }}>📧</span>
                basel@example.com
              </motion.div>
              <motion.div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '14px'
                }}
                whileHover={{ color: '#00d4ff' }}
              >
                <span style={{ fontSize: '16px' }}>📍</span>
                Available for remote work
              </motion.div>
              <motion.div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '14px'
                }}
                whileHover={{ color: '#00d4ff' }}
              >
                <span style={{ fontSize: '16px' }}>💼</span>
                Open for opportunities
              </motion.div>
            </Box>
          </Box>
        </Box>

        {/* Divider */}
        <motion.div
          style={{
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
            margin: '30px 0'
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />

        {/* Bottom section */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2
        }}>
          <Typography variant="body2" sx={{
            color: 'rgba(255, 255, 255, 0.5)',
            fontSize: '12px'
          }}>
            © 2024 Basel Sherif. Crafted with ❤️ using React & Next.js
          </Typography>
          
          <motion.div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: 'rgba(255, 255, 255, 0.5)',
              fontSize: '12px'
            }}
            whileHover={{ color: '#00d4ff' }}
          >
            <span>Made with</span>
            <motion.span
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3
              }}
              style={{ fontSize: '14px' }}
            >
              ⚡
            </motion.span>
            <span>and passion</span>
          </motion.div>
        </Box>
      </Box>
    </motion.footer>
  );
}
