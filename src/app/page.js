'use client'
import First_screen from "../component/screen-one";
import Screen_tow from "@/component/screen-two";
import Screen_three from "@/component/screen-three";
import Screen_four from "@/component/screen-four";
import VantaBackground from "../component/Vanta/Vanta";
import ScrollProgress from "../component/animations/ScrollProgress";
import FloatingElements from "../component/animations/FloatingElements";
import GlassmorphismNav from "../component/ui/GlassmorphismNav";
import CursorFollower from "../component/ui/CursorFollower";
import ErrorBoundary from "../component/ui/ErrorBoundary";
import LoadingSpinner from "../component/ui/LoadingSpinner";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/component/Share/footer";
import MobileNavigation from "@/component/ui/MobileNavigation";
import { useScrollSpy } from "@/component/hooks/useScrollSpy";
import { useScrollBoundary } from "@/component/hooks/useScrollBoundary";

export default function Home() {
  const [activePage, setActivePage] = useState("page-one");
  const [transition, setTransition] = useState({
    direction: null,
    currentPage: "page-one",
    nextPage: null
  });
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const wheelRef = useRef(null);
  const sectionContentRef = useRef(null);
  const isProcessing = useRef(false);

  // Initialize scroll boundary detection (only active in desktop mode)
  const { 
    canScrollDown, 
    canScrollUp, 
    hasOverflow, 
    isAtTop, 
    isAtBottom 
  } = useScrollBoundary(sectionContentRef, !isMobile && !isAppLoading);

  // Check if mobile device with debouncing
  useEffect(() => {
    let debounceTimer;
    
    const checkMobile = () => {
      // Clear existing timer
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
      
      // Debounce resize events (200ms)
      debounceTimer = setTimeout(() => {
        setIsMobile(window.innerWidth < 768);
      }, 200);
    };

    // Initial check (no debounce)
    setIsMobile(window.innerWidth < 768);
    
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, []);

  // Simulate app initialization
  useEffect(() => {
    const initTimer = setTimeout(() => {
      setIsAppLoading(false);
    }, 800); // Show loading for 0.8 seconds - faster startup

    return () => clearTimeout(initTimer);
  }, []);

  // Define page order and components
  const pages = {
    "page-one": First_screen,
    "page-two": Screen_tow,
    "page-three": Screen_three,
    "page-four": Screen_four
  };
  const pageKeys = Object.keys(pages);

  useEffect(() => {
    // Don't attach wheel listener if app is still loading or on mobile
    if (isAppLoading || isMobile) return;

    const handleWheel = (e) => {
      e.preventDefault();

      // Improved scroll sensitivity - ignore very small movements and very large ones
      if (isProcessing.current || Math.abs(e.deltaY) < 10 || Math.abs(e.deltaY) > 100) {
        return;
      }
      
      const direction = e.deltaY > 0 ? 'down' : 'up';

      // NEW: Check scroll boundaries before triggering transitions
      if (hasOverflow && sectionContentRef.current) {
        if (direction === 'down' && canScrollDown) {
          // Scroll content down instead of transitioning
          sectionContentRef.current.scrollTop += e.deltaY;
          return;
        }
        if (direction === 'up' && canScrollUp) {
          // Scroll content up instead of transitioning
          sectionContentRef.current.scrollTop += e.deltaY;
          return;
        }
      }

      // Only trigger transitions at boundaries or when no overflow
      const currentIndex = pageKeys.indexOf(transition.currentPage);

      // Determine next page index
      let nextIndex = currentIndex;
      if (direction === 'down' && currentIndex < pageKeys.length - 1) {
        nextIndex = currentIndex + 1;
      } else if (direction === 'up' && currentIndex > 0) {
        nextIndex = currentIndex - 1;
      }
      
      // If no change needed, return early
      if (nextIndex === currentIndex) {
        return;
      }
      
      // Set processing flag and start transition
      isProcessing.current = true;
      const newPage = pageKeys[nextIndex];
      
      setTransition({
        direction,
        currentPage: transition.currentPage,
        nextPage: newPage
      });
    };
    
    const currentRef = wheelRef.current;
    if (!currentRef) return;
    
    currentRef.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('wheel', handleWheel);
      }
    };
  }, [transition, isAppLoading, isMobile, hasOverflow, canScrollDown, canScrollUp]);

  // Handle transition end with improved timing
  useEffect(() => {
    if (transition.nextPage) {
      const timer = setTimeout(() => {
        setTransition(prev => ({
          direction: null,
          currentPage: prev.nextPage,
          nextPage: null
        }));
        
        // Add a small delay before allowing next transition
        setTimeout(() => {
          isProcessing.current = false;
        }, 200); // Additional debounce period
        
      }, 800); // Reduced from 1000ms for faster transitions
      
      return () => clearTimeout(timer);
    }
  }, [transition]);

  // Enhanced creative transforms
  const getTransform = (pageType) => {
    if (!transition.direction) return {
      transform: 'translateY(0) scale(1) rotateX(0deg)',
      opacity: 1,
      filter: 'blur(0px)'
    };
    
    if (pageType === 'current') {
      return {
        transform: transition.direction === 'down' 
          ? 'translateY(120%) scale(0.8) rotateX(-15deg)' 
          : 'translateY(-120%) scale(0.8) rotateX(15deg)',
        opacity: 0.3,
        filter: 'blur(8px)'
      };
    } else {
      return {
        transform: transition.direction === 'down'
          ? 'translateY(-120%) scale(0.9) rotateX(15deg)'
          : 'translateY(120%) scale(0.9) rotateX(-15deg)',
        opacity: 0.7,
        filter: 'blur(4px)'
      };
    }
  };

  const CurrentComponent = pages[transition.currentPage];
  const NextComponent = transition.nextPage ? pages[transition.nextPage] : null;

  // Show loading screen during app initialization
  if (isAppLoading) {
    return <LoadingSpinner fullScreen={true} message="Loading Portfolio" />;
  }

  // Mobile layout - stack screens vertically
  if (isMobile) {
    return (
      <ErrorBoundary>
        <div style={{
          width: '100vw',
          minHeight: '100vh',
          overflow: 'auto',
          margin: 0,
          padding: 0
        }}>
          <ScrollProgress currentPage={transition.currentPage} totalPages={4} />
          <GlassmorphismNav currentPage={transition.currentPage} totalPages={4} />
          <CursorFollower />
          <VantaBackground />
          <FloatingElements count={8} />

          {/* Stack all screens vertically on mobile */}
          <div style={{ position: 'relative' }}>
            <First_screen />
            <Screen_tow />
            <Screen_three />
            <Screen_four />
            <Footer />
          </div>
        </div>
      </ErrorBoundary>
    );
  }

  // Desktop layout - wheel navigation
  return (
    <ErrorBoundary>
      <div
      ref={wheelRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        margin: 0,
        padding: 0,
        touchAction: 'none'
      }}
    >
      <ScrollProgress currentPage={transition.currentPage} totalPages={4} />
      <GlassmorphismNav currentPage={transition.currentPage} totalPages={4} />
      <CursorFollower />
      <VantaBackground />
      <FloatingElements count={15} />
      
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}>
        {/* Current component with enhanced 3D transitions */}
        <div 
          ref={sectionContentRef}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            overflow: 'auto',
            ...getTransform(transition.nextPage ? 'current' : 'none'),
            transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
            transformStyle: 'preserve-3d',
            perspective: '1000px',
            zIndex: 2
          }}
        >
          <div style={{
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            width: '100%',
            minHeight: '100%'
          }}>
            <CurrentComponent />
          </div>
        </div>
        <Footer />
        
        {/* Next component with enhanced entrance animation */}
        {transition.nextPage && (
          <div 
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              ...getTransform('next'),
              transition: 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
              transformStyle: 'preserve-3d',
              perspective: '1000px',
              zIndex: 1
            }}
          >
            <div style={{
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
              width: '100%',
              height: '100%'
            }}>
              <NextComponent />
            </div>
          </div>
        )}
      </div>
    </div>
    </ErrorBoundary>
  );
}