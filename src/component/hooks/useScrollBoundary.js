import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Custom hook for detecting scroll boundaries in a container
 * Manages scroll state and determines when content can scroll vs when to trigger transitions
 * 
 * @param {RefObject} containerRef - Reference to the scrollable container element
 * @param {boolean} isActive - Whether the hook should be active (typically desktop mode only)
 * @returns {Object} Scroll state including boundaries, overflow status, and scroll handler
 */
export function useScrollBoundary(containerRef, isActive = true) {
  const [scrollState, setScrollState] = useState({
    canScrollDown: false,
    canScrollUp: false,
    hasOverflow: false,
    scrollPosition: 0,
    isAtTop: true,
    isAtBottom: false
  });

  const debounceTimerRef = useRef(null);
  const resizeObserverRef = useRef(null);

  // Tolerance for floating-point precision errors in scroll calculations
  const SCROLL_THRESHOLD = 1;

  /**
   * Calculate scroll boundaries and overflow state
   */
  const calculateScrollState = useCallback(() => {
    if (!containerRef.current || !isActive) {
      return {
        canScrollDown: false,
        canScrollUp: false,
        hasOverflow: false,
        scrollPosition: 0,
        isAtTop: true,
        isAtBottom: false
      };
    }

    try {
      const container = containerRef.current;
      const scrollTop = container.scrollTop || 0;
      const scrollHeight = container.scrollHeight || 0;
      const clientHeight = container.clientHeight || 0;

      // Handle NaN or undefined values
      if (isNaN(scrollTop) || isNaN(scrollHeight) || isNaN(clientHeight)) {
        console.warn('[useScrollBoundary] Invalid scroll measurements detected');
        return {
          canScrollDown: false,
          canScrollUp: false,
          hasOverflow: false,
          scrollPosition: 0,
          isAtTop: true,
          isAtBottom: false
        };
      }

      // Check if content overflows viewport (with tolerance)
      const hasOverflow = scrollHeight > clientHeight + SCROLL_THRESHOLD;

      // Calculate scroll boundaries with floating-point tolerance
      const isAtTop = scrollTop <= SCROLL_THRESHOLD;
      const isAtBottom = scrollTop >= (scrollHeight - clientHeight - SCROLL_THRESHOLD);

      // Can scroll if there's overflow and not at the respective boundary
      const canScrollDown = hasOverflow && !isAtBottom;
      const canScrollUp = hasOverflow && !isAtTop;

      return {
        canScrollDown,
        canScrollUp,
        hasOverflow,
        scrollPosition: scrollTop,
        isAtTop,
        isAtBottom
      };
    } catch (error) {
      console.error('[useScrollBoundary] Error calculating scroll state:', error);
      return {
        canScrollDown: false,
        canScrollUp: false,
        hasOverflow: false,
        scrollPosition: 0,
        isAtTop: true,
        isAtBottom: false
      };
    }
  }, [containerRef, isActive]);

  /**
   * Debounced scroll event handler
   */
  const handleScroll = useCallback(() => {
    if (!isActive) return;

    // Clear existing debounce timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Debounce scroll events (50ms)
    debounceTimerRef.current = setTimeout(() => {
      const newState = calculateScrollState();
      setScrollState(newState);
    }, 50);
  }, [calculateScrollState, isActive]);

  /**
   * Setup ResizeObserver to detect content/viewport size changes
   */
  useEffect(() => {
    if (!containerRef.current || !isActive) {
      // Reset state when inactive
      setScrollState({
        canScrollDown: false,
        canScrollUp: false,
        hasOverflow: false,
        scrollPosition: 0,
        isAtTop: true,
        isAtBottom: false
      });
      return;
    }

    const container = containerRef.current;

    // Initial calculation
    const initialState = calculateScrollState();
    setScrollState(initialState);

    // Setup ResizeObserver with error handling
    try {
      resizeObserverRef.current = new ResizeObserver(() => {
        const newState = calculateScrollState();
        setScrollState(newState);
      });

      resizeObserverRef.current.observe(container);
    } catch (error) {
      console.warn('[useScrollBoundary] ResizeObserver failed, falling back to window resize:', error);
      
      // Fallback to window resize events
      const handleResize = () => {
        const newState = calculateScrollState();
        setScrollState(newState);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }

    // Cleanup
    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
        resizeObserverRef.current = null;
      }
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [containerRef, isActive, calculateScrollState]);

  /**
   * Attach scroll event listener
   */
  useEffect(() => {
    if (!containerRef.current || !isActive) return;

    const container = containerRef.current;
    container.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [containerRef, isActive, handleScroll]);

  return {
    ...scrollState,
    handleScroll
  };
}
