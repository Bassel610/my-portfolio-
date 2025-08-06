'use client'
import { Box } from '@mui/material';
import { useTheme, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';

export default function ResponsiveWrapper({ children, mobileProps = {}, desktopProps = {} }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Box>{children}</Box>;
  }

  const responsiveProps = isMobile ? mobileProps : desktopProps;

  return (
    <Box {...responsiveProps}>
      {children}
    </Box>
  );
}

// Hook for responsive values
export const useResponsive = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return {
    isMobile: mounted ? isMobile : false,
    isTablet: mounted ? isTablet : false,
    isDesktop: mounted ? isDesktop : false,
    mounted
  };
};

// Mobile-optimized animation settings
export const getMobileAnimationSettings = (isMobile) => ({
  duration: isMobile ? 0.3 : 0.6,
  stiffness: isMobile ? 300 : 200,
  damping: isMobile ? 25 : 20,
  mass: isMobile ? 0.8 : 1,
  reducedMotion: isMobile
});

// Touch-friendly button props
export const getTouchFriendlyProps = (isMobile) => ({
  sx: {
    minHeight: isMobile ? 44 : 36,
    minWidth: isMobile ? 44 : 'auto',
    fontSize: isMobile ? '16px' : '14px',
    padding: isMobile ? '12px 16px' : '8px 12px'
  }
});
