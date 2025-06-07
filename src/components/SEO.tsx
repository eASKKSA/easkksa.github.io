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

            {/* ✅ Essential Meta Tags */}
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <meta httpEquiv="Content-Type" content="text/html; charset=utf-8"/>
            <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"/>
            <meta name="googlebot" content="index, follow"/>

            {/* ✅ Performance & Security */}
            <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
            <meta name="referrer" content="no-referrer-when-downgrade"/>

            {/* ✅ Preconnect for performance */}
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>

            {/* Favicon and Icons */}
            <link rel="icon" type="image/svg+xml" href="/askksa-web/icons/favicon.svg"/>
            <link rel="icon" href="/askksa-web/icons/favicon.ico" type="image/x-icon"/>
            <link rel="shortcut icon" href="/askksa-web/icons/favicon.ico" type="image/x-icon"/>
            <link rel="apple-touch-icon" sizes="57x57" href="/askksa-web/icons/favicon-57x57.png"/>
            <link rel="apple-touch-icon" sizes="60x60" href="/askksa-web/icons/favicon-60x60.png"/>
            <link rel="apple-touch-icon" sizes="72x72" href="/askksa-web/icons/favicon-72x72.png"/>
            <link rel="apple-touch-icon" sizes="76x76" href="/askksa-web/icons/favicon-76x76.png"/>
            <link rel="apple-touch-icon" sizes="114x114" href="/askksa-web/icons/favicon-114x114.png"/>
            <link rel="apple-touch-icon" sizes="120x120" href="/askksa-web/icons/favicon-120x120.png"/>
            <link rel="apple-touch-icon" sizes="144x144" href="/askksa-web/icons/favicon-144x144.png"/>
            <link rel="apple-touch-icon" sizes="152x152" href="/askksa-web/icons/favicon-152x152.png"/>
            <link rel="apple-touch-icon" sizes="180x180" href="/askksa-web/icons/favicon-180x180.png"/>
            <link rel="icon" type="image/png" sizes="16x16" href="/askksa-web/icons/favicon-16x16.png"/>
            <link rel="icon" type="image/png" sizes="32x32" href="/askksa-web/icons/favicon-32x32.png"/>
            <link rel="icon" type="image/png" sizes="96x96" href="/askksa-web/icons/favicon-96x96.png"/>
            <link rel="icon" type="image/png" sizes="192x192" href="/askksa-web/icons/favicon-192x192.png"/>
            <link rel="mask-icon" href="/askksa-web/icons/favicon.svg" />
            <meta name="msapplication-TileColor" content="#ffffff"/>
            <meta name="msapplication-TileImage" content="/askksa-web/icons/favicon-144x144.png"/>
            <meta name="msapplication-config" content="/askksa-web/icons/browserconfig.xml"/>
            <link rel="manifest" href="/askksa-web/icons/manifest.json"/>
            <meta name="theme-color" content="#ffffff"/>

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

            {/* ✅ Enhanced Twitter Card */}
            <meta name="twitter:card" content="summary_large_image"/>
            <meta name="twitter:title" content={seoData.title}/>
            <meta name="twitter:description" content={seoData.description}/>
            <meta name="twitter:image" content={ogImage}/>
            <meta name="twitter:image:alt" content={seoData.title}/>
            <meta name="twitter:creator" content="@askksa"/>
            <meta name="twitter:site" content="@askksa"/>

            {/* ✅ Additional Meta Tags */}
            <meta name="language" content={getLanguageName(lang)}/>
            <meta name="author" content="ASKKSA"/>
            <meta name="publisher" content="ASKKSA"/>
            <meta name="copyright" content="ASKKSA"/>
            <meta name="distribution" content="global"/>
            <meta name="rating" content="general"/>

            {/* ✅ Dynamic Canonical */}
            <link rel="canonical" href={canonicalUrl}/>
            <link rel="alternate" hrefLang="pt" href={`${siteUrl}pt`}/>
            <link rel="alternate" hrefLang="en" href={`${siteUrl}en`}/>
            <link rel="alternate" hrefLang="x-default" href={`${siteUrl}en`}/>

            <meta name="apple-mobile-web-app-capable" content="yes"/>
            <meta name="apple-mobile-web-app-status-bar-style" content="default"/>
            <meta name="apple-mobile-web-app-title" content="ASKKSA"/>

            {/* ✅ Enhanced Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "SportsActivityLocation",
                    "name": "ASKKSA - Academia de Karate Shotokan",
                    "description": seoData.description,
                    "url": siteUrl,
                    "image": ogImage,
                    "sport": "Karate",
                    "address": {
                        "@type": "PostalAddress",
                        "addressCountry": "PT"
                    },
                    "sameAs": [
                        // Add your social media URLs
                        "https://facebook.com/askksa",
                        "https://instagram.com/askksa"
                    ]
                })}
            </script>

            {children}
        </>
    );
};
