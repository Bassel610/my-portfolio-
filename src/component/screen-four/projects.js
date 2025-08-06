import { Box, Stack, Typography, useTheme, useMediaQuery } from "@mui/material";
import { useState } from 'react';
import ImageWithFallback from '../ui/ImageWithFallback';
import LoadingSpinner from '../ui/LoadingSpinner';

export default function Projects({ title, description, img, isIframe = false }) {
    const [iframeLoading, setIframeLoading] = useState(true);
    const [iframeError, setIframeError] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <>
        <Box>
            {/* Mobile Project Title */}
            {isMobile && (
                <Box sx={{
                    textAlign: 'center',
                    py: 3,
                    px: 2,
                    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                    <Typography
                        variant="h4"
                        sx={{
                            color: 'white',
                            fontWeight: 'bold',
                            mb: 1,
                            fontSize: { xs: '1.5rem', sm: '2rem' }
                        }}
                    >
                        {title}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            color: 'rgba(255, 255, 255, 0.7)',
                            fontSize: { xs: '0.9rem', sm: '1rem' }
                        }}
                    >
                        Project Showcase
                    </Typography>
                </Box>
            )}
        </Box>
        <Stack
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight={{ xs: 'auto', md: '100vh' }}
            flexDirection={{ xs: 'column', md: 'row' }}
            height={{ xs: 'auto', md: '475px' }}
            sx={{ py: { xs: 2, md: 0 } }}
        >
            <Stack
            flexDirection={{ xs: 'column', md: 'row' }}
            justifyContent='space-between'
                spacing={{ xs: 3, md: 2 }}
                sx={{
                    maxWidth: { xs: '100%', md: 1200 },
                    p: { xs: 1, md: 2 },
                    textAlign: 'center',
                    width: '100%'
                }}
            >
                <Stack
                    width={{ xs: '100%', md: '55%' }}
                    sx={{
                        height: { xs: '250px', sm: '300px', md: '400px' },
                        position: 'relative',
                        order: { xs: 2, md: 1 }
                    }}
                >
                    {isIframe ? (
                        <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
                            {iframeLoading && (
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
                                    <LoadingSpinner message="Loading project..." size={50} />
                                </Box>
                            )}
                            
                            {iframeError ? (
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: '100%',
                                    height: '100%',
                                    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 50%, rgba(240, 147, 251, 0.1) 100%)',
                                    border: '3px solid transparent',
                                    borderRadius: '16px',
                                    backgroundImage: 'linear-gradient(white, white), linear-gradient(45deg, #667eea, #764ba2, #f093fb)',
                                    backgroundOrigin: 'border-box',
                                    backgroundClip: 'content-box, border-box',
                                    color: '#667eea'
                                }}>
                                    <Box sx={{ fontSize: '3rem', mb: 2 }}>🌐</Box>
                                    <Box sx={{ textAlign: 'center', px: 2 }}>
                                        <Box sx={{ fontWeight: 'bold', mb: 1 }}>Unable to load project</Box>
                                        <Box sx={{ fontSize: '0.9rem', opacity: 0.8 }}>This project might be temporarily unavailable</Box>
                                    </Box>
                                </Box>
                            ) : (
                                <Box
                                    component="iframe"
                                    src={img}
                                    onLoad={() => setIframeLoading(false)}
                                    onError={() => {
                                        setIframeLoading(false);
                                        setIframeError(true);
                                    }}
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        border: '3px solid transparent',
                                        borderRadius: '16px',
                                        background: 'linear-gradient(white, white) padding-box, linear-gradient(45deg, #667eea, #764ba2, #f093fb) border-box',
                                        boxShadow: '0 10px 40px rgba(102, 126, 234, 0.2)',
                                        transition: 'all 0.4s ease',
                                        opacity: iframeLoading ? 0 : 1,
                                        '&:hover': {
                                            boxShadow: '0 15px 60px rgba(102, 126, 234, 0.35)',
                                            transform: 'translateY(-4px) scale(1.02)'
                                        }
                                    }}
                                    title={title}
                                    loading="lazy"
                                />
                            )}
                        </Box>
                    ) : (
                        <ImageWithFallback
                            src={img}
                            alt={title}
                            fallbackSrc="/images/project-placeholder.png"
                            sx={{
                                '&:hover': {
                                    transform: 'translateY(-4px) scale(1.02)',
                                    boxShadow: '0 15px 60px rgba(102, 126, 234, 0.35)'
                                }
                            }}
                        />
                    )}
                </Stack>
                    <Stack width='45%' sx={{
                        // Text styling
                        fontFamily: 'inherit', // or your preferred font stack
                        color: '#1a237e', // uses theme's text color
                        wordWrap: 'break-word', // ensures long words break properly
                        overflowWrap: 'break-word', // alternative to wordWrap
                        pl: 3, // padding left for better spacing
                        justifyContent: 'center'
                    }}>
                        <Box sx={{
                            fontSize: '1.8rem', // Increased font size
                            fontWeight: 700, // bold
                            lineHeight: 1.2,
                            mb: 2, // margin-bottom
                            background: 'linear-gradient(45deg, #667eea, #764ba2, #f093fb)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>
                            {title}
                        </Box>
                        <Box sx={{
                            fontSize: '1.1rem', // Increased from 1rem for better readability
                            lineHeight: 1.8, // Increased line height for better spacing
                            color: '#2c3e50', // Darker color for better contrast and readability
                            textAlign: 'left', // Changed from justify to left for better readability
                            fontWeight: 400, // Added font weight for better text clarity
                            letterSpacing: '0.3px', // Added letter spacing for better readability
                            maxHeight: '280px',
                            overflowY: 'auto',
                            pr: 1,
                            '&::-webkit-scrollbar': {
                                width: '8px'
                            },
                            '&::-webkit-scrollbar-track': {
                                background: 'rgba(102, 126, 234, 0.1)',
                                borderRadius: '12px',
                                border: '1px solid rgba(102, 126, 234, 0.2)'
                            },
                            '&::-webkit-scrollbar-thumb': {
                                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                                borderRadius: '12px',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                '&:hover': {
                                    background: 'linear-gradient(45deg, #764ba2, #f093fb)'
                                }
                            }
                        }}>
                            {description}
                        </Box>
                            <Box sx={{ mt: 2 }}>
                                <Box
                                    component="a"
                                    href={img}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        px: 3,
                                        py: 1.5,
                                        background: 'linear-gradient(45deg, #667eea, #764ba2)',
                                        color: 'white',
                                        textDecoration: 'none',
                                        borderRadius: '30px',
                                        fontSize: '0.9rem',
                                        fontWeight: 600,
                                        transition: 'all 0.4s ease',
                                        boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
                                        '&:hover': {
                                            background: 'linear-gradient(45deg, #764ba2, #f093fb)',
                                            transform: 'translateY(-3px)',
                                            boxShadow: '0 8px 25px rgba(240, 147, 251, 0.4)'
                                        }
                                    }}
                                >
                                    View Live Project →
                                </Box>
                            </Box>
                    </Stack>
            </Stack>
        </Stack>
        </>
    )
}