import * as React from "react"
import { useState, useEffect } from 'react';

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}

/**
 * Custom hook for responsive design
 * @param query Media query string like '(max-width: 768px)'
 * @returns Boolean indicating if the media query matches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    
    // Update the state with the current match
    const updateMatch = () => {
      setMatches(media.matches);
    };
    
    // Set initial value
    updateMatch();
    
    // Add listener for changes
    media.addEventListener('change', updateMatch);
    
    // Clean up
    return () => {
      media.removeEventListener('change', updateMatch);
    };
  }, [query]);

  return matches;
}
