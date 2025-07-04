import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!siteUrl) {
    throw new Error("NEXT_PUBLIC_SITE_URL is not defined");
  }

  const currentDate = new Date();

  return [
    // Homepage
    {
      url: siteUrl,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: {
          "pt-PT": siteUrl,
          en: siteUrl + "/en",
        },
      },
    },

    // Main Pages
    {
      url: siteUrl + "/sobre",
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: {
        languages: {
          "pt-PT": siteUrl + "/sobre",
          en: siteUrl + "/en/about",
        },
      },
    },
    {
      url: siteUrl + "/noticias",
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.8,
      alternates: {
        languages: {
          "pt-PT": siteUrl + "/noticias",
          en: siteUrl + "/en/news",
        },
      },
    },
    {
      url: siteUrl + "/historia",
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.7,
      alternates: {
        languages: {
          "pt-PT": siteUrl + "/historia",
          en: siteUrl + "/en/history",
        },
      },
    },
    {
      url: siteUrl + "/estilo-ski",
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          "pt-PT": siteUrl + "/estilo-ski",
          en: siteUrl + "/en/style-ski",
        },
      },
    },

    // Philosophy Section
    {
      url: siteUrl + "/filosofia",
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          "pt-PT": siteUrl + "/filosofia",
          en: siteUrl + "/en/philosophy",
        },
      },
    },
    {
      url: siteUrl + "/filosofia/bushido",
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          "pt-PT": siteUrl + "/filosofia/bushido",
          en: siteUrl + "/en/philosophy/bushido",
        },
      },
    },
    {
      url: siteUrl + "/filosofia/dojo-kun",
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          "pt-PT": siteUrl + "/filosofia/dojo-kun",
          en: siteUrl + "/en/philosophy/dojo-kun",
        },
      },
    },
    {
      url: siteUrl + "/filosofia/niju-kun",
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          "pt-PT": siteUrl + "/filosofia/niju-kun",
          en: siteUrl + "/en/philosophy/niju-kun",
        },
      },
    },

    // In-Dojo Section
    {
      url: siteUrl + "/no-dojo",
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          "pt-PT": siteUrl + "/no-dojo",
          en: siteUrl + "/en/in-dojo",
        },
      },
    },
    {
      url: siteUrl + "/no-dojo/saudacao",
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: {
        languages: {
          "pt-PT": siteUrl + "/no-dojo/saudacao",
          en: siteUrl + "/en/in-dojo/salutation",
        },
      },
    },
    {
      url: siteUrl + "/no-dojo/regras",
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: {
        languages: {
          "pt-PT": siteUrl + "/no-dojo/regras",
          en: siteUrl + "/en/in-dojo/rules",
        },
      },
    },
    {
      url: siteUrl + "/no-dojo/vocabulario",
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: {
        languages: {
          "pt-PT": siteUrl + "/no-dojo/vocabulario",
          en: siteUrl + "/en/in-dojo/vocabulary",
        },
      },
    },
    {
      url: siteUrl + "/no-dojo/graduacoes",
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: {
        languages: {
          "pt-PT": siteUrl + "/no-dojo/graduacoes",
          en: siteUrl + "/en/in-dojo/grades",
        },
      },
    },

    // Legal Pages
    {
      url: siteUrl + "/politica-de-privacidade",
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: {
        languages: {
          "pt-PT": siteUrl + "/politica-de-privacidade",
          en: siteUrl + "/en/privacy-policy",
        },
      },
    },
  ];
}
