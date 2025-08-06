import { Box, Typography } from '@mui/material';

export default function Aside({ activeProject }) {
  const projects = [
    {
      id: "project-one",
      title: "TwinDeix Platform",
      type: "Assessment System",
      tech: "Enterprise • AI"
    },
    {
      id: "project-two",
      title: "PICO Platform",
      type: "E-commerce",
      tech: "React • Dynamic UI"
    },
    {
      id: "project-three",
      title: "Interior Design",
      type: "Portfolio Gallery",
      tech: "React • Dynamic UI"
    },
    {
      id: "project-four",
      title: "Artisan Donuts",
      type: "Landing Page",
      tech: "Modern Design"
    },
    {
      id: "project-five",
      title: "Bershka Store",
      type: "E-commerce",
      tech: "Full Stack"
    },
    {
      id: "project-sox",
      title: "Data Nile Research",
      type: "Dashboard Platform",
      tech: "React • Firebase"
    },
  ];

  return (
    <Box sx={{
      width: { xs: '100%', md: 250 },
      p: { xs: 1, md: 2 },
      borderRight: { xs: 'none', md: '3px solid' },
      borderBottom: { xs: '3px solid', md: 'none' },
      borderColor: '#667eea',
      height: { xs: 'auto', md: '100vh' },
      maxHeight: { xs: '200px', md: '100vh' },
      position: { xs: 'relative', md: 'fixed' },
      left: { xs: 'auto', md: 0 },
      top: { xs: 'auto', md: 0 },
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      color: 'white',
      overflowY: 'auto',
      '&::-webkit-scrollbar': {
        width: '8px'
      },
      '&::-webkit-scrollbar-track': {
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '10px'
      },
      '&::-webkit-scrollbar-thumb': {
        background: 'linear-gradient(45deg, #f093fb, #f5576c)',
        borderRadius: '10px',
        border: '1px solid rgba(255,255,255,0.2)',
        '&:hover': {
          background: 'linear-gradient(45deg, #f5576c, #4facfe)'
        }
      }
    }}>
      <Typography variant="h5" sx={{
        mb: { xs: 2, md: 3 },
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
        borderBottom: '2px solid rgba(255,255,255,0.2)',
        pb: { xs: 1, md: 2 },
        fontSize: { xs: '1.2rem', md: '1.5rem' }
      }}>
        My Projects
      </Typography>
      
      {projects.map((project, index) => (
        <Box 
          key={project.id} 
          sx={{ 
            mb: 2,
            p: 2,
            borderRadius: '12px',
            backgroundColor: activeProject === project.id 
              ? 'rgba(255,255,255,0.2)' 
              : 'rgba(255,255,255,0.05)',
            border: activeProject === project.id 
              ? '2px solid rgba(255,255,255,0.4)' 
              : '1px solid rgba(255,255,255,0.1)',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.15)',
              transform: 'translateX(5px)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
            }
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Box sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: activeProject === project.id ? '#fff' : 'rgba(255,255,255,0.6)',
              mr: 1
            }} />
            <Typography variant="caption" sx={{ 
              color: 'rgba(255,255,255,0.8)',
              fontSize: '0.7rem',
              fontWeight: 600
            }}>
              {String(index + 1).padStart(2, '0')}
            </Typography>
          </Box>
          
          <Typography variant="subtitle2" sx={{ 
            fontWeight: 'bold',
            color: 'white',
            fontSize: '0.9rem',
            mb: 0.5,
            lineHeight: 1.2
          }}>
            {project.title}
          </Typography>
          
          <Typography variant="caption" display="block" sx={{
            color: 'rgba(255,255,255,0.8)',
            fontSize: '0.75rem',
            mb: 0.5
          }}>
            {project.type}
          </Typography>
          
          <Typography variant="caption" display="block" sx={{
            color: 'rgba(255,255,255,0.6)',
            fontSize: '0.7rem',
            fontStyle: 'italic'
          }}>
            {project.tech}
          </Typography>
        </Box>
      ))}
      
      <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid rgba(255,255,255,0.2)' }}>
        <Typography variant="caption" sx={{ 
          color: 'rgba(255,255,255,0.6)',
          fontSize: '0.7rem',
          textAlign: 'center',
          display: 'block'
        }}>
          Scroll to navigate projects
        </Typography>
      </Box>
    </Box>
  );
}