// src/components/OptimizedImage.tsx
import React, { useState } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface OptimizedImageProps {
    src: string;
    alt: string;
    className?: string;
    priority?: boolean;
    sizes?: string;
    quality?: number;
    placeholder?: 'blur' | 'empty';
    blurDataURL?: string;
    onLoad?: () => void;
    onError?: () => void;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
                                                                  src,
                                                                  alt,
                                                                  className = '',
                                                                  priority = false,
                                                                  sizes = '100vw',
                                                                  quality = 85,
                                                                  placeholder = 'empty',
                                                                  blurDataURL,
                                                                  onLoad,
                                                                  onError,
                                                              }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const { ref, hasIntersected } = useIntersectionObserver({
        triggerOnce: true,
        threshold: 0.1,
    });

    const shouldLoad = priority || hasIntersected;

    const handleLoad = () => {
        setIsLoaded(true);
        onLoad?.();
    };

    const handleError = () => {
        setHasError(true);
        onError?.();
    };

    const getOptimizedSrc = (originalSrc: string, width?: number) => {
        // In a real implementation, you'd integrate with a service like Cloudinary or Vercel
        const params = new URLSearchParams();
        if (width) params.append('w', width.toString());
        params.append('q', quality.toString());
        return `${originalSrc}?${params.toString()}`;
    };

    const generateSrcSet = (originalSrc: string) => {
        const widths = [640, 768, 1024, 1280, 1536];
        return widths
            .map(width => `${getOptimizedSrc(originalSrc, width)} ${width}w`)
            .join(', ');
    };

    if (hasError) {
        return (
            <div className={`bg-neutral-200 flex items-center justify-center ${className}`}>
                <span className="text-neutral-500 text-sm">Failed to load image</span>
            </div>
        );
    }

    return (
        <div ref={ref} className={`relative overflow-hidden ${className}`}>
            {placeholder === 'blur' && blurDataURL && !isLoaded && (
                <img
                    src={blurDataURL}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover filter blur-sm scale-110"
                    aria-hidden="true"
                />
            )}

            {shouldLoad && (
                <img
                    src={getOptimizedSrc(src)}
                    srcSet={generateSrcSet(src)}
                    sizes={sizes}
                    alt={alt}
                    className={`w-full h-full object-cover transition-opacity duration-300 ${
                        isLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    loading={priority ? 'eager' : 'lazy'}
                    decoding="async"
                    onLoad={handleLoad}
                    onError={handleError}
                />
            )}
        </div>
    );
};
