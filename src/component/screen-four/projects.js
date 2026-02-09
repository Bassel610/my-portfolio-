import { Box, Stack, Typography, useTheme, useMediaQuery } from "@mui/material";
import { useState } from 'react';
import ImageWithFallback from '../ui/ImageWithFallback';
import LoadingSpinner from '../ui/LoadingSpinner';

export default function Projects({ title, description, img, isIframe = false }) {
    const [iframeLoading, setIframeLoading] = useState(true);
    const [iframeError, setIframeError] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    // Mobile Layout
    if (isMobile) {
        return (
            <Box sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                width: '100%',
                maxWidth: '100vw',
                overflow: 'auto',
                py: 3,
                px: 2,
                boxSizing: 'border-box'
            }}>
                {/* Project Card */}
                <Box sx={{
                    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05))',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    maxWidth: '500px',
                    margin: '0 auto',
                    width: '100%'
                }}>
                    {/* Project Title */}
                    <Box sx={{
                        textAlign: 'center',
                        py: 2.5,
                        px: 2,
                        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.15), rgba(118, 75, 162, 0.15))',
                        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 700,
                                fontSize: { xs: '1.2rem', sm: '1.4rem' },
                                background: 'linear-gradient(45deg, #667eea, #764ba2, #f093fb)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                lineHeight: 1.3
                            }}
                        >
                            {title}
                        </Typography>
                    </Box>

                    {/* Project Preview */}
                    <Box sx={{ 
                        p: 2,
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        <Box sx={{ 
                            width: '100%',
                            height: '250px',
                            position: 'relative'
                        }}>
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
                                            <LoadingSpinner message="Loading..." size={40} />
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
                                            border: '2px solid rgba(102, 126, 234, 0.3)',
                                            borderRadius: '16px',
                                            color: '#667eea'
                                        }}>
                                            <Box sx={{ fontSize: '2.5rem', mb: 1 }}>🌐</Box>
                                            <Box sx={{ textAlign: 'center', px: 2, fontSize: '0.9rem' }}>
                                                <Box sx={{ fontWeight: 'bold', mb: 0.5 }}>Unable to load</Box>
                                                <Box sx={{ opacity: 0.7 }}>Project unavailable</Box>
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
                                                border: '2px solid rgba(102, 126, 234, 0.3)',
                                                borderRadius: '16px',
                                                boxShadow: '0 4px 20px rgba(102, 126, 234, 0.2)',
                                                opacity: iframeLoading ? 0 : 1,
                                                transition: 'opacity 0.3s ease',
                                                pointerEvents: 'none'
                                            }}
                                            title={title}
                                            loading="lazy"
                                        />
                                    )}
                                </Box>
                            ) : (
                                <Box
                                    component="img"
                                    src={img}
                                    alt={title}
                                    onError={(e) => {
                                        e.target.src = "/images/project-placeholder.png";
                                    }}
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        borderRadius: '16px',
                                        border: '2px solid rgba(102, 126, 234, 0.3)',
                                        boxShadow: '0 4px 20px rgba(102, 126, 234, 0.2)'
                                    }}
                                />
                            )}
                        </Box>
                    </Box>

                    {/* Project Description */}
                    <Box sx={{ 
                        p: 2.5,
                        pt: 1.5
                    }}>
                        <Typography
                            sx={{
                                fontSize: '0.9rem',
                                lineHeight: 1.6,
                                color: 'rgba(255, 255, 255, 0.85)',
                                textAlign: 'left',
                                mb: 2.5,
                                maxHeight: '120px',
                                overflow: 'auto',
                                '&::-webkit-scrollbar': {
                                    width: '4px'
                                },
                                '&::-webkit-scrollbar-track': {
                                    background: 'rgba(102, 126, 234, 0.1)',
                                    borderRadius: '4px'
                                },
                                '&::-webkit-scrollbar-thumb': {
                                    background: 'rgba(102, 126, 234, 0.3)',
                                    borderRadius: '4px'
                                }
                            }}
                        >
                            {description}
                        </Typography>

                        {/* View Project Button */}
                        <Box sx={{ 
                            display: 'flex',
                            justifyContent: 'center'
                        }}>
                            <Box
                                component="a"
                                href={isIframe ? img : img}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                sx={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '100%',
                                    maxWidth: '250px',
                                    px: 3,
                                    py: 1.3,
                                    background: 'linear-gradient(45deg, #667eea, #764ba2)',
                                    color: 'white',
                                    textDecoration: 'none',
                                    borderRadius: '30px',
                                    fontSize: '0.95rem',
                                    fontWeight: 600,
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                                    touchAction: 'manipulation',
                                    '&:active': {
                                        transform: 'scale(0.98)',
                                        boxShadow: '0 2px 10px rgba(102, 126, 234, 0.3)'
                                    }
                                }}
                            >
                                View Live Project →
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        );
    }

    // Desktop Layout (unchanged)
    return (
        <>
        <Box>
            {/* Desktop only - no mobile title here anymore */}
        </Box>
        <Stack
            display={{ xs: 'none', md: 'flex' }}
            justifyContent="center"
            alignItems="center"
            minHeight='100vh'
            flexDirection='row'
            height='475px'
            sx={{ py: 0 }}
        >
            <Stack
            flexDirection='row'
            justifyContent='space-between'
                spacing={2}
                sx={{
                    maxWidth: 1200,
                    p: 2,
                    textAlign: 'center',
                    width: '100%'
                }}
            >
                <Stack
                    width='55%'
                    sx={{
                        height: '400px',
                        position: 'relative',
                        order: 1
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