// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
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
                'black-tone': '#222', // Your black tone
            },
            fontFamily: {
                sans: ['Roboto', 'Inter', 'system-ui', 'sans-serif'],
                display: ['Oswald', 'Impact', 'Arial Black', 'sans-serif'],
            },
            animation: {
                'fade-in-up': 'fadeInUp 0.8s ease-out',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            backdropBlur: {
                xs: '2px',
            }
        },
    },
    plugins: [],
}
