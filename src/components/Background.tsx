// src/components/Background.tsx
import React, { useState } from 'react';
import { useAppStore } from '@/store/appStore';

// Fix: Import images directly or use public folder
import desktopBg from '@/assets/askksa-background-tiger.svg';
import whiteDesktopBg from '@/assets/askksa-background-tiger-white.svg';
import mobileBg from '@/assets/askksa-background-tiger-mobile.svg';

const backgroundImages = {
    desktop: desktopBg,
    tablet: desktopBg,
    mobile: mobileBg,
    whiteDesktop: whiteDesktopBg
};

const Background: React.FC = () => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);
    const reducedMotion = useAppStore(state => state.reducedMotion);
    const { theme } = useAppStore();

    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    const imageSrc = theme === 'light'
        ? backgroundImages.whiteDesktop
        : backgroundImages.desktop;



    return (
        <div className="fixed inset-0 -z-20">
            {/* Theme-aware gradient background */}
            <div className={`absolute inset-0 dark:bg-gradient-to-br dark:from-[#222] dark:via-[#2a2a2a] dark:to-[#a4262c]/20 bg-gradient-to-br from-gray-50 via-gray-100 to-[#a4262c]/10`} />

            {/* Tiger image overlay */}
            {!imageError && (
                <img
                    src={imageSrc}
                    alt="Tiger artwork representing martial arts strength"
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
                        imageLoaded ? 'opacity-100' : 'opacity-0'
                    } opacity-80`}
                    onLoad={() => setImageLoaded(true)}
                    onError={() => setImageError(true)}
                />
            )}

            {/* Theme-aware overlay for text readability */}
            <div className={`absolute inset-0 dark:bg-gradient-to-b dark:from-black/40 dark:via-transparent dark:to-black/60 bg-gradient-to-b from-white/20 via-transparent to-black/40`} />

            {/* Subtle animation effect (respects reduced motion and theme) */}
            {!reducedMotion && (
                <div className={`absolute inset-0 animate-pulse opacity-10 dark:bg-gradient-to-r dark:from-transparent dark:via-white/10 dark:to-transparent bg-gradient-to-r from-transparent via-black/10 to-transparent`} />
            )}
        </div>
    );
};

export default Background;
