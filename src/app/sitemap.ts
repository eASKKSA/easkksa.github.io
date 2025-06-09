import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://askksa.pt",
      lastModified: new Date(),
      alternates: {
        languages: {
          pt: "https://askksa.pt/pt",
          en: "https://askksa.pt/en",
        },
      },
    },
    {
      url: "https://askksa.pt/about",
      lastModified: new Date(),
      alternates: {
        languages: {
          pt: "https://askksa.pt/pt/sobre",
          en: "https://askksa.pt/en/about",
        },
      },
    },
  ];
}
