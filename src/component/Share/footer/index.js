'use client'
import { Avatar, Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <Box
      component={motion.footer}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      sx={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        zIndex: 1000,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: '50px',
        padding: '10px 20px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
      }}
    >
      <Avatar
        src="https://raw.githubusercontent.com/Basel-Sherif/imge/refs/heads/main/WhatsApp%20Image%202025-08-03%20at%2016.13.42_18b24c87.jpg"
        alt="Your Name"
        sx={{
          width: 40,
          height: 40,
          border: '2px solid rgba(255, 255, 255, 0.3)',
        }}
      />
      <Typography
        variant="body2"
        sx={{
          color: 'white',
          fontWeight: 500,
        }}
      >
        © Basel sherif
      </Typography>
    </Box>
  );
};

export default Footer;