import { useState, useEffect } from 'react';

/**
 * Custom hook to safely detect browser environment
 * This helps avoid hydration errors by ensuring browser checks only run on client
 * 
 * @returns {boolean} - True if running in a browser environment, false during SSR
 */
export const useBrowser = (): boolean => {
    const [isBrowser, setIsBrowser] = useState(false);

    useEffect(() => {
        // Using setTimeout to ensure this runs after initial hydration
        const timer = setTimeout(() => {
            setIsBrowser(true);
        }, 0);

        return () => clearTimeout(timer);
    }, []);

    return isBrowser;
};

/**
 * Safely detect if window object is available
 * For use in conditional code outside of React components
 */
export const isBrowser = (): boolean => {
    return typeof window !== 'undefined';
};