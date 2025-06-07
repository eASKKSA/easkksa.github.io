// src/store/appStore.ts
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type ThemeMode = 'light' | 'dark' | 'system';

interface AppState {
    theme: ThemeMode;
    language: 'pt' | 'en';
    reducedMotion: boolean;
    isMenuOpen: boolean;
    isLoading: boolean;
    effectiveTheme: 'light' | 'dark';
    userPreferences: {
        emailNotifications: boolean;
        marketingEmails: boolean;
    };

    setTheme: (theme: ThemeMode) => void;
    setLanguage: (language: 'pt' | 'en') => void;
    setReducedMotion: (reduced: boolean) => void;
    toggleMenu: () => void;
    setLoading: (loading: boolean) => void;
    updateUserPreferences: (preferences: Partial<AppState['userPreferences']>) => void;
    initializeTheme: () => void;
}

const getSystemTheme = (): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};


const applyThemeToDOM = (theme: ThemeMode) => {
    const root = document.documentElement;

    if (theme === 'dark') {
        root.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else if (theme === 'light') {
        root.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    } else {
        // System theme
        const systemTheme = getSystemTheme();
        root.setAttribute('data-theme', systemTheme);
        localStorage.removeItem('theme');
    }
};


export const useAppStore = create<AppState>()(
    devtools(
        persist(
            (set, get) => ({
                // Initial state
                theme: 'system',
                language: 'pt',
                reducedMotion: false,
                isMenuOpen: false,
                isLoading: false,
                effectiveTheme: 'dark',
                userPreferences: {
                    emailNotifications: true,
                    marketingEmails: false,
                },

                // Actions
                setTheme: (theme) => {
                    applyThemeToDOM(theme);
                    const effectiveTheme = theme === 'system' ? getSystemTheme() : theme;
                    set({ theme, effectiveTheme });
                },

                setLanguage: (language) => set({ language }),
                setReducedMotion: (reducedMotion) => set({ reducedMotion }),
                toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
                setLoading: (isLoading) => set({ isLoading }),
                updateUserPreferences: (preferences) =>
                    set((state) => ({
                        userPreferences: { ...state.userPreferences, ...preferences },
                    })),

                initializeTheme: () => {
                    const { theme } = get();

                    // Apply the current theme
                    applyThemeToDOM(theme);

                    const effectiveTheme = theme === 'system' ? getSystemTheme() : theme;
                    set({ effectiveTheme });

                    // Listen for system theme changes
                    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
                    const handleSystemThemeChange = () => {
                        const currentTheme = get().theme;
                        if (currentTheme === 'system') {
                            const newSystemTheme = getSystemTheme();
                            document.documentElement.setAttribute('data-theme', newSystemTheme);
                            set({ effectiveTheme: newSystemTheme });
                        }
                    };

                    mediaQuery.addEventListener('change', handleSystemThemeChange);

                    // Return cleanup function
                    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
                },
            }),
            {
                name: 'askksa-store',
                partialize: (state) => ({
                    theme: state.theme,
                    language: state.language,
                    reducedMotion: state.reducedMotion,
                    userPreferences: state.userPreferences,
                }),
            }
        )
    )
);
