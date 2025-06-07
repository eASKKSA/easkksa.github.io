// src/components/Navbar.tsx
import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store/appStore';
import { ThemeToggle } from './ThemeToggle';

type Locale = 'pt' | 'en';

// Route map for all navigation items
const routeMap = {
    news: {
        pt: '/pt/noticias',
        en: '/en/news'
    },
    about: {
        pt: '/pt/quem-somos',
        en: '/en/about'
    },
    dojo: {
        pt: '/pt/dojo',
        en: '/en/dojo'
    },
    history: {
        pt: '/pt/historia',
        en: '/en/history'
    },
    philosophy: {
        pt: '/pt/filosofia',
        en: '/en/philosophy'
    },
    shotokan: {
        pt: '/pt/shotokan-ski',
        en: '/en/shotokan-ski'
    }
};

interface NavigationItem {
    id: string;
    label: Record<Locale, string>;
    routeKey: keyof typeof routeMap;
}

const navigationItems: NavigationItem[] = [
    {
        id: 'news',
        label: { pt: 'Notícias', en: 'News' },
        routeKey: 'news'
    },
    {
        id: 'about',
        label: { pt: 'Quem Somos', en: 'About' },
        routeKey: 'about'
    },
    {
        id: 'dojo',
        label: { pt: 'No Dojo', en: 'Dojo' },
        routeKey: 'dojo'
    },
    {
        id: 'history',
        label: { pt: 'História', en: 'History' },
        routeKey: 'history'
    },
    {
        id: 'philosophy',
        label: { pt: 'Filosofia', en: 'Philosophy' },
        routeKey: 'philosophy'
    },
    {
        id: 'shotokan',
        label: { pt: 'Shotokan SKI', en: 'Shotokan SKI' },
        routeKey: 'shotokan'
    }
];

export const Navbar: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { isMenuOpen, toggleMenu } = useAppStore();
    const [isScrolled, setIsScrolled] = useState(false);

    // Get current locale from URL
    const currentLocale = location.pathname.startsWith('/en') ? 'en' : 'pt';
    const middleIndex = Math.floor(navigationItems.length / 2);

    // Language toggle handler
    const handleLanguageChange = (targetLocale: Locale) => {
        const currentPath = location.pathname;
        const newPath = currentPath.replace(`/${currentLocale}`, `/${targetLocale}`);
        navigate(newPath);
    };

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
            isScrolled
                ? 'dark:bg-[#222]/95 dark:border-gray-700/50 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm'
                : ''
        }`}>
            {/* Skip link and container */}
            <div className="container mx-auto px-4">
                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center justify-between py-4">
                    <nav className="flex items-center gap-8">
                        {navigationItems.slice(0, middleIndex).map((item) => (
                            <NavLink
                                key={item.id}
                                item={item}
                                currentLocale={currentLocale}
                                currentPath={location.pathname}
                            />
                        ))}

                        <Link to={`/${currentLocale}`} className="flex-shrink-0 mx-8" aria-label="Home">
                            <img
                                src="/askksa-web/askksa_logo.svg"
                                alt="ASKKSA Karate Club"
                                className="h-28 w-auto transition-transform hover:scale-105"
                            />
                        </Link>

                        {navigationItems.slice(middleIndex).map((item) => (
                            <NavLink
                                key={item.id}
                                item={item}
                                currentLocale={currentLocale}
                                currentPath={location.pathname}
                            />
                        ))}
                    </nav>

                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <LanguageToggle
                            currentLocale={currentLocale}
                            onChange={handleLanguageChange}
                        />
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className="lg:hidden flex items-center justify-between py-4">
                    <Link to={`/${currentLocale}`} aria-label="Home">
                        <img src="/askksa-web/askksa_logo.svg" alt="ASKKSA" className="h-20 w-auto" />
                    </Link>

                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <LanguageToggle
                            currentLocale={currentLocale}
                            onChange={handleLanguageChange}
                            isMobile
                        />
                        <button
                            onClick={toggleMenu}
                            className={`p-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10 text-[#222] hover:bg-gray-100 focus:bg-gray-100`}
                            aria-expanded={isMenuOpen}
                            aria-controls="mobile-menu"
                            aria-label="Toggle navigation menu"
                        >
                            <HamburgerIcon isOpen={isMenuOpen} />
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div
                    id="mobile-menu"
                    className={`lg:hidden overflow-hidden transition-all duration-300 ${
                        isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                >
                    <nav className={`rounded-lg mb-4 p-4 backdrop-blur-md border dark:bg-[#222]/95 dark:border-gray-700 bg-white/95 border-gray-200`}>
                        {navigationItems.map((item) => (
                            <Link
                                key={item.id}
                                to={routeMap[item.routeKey][currentLocale]}
                                className={`block py-3 px-4 rounded-md transition-colors ${
                                    location.pathname === routeMap[item.routeKey][currentLocale]
                                        ? 'bg-primary/20 text-primary'
                                        : 'dark:text-white dark:hover:text-primary dark:hover:bg-gray-700/50 text-[#222] hover:text-primary hover:bg-gray-100'
                                }`}
                                onClick={() => toggleMenu()}
                            >
                                {item.label[currentLocale]}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </header>
    );
};

const NavLink: React.FC<{
    item: NavigationItem;
    currentLocale: Locale;
    currentPath: string;
}> = ({ item, currentLocale, currentPath }) => {
    const href = routeMap[item.routeKey][currentLocale];
    const isActive = currentPath === href;

    return (
        <Link
            to={href}
            className={`font-semibold px-4 py-2 rounded-md transition-all duration-200 ${
                isActive
                    ? 'text-primary bg-primary/10 ring-2 ring-primary/20'
                    : 'dark:text-white dark:hover:text-primary dark:hover:bg-white/5 text-[#222] hover:text-primary hover:bg-gray-100'
            }`}
            aria-current={isActive ? 'page' : undefined}
        >
            {item.label[currentLocale]}
        </Link>
    );
};

const LanguageToggle: React.FC<{
    currentLocale: Locale;
    onChange: (locale: Locale) => void;
    isMobile?: boolean;
}> = ({ currentLocale, onChange, isMobile = false }) => (
    <div className={`flex gap-2 ${isMobile ? 'lg:hidden' : ''}`}>
        <button
            onClick={() => onChange('pt')}
            className={`px-3 py-1 rounded transition-colors ${
                currentLocale === 'pt'
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
            aria-label="Switch to Portuguese"
        >
            PT
        </button>
        <button
            onClick={() => onChange('en')}
            className={`px-3 py-1 rounded transition-colors ${
                currentLocale === 'en'
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
            aria-label="Switch to English"
        >
            EN
        </button>
    </div>
);

const HamburgerIcon: React.FC<{ isOpen: boolean }> = ({ isOpen }) => (
    <div className="w-6 h-6 flex flex-col justify-center items-center">
    <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
        isOpen ? 'rotate-45 translate-y-1' : ''
    }`} />
        <span className={`block h-0.5 w-6 bg-current transition-all duration-300 my-1 ${
            isOpen ? 'opacity-0' : ''
        }`} />
        <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
            isOpen ? '-rotate-45 -translate-y-1' : ''
        }`} />
    </div>
);
