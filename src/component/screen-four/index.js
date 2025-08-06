import { Box } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import Aside from "./aside";
import Projects from "./projects";

export default function ScreenFour() {
  const [transition, setTransition] = useState({
    direction: null,
    currentProject: "project-one",
    nextProject: null
  });
  
  const wheelRef = useRef(null);
  const isProcessing = useRef(false);

  // Project data with props for each project
  const projects = {
        "project-one": {
      component: Projects,
      props: {
        title: "TwinDeix Assessment Platform ⭐",
        description: "An advanced multi-role dashboard system supporting three user types: Users, HR, and Admins. Features sophisticated assessment algorithms, automated PDF report generation, payment processing, package management, user enrollment systems, and comprehensive analytics. The platform generates dynamic reports based on complex front-end algorithms and stores all data securely with download capabilities for each account.",
        img: "/images/twindeix-project.png",
        isIframe: false
      }
    },
        "project-two": {
      component: Projects,
      props: {
        title: "Pico - Fresh Organic Produce Delivery Platform",
        description: "A modern e-commerce React application for fresh organic produce delivery, built with React 19, Vite 6, and Material-UI 6. Features comprehensive shopping cart functionality, real-time search with advanced filtering, user authentication, and mobile-responsive design. Implemented performance optimizations including code splitting, lazy loading, and intelligent API caching achieving 90+ Lighthouse scores.",
        img: "https://picco.netlify.app",
        isIframe: true
      }
    },
    "project-three": {
      component: Projects,
      props: {
        title: "Interior Design Portfolio",
        description: "An elegant designer portfolio showcasing home interior projects through an immersive gallery experience. Features dynamic color adaptation based on selected images, smooth slider navigation, and an innovative spider bar interface. The gallery intelligently adjusts its color palette to complement each displayed project.",
        img: "https://musical-concha-fdffd5.netlify.app",
        isIframe: true
      }
    },
    "project-four": {
      component: Projects,
      props: {
        title: "Artisan Donuts Landing",
        description: "A clean and engaging single-page website designed for a specialty donut business. Features modern design principles with smooth animations and compelling call-to-action elements to drive customer engagement and conversions.",
        img: "https://astounding-sherbet-ade296.netlify.app",
        isIframe: true
      }
    },
    "project-five": {
      component: Projects,
      props: {
        title: "Bershka Fashion Store",
        description: "A complete e-commerce solution for fashion retail featuring secure payment integration, comprehensive product catalog, detailed product pages, user authentication system, shopping cart functionality, and order management. Built with modern web technologies to deliver a seamless shopping experience.",
        img: "https://peppy-liger-e79913.netlify.app",
        isIframe: true
      }
    },
    "project-six": {
      component: Projects,
      props: {
        title: "Data Nile Research Platform",
        description: "A comprehensive research website featuring a powerful admin dashboard with complete content control. The platform includes dynamic text and image management, customizable color schemes and typography, flexible contact form builder, and a dedicated panel for managing contact requests. Built with Firebase integration for real-time content updates.",
        img: "https://lambent-choux-e63b31.netlify.app",
        isIframe: true
      }
    }
  };

  const projectKeys = Object.keys(projects);

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      
      // Ignore small wheel movements and rapid scrolling
      if (isProcessing.current || Math.abs(e.deltaY) < 5 || e.deltaY > 50) return;
      
      const direction = e.deltaY > 0 ? 'down' : 'up';
      const currentIndex = projectKeys.indexOf(transition.currentProject);

      // Prevent scrolling past first/last project
      if ((direction === 'down' && currentIndex === projectKeys.length - 1) ||
          (direction === 'up' && currentIndex === 0)) {
        return;
      }
      
      isProcessing.current = true;
      
      let nextProject;
      if (direction === 'down') {
        nextProject = projectKeys[currentIndex + 1];
      } else {
        nextProject = projectKeys[currentIndex - 1];
      }
      
      setTransition({
        direction,
        currentProject: transition.currentProject,
        nextProject
      });
    };
    
    const currentRef = wheelRef.current;
    if (currentRef) {
      currentRef.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('wheel', handleWheel);
      }
    };
  }, [transition, projectKeys]);

  // Handle transition completion
  useEffect(() => {
    if (transition.nextProject) {
      const timer = setTimeout(() => {
        setTransition(prev => ({
          ...prev,
          currentProject: prev.nextProject,
          nextProject: null,
          direction: null
        }));
        isProcessing.current = false;
      }, 800); // Matches CSS transition duration

      return () => clearTimeout(timer);
    }
  }, [transition]);

  // Animation styles based on scroll direction
  const getProjectStyles = (type) => {
    if (!transition.direction) {
      return {
        transform: 'translateY(0) scale(1)',
        opacity: 1,
        transition: 'all 0.8s ease',
        filter: 'blur(0)'
      };
    }

    if (type === 'current') {
      return {
        transform: transition.direction === 'down' 
          ? 'translateY(-100%) scale(0.9)' 
          : 'translateY(100%) scale(0.9)',
        opacity: 0,
        transition: 'all 0.8s ease',
        filter: 'blur(4px)'
      };
    } else {
      return {
        transform: transition.direction === 'down'
          ? 'translateY(-100%) scale(0.9)'
          : 'translateY(100%) scale(0.9)',
        opacity: 0,
        transition: 'all 0.8s ease',
        filter: 'blur(4px)'
      };
    }
  };

  const CurrentProject = projects[transition.currentProject].component;
  const currentProps = projects[transition.currentProject].props;
  
  const NextProject = transition.nextProject 
    ? projects[transition.nextProject].component 
    : null;
  const nextProps = transition.nextProject 
    ? projects[transition.nextProject].props 
    : null;

  return (
    <Box
      id="screen-four"
      ref={wheelRef}
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        height: { xs: 'auto', md: '100vh' },
        minHeight: { xs: '100vh', md: 'auto' },
        overflow: 'hidden'
      }}
    >
      {/* Hide sidebar on mobile, show on desktop */}
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <Aside activeProject={transition.currentProject} />
      </Box>

      <Box sx={{
        flex: 1,
        position: 'relative',
        overflow: 'hidden',
        marginLeft: { xs: 0, md: '250px' },
        height: { xs: 'auto', md: '100vh' },
        minHeight: { xs: '100vh', md: 'auto' }
      }}>
        {/* Current Project */}
        <Box sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          ...getProjectStyles('current')
        }}>
          <CurrentProject {...currentProps} />
        </Box>

        {/* Next Project (during transition) */}
        {NextProject && (
          <Box sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            ...getProjectStyles('next')
          }}>
            <NextProject {...nextProps} />
          </Box>
        )}
      </Box>
    </Box>
  );
}