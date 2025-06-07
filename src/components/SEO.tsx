// src/components/SEO.tsx - Updated for React 19
import React from 'react';
import {useLocale} from "@/hooks/useLocale.ts";

interface SEOProps {
    title: string;
    description: string;
    keywords?: string[];
    image?: string;
    url?: string;
    children?: React.ReactNode;
}

export const Seo: React.FC<SEOProps> = ({
                                            title,
                                            description,
                                            keywords = [],
                                            image,
                                            url,
                                            children,
                                        }) => {
    const { t } = useLocale();
    const defaultImage = '/og-image.jpg';
    const siteUrl = 'https://askksa.pt';
    t.seo = {
        title: title || t.seo.title,
        description: description || t.seo.description,
        keywords: keywords.length > 0 ? keywords : t.seo.keywords,
    };

    return (
        <>
            {/* React 19 native metadata support */}
            <title>{t.seo.title}</title>
            <meta name="description" content={t.seo.description} />
            {t.seo.keywords.length > 0 && (
                <meta name="keywords" content={t.seo.keywords.join(', ')} />
            )}

            {/* Open Graph */}
            <meta property="og:title" content={t.seo.title} />
            <meta property="og:description" content={t.seo.description} />
            <meta property="og:image" content={image ?? defaultImage} />
            <meta property="og:url" content={url ?? siteUrl} />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content={t.seo.title} />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={t.seo.title} />
            <meta name="twitter:description" content={t.seo.description} />
            <meta name="twitter:image" content={image ?? defaultImage} />

            {/* Additional Meta Tags */}
            <meta name="robots" content="index, follow" />
            <meta name="language" content="Portuguese" />
            <meta name="author" content="ASKKSA" />

            {/* Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "SportsActivityLocation",
                    "name": "ASKKSA - Academia de Karate Shotokan",
                    "description": t.seo.description,
                    "url": siteUrl,
                    "image": image ?? defaultImage,
                    "sport": "Karate",
                    "address": {
                        "@type": "PostalAddress",
                        "addressCountry": "PT"
                    }
                })}
            </script>

            {children}
        </>
    );
};
