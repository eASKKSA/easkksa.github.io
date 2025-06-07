// src/tokens/design-tokens.ts
export const lightTheme = {
    colors: {
        primary: {
            50: '#fef2f2',
            100: '#fee2e2',
            200: '#fecaca',
            300: '#fca5a5',
            400: '#f87171',
            500: '#a4262c', // Your primary color
            600: '#8b1e23',
            700: '#741b1f',
            800: '#5d161a',
            900: '#4a0f12',
        },
        neutral: {
            50: '#fafafa',
            100: '#f5f5f5',
            200: '#e5e5e5',
            300: '#d4d4d4',
            400: '#a3a3a3',
            500: '#737373',
            600: '#525252',
            700: '#404040',
            800: '#222', // Your black tone
            900: '#171717',
        },
        background: {
            primary: '#ffffff',
            secondary: '#f8fafc',
            tertiary: '#f1f5f9',
            card: '#ffffff',
        },
        text: {
            primary: '#222', // Your black tone for text
            secondary: '#525252',
            tertiary: '#737373',
            inverse: '#ffffff',
        },
        border: {
            primary: '#e2e8f0',
            secondary: '#cbd5e1',
        }
    }
} as const;

export const darkTheme = {
    colors: {
        primary: {
            50: '#fef2f2',
            100: '#fee2e2',
            200: '#fecaca',
            300: '#fca5a5',
            400: '#f87171',
            500: '#dc2626', // Slightly brighter for dark mode visibility
            600: '#b91c1c',
            700: '#991b1b',
            800: '#7f1d1d',
            900: '#a4262c', // Your original color as darker variant
        },
        neutral: {
            50: '#222', // Your black tone as the darkest
            100: '#2a2a2a',
            200: '#363636',
            300: '#404040',
            400: '#525252',
            500: '#737373',
            600: '#a3a3a3',
            700: '#d4d4d4',
            800: '#e5e5e5',
            900: '#f5f5f5',
        },
        background: {
            primary: '#222', // Your black tone as primary background
            secondary: '#2a2a2a',
            tertiary: '#363636',
            card: '#2a2a2a',
        },
        text: {
            primary: '#f8fafc',
            secondary: '#cbd5e1',
            tertiary: '#94a3b8',
            inverse: '#222', // Your black tone
        },
        border: {
            primary: '#404040',
            secondary: '#525252',
        }
    }
} as const;

export const designTokens = {
    spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
        '2xl': '3rem',
        '3xl': '4rem',
    },
    typography: {
        fontFamily: {
            sans: ['Roboto', 'Inter', 'system-ui', 'sans-serif'],
            display: ['Oswald', 'Impact', 'Arial Black', 'sans-serif'],
        },
        fontSize: {
            xs: ['0.75rem', { lineHeight: '1rem' }],
            sm: ['0.875rem', { lineHeight: '1.25rem' }],
            base: ['1rem', { lineHeight: '1.5rem' }],
            lg: ['1.125rem', { lineHeight: '1.75rem' }],
            xl: ['1.25rem', { lineHeight: '1.75rem' }],
            '2xl': ['1.5rem', { lineHeight: '2rem' }],
            '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
            '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
            '5xl': ['3rem', { lineHeight: '1' }],
            '6xl': ['3.75rem', { lineHeight: '1' }],
        }
    },
    breakpoints: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
    },
    animation: {
        duration: {
            fast: '150ms',
            normal: '300ms',
            slow: '500ms',
        },
        easing: {
            ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
            easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
            easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
        }
    }
} as const;

export type Theme = typeof lightTheme | typeof darkTheme;
export type DesignTokens = typeof designTokens;
