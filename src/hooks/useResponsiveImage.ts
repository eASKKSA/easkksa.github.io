// src/hooks/useResponsiveImage.ts
import { useState, useEffect } from 'react';

interface UseResponsiveImageConfig {
    desktop: string;
    mobile: string;
    tablet?: string;
    breakpoint?: number;
}

export const useResponsiveImage = (config: UseResponsiveImageConfig) => {
    const { desktop, mobile, tablet, breakpoint = 1024 } = config;

    const [currentImage, setCurrentImage] = useState(() => {
        if (typeof window === 'undefined') return desktop;

        const width = window.innerWidth;
        if (width >= breakpoint) return desktop;
        if (tablet && width >= 768) return tablet;
        return mobile;
    });

    useEffect(() => {
        const mediaQueries = [
            window.matchMedia(`(min-width: ${breakpoint}px)`),
            ...(tablet ? [window.matchMedia('(min-width: 768px)')] : [])
        ];

        const updateImage = () => {
            const width = window.innerWidth;
            if (width >= breakpoint) {
                setCurrentImage(desktop);
            } else if (tablet && width >= 768) {
                setCurrentImage(tablet);
            } else {
                setCurrentImage(mobile);
            }
        };

        mediaQueries.forEach(mq => mq.addEventListener('change', updateImage));
        return () => mediaQueries.forEach(mq => mq.removeEventListener('change', updateImage));
    }, [desktop, mobile, tablet, breakpoint]);

    return currentImage;
};