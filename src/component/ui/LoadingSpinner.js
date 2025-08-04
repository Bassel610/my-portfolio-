import { Box, CircularProgress, Typography } from '@mui/material';
import { motion } from 'framer-motion';

export default function LoadingSpinner({ message = "Loading...", size = 60, fullScreen = false }) {
  const containerStyle = fullScreen ? {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
    zIndex: 9999
  } : {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '200px',
    width: '100%'
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Box sx={containerStyle}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <CircularProgress 
            size={size} 
            sx={{ 
              color: fullScreen ? 'white' : '#667eea',
              mb: 2
            }} 
          />
        </motion.div>
        
        <Typography 
          variant="h6" 
          sx={{ 
            color: fullScreen ? 'white' : '#2c3e50',
            fontWeight: 500,
            textAlign: 'center'
          }}
        >
          {message}
        </Typography>
        
        {fullScreen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'rgba(255,255,255,0.8)',
                mt: 1,
                textAlign: 'center'
              }}
            >
              Preparing your portfolio experience...
            </Typography>
          </motion.div>
        )}
      </Box>
    </motion.div>
  );
}
