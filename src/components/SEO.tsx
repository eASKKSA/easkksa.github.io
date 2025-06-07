import React from 'react';
import { useLocale } from "@/hooks/useLocale.ts";

interface SEOProps {
    title: string;
    description: string;
    keywords?: string[];
    url?: string;
    image?: string;
    children?: React.ReactNode;
}

export const Seo: React.FC<SEOProps> = ({
                                            title,
                                            description,
                                            keywords = [],
                                            url,
                                            image,
                                            children,
                                        }) => {
    const { t, lang } = useLocale();
    const defaultImage = '/askksa-web/icons/favicon-512x512.png';
    const siteUrl = 'https://easkksa.github.io/askksa-web/';

    // ✅ Dynamic locale mapping
    const getOgLocale = (currentLocale: string) => {
        const localeMap: Record<string, string> = {
            'pt': 'pt_PT',
            'en': 'en_US'
        };
        return localeMap[currentLocale] || 'pt_PT';
    };

    const getLanguageName = (currentLocale: string) => {
        const languageMap: Record<string, string> = {
            'pt': 'Portuguese',
            'en': 'English'
        };
        return languageMap[currentLocale] || 'Portuguese';
    };

    const getAlternateLocale = (currentLocale: string) => {
        return currentLocale === 'pt' ? 'en_US' : 'pt_PT';
    };

    // ✅ Don't mutate translation object
    const seoData = {
        title: title || t.seo.title,
        description: description || t.seo.description,
        keywords: keywords.length > 0 ? keywords : t.seo.keywords,
    };

    // ✅ Helper for absolute URLs
    const getAbsoluteUrl = (path: string) => {
        return path.startsWith('http') ? path : `${siteUrl}${path.replace(/^\//, '')}`;
    };

    const canonicalUrl = url ? getAbsoluteUrl(url) : siteUrl;
    const ogImage = getAbsoluteUrl(image ?? defaultImage);

    return (
        <>
            {/* Basic Meta Tags */}
            <title>{seoData.title}</title>
            <meta name="description" content={seoData.description}/>
            {seoData.keywords.length > 0 && (
                <meta name="keywords" content={seoData.keywords.join(', ')}/>
            )}

            {/* ✅ Enhanced Open Graph */}
            <meta property="og:title" content={seoData.title}/>
            <meta property="og:description" content={seoData.description}/>
            <meta property="og:image" content={ogImage}/>
            <meta property="og:image:type" content="image/png"/>
            <meta property="og:image:width" content="512"/>
            <meta property="og:image:height" content="512"/>
            <meta property="og:image:alt" content={seoData.title}/>
            <meta property="og:url" content={canonicalUrl}/>
            <meta property="og:type" content="website"/>
            <meta property="og:site_name" content="ASKKSA - Associação Shotokan Kokusai Karate Santo António | Respeito e Disciplina"/>
            <meta property="og:locale" content={getOgLocale(lang)}/>
            <meta property="og:locale:alternate" content={getAlternateLocale(lang)}/>

            {/* ✅ Additional Meta Tags */}
            <meta name="language" content={getLanguageName(lang)}/>

            {/* ✅ Dynamic Canonical */}
            <link rel="canonical" href={canonicalUrl}/>
            <link rel="alternate" hrefLang="pt" href={`${siteUrl}pt`}/>
            <link rel="alternate" hrefLang="en" href={`${siteUrl}en`}/>
            <link rel="alternate" hrefLang="x-default" href={`${siteUrl}en`}/>

            {/* ✅ Enhanced Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": ["SportsActivityLocation", "LocalBusiness", "SportsOrganization"],
                    "name": "ASKKSA - Associação Shotokan Kokusai Karate Santo António",
                    "alternateName": "Associação Shotokan Kokusai Karate Santo António",
                    "description": seoData.description,
                    "url": siteUrl,
                    "image": ogImage,
                    "logo": ogImage,
                    "sport": "Karate",
                    "telephone": "+351-960-384-090", // Add your phone
                    "email": "direcao@askksa.pt", // Add your email
                    "foundingDate": "2000-04",
                    "memberOf": [
                        {
                            "@type": "Organization",
                            "name": "FNK-P - Federação Nacional de Karate Portugal"
                        },
                        {
                            "@type": "Organization",
                            "name": "AKRAM - Associação de Karate da Região Autónoma da Madeira"
                        }
                    ],
                    "address": {
                        "@type": "PostalAddress",
                        "streetAddress": "Escola Horácio Bento Gouveia",
                        "addressLocality": "Funchal",
                        "addressRegion": "Madeira",
                        "postalCode": "9004-524",
                        "addressCountry": "PT"
                    },
                    "geo": {
                        "@type": "GeoCoordinates",
                        "latitude": "32.64960322122704",
                        "longitude": "-16.925423720138244"
                    },
                    "openingHours": ["Mo-Fr 19:30-21:30"], // Add your actual schedule
                    "sameAs": [
                        "https://www.facebook.com/ASKKSA.MADEIRA",
                        "https://www.instagram.com/askksa_madeira/"
                    ],
                    "knowsAbout": ["Karate", "Shotokan", "Martial Arts", "Sports Training"],
                    "areaServed": {
                        "@type": "Place",
                        "name": "Madeira, Portugal"
                    }
                })}
            </script>
            {/* Additional SEO Meta Tags */}
            <meta name="format-detection" content="telephone=no" />
            <meta property="article:author" content="ASKKSA" />
            <meta property="article:publisher" content="ASKKSA" />
            <meta name="dc.title" content={seoData.title} />
            <meta name="dc.description" content={seoData.description} />
            <meta name="geo.region" content="PT-30" />
            <meta name="geo.placename" content="Funchal, Madeira" />
            <meta name="geo.position" content="32.64960322122704;-16.925423720138244" />
            <meta name="ICBM" content="32.64960322122704, -16.925423720138244" />

            {children}
        </>
    );
};
