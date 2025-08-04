import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import LoadingSpinner from './LoadingSpinner';

export default function ImageWithFallback({ 
  src, 
  alt, 
  fallbackSrc, 
  sx = {}, 
  showLoadingSpinner = true,
  fallbackContent = null 
}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  const handleLoad = () => {
    setLoading(false);
    setError(false);
  };

  const handleError = () => {
    setLoading(false);
    if (!error && fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setError(false);
    } else {
      setError(true);
    }
  };

  const defaultFallbackContent = (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 50%, rgba(240, 147, 251, 0.1) 100%)',
      border: '2px dashed rgba(102, 126, 234, 0.3)',
      borderRadius: '16px',
      color: '#667eea'
    }}>
      <Typography variant="h4" sx={{ mb: 1, opacity: 0.6 }}>
        🖼️
      </Typography>
      <Typography variant="body2" sx={{ opacity: 0.8, textAlign: 'center' }}>
        Image not available
      </Typography>
      <Typography variant="caption" sx={{ opacity: 0.6, textAlign: 'center', mt: 0.5 }}>
        {alt}
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100%', ...sx }}>
      {loading && showLoadingSpinner && (
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'rgba(255,255,255,0.9)',
          borderRadius: '16px',
          zIndex: 2
        }}>
          <LoadingSpinner message="Loading image..." size={40} />
        </Box>
      )}

      {error ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          style={{ width: '100%', height: '100%' }}
        >
          {fallbackContent || defaultFallbackContent}
        </motion.div>
      ) : (
        <motion.img
          src={currentSrc}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          initial={{ opacity: 0 }}
          animate={{ opacity: loading ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '16px',
            border: '3px solid transparent',
            background: 'linear-gradient(white, white) padding-box, linear-gradient(45deg, #667eea, #764ba2, #f093fb) border-box'
          }}
        />
      )}
    </Box>
  );
}
