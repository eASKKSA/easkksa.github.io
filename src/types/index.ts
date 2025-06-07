// src/types/index.ts
export interface NavigationItem {
    id: string;
    label: string;
    href: string;
    isExternal?: boolean;
}

export interface SeoData {
    title: string;
    description: string;
    keywords?: string[];
    image?: string;
    url?: string;
}

export interface ClassSchedule {
    id: string;
    name: string;
    days: string[];
    time: string;
    level: 'beginner' | 'intermediate' | 'advanced';
    ageGroup: string;
}

export interface ContactInfo {
    phone: string;
    email: string;
    address: {
        street: string;
        city: string;
        zipCode: string;
    };
    social: {
        facebook?: string;
        instagram?: string;
        youtube?: string;
    };
}

export interface Instructor {
    id: string;
    name: string;
    rank: string;
    photo: string;
    bio: string;
    specialties: string[];
}
