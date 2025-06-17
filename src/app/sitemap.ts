import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!siteUrl) {
    throw new Error("NEXT_PUBLIC_SITE_URL is not defined");
  }
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      alternates: {
        languages: {
          pt: siteUrl,
          en: siteUrl + "/en",
        },
      },
    },
    {
      url: siteUrl + "/about",
      lastModified: new Date(),
      alternates: {
        languages: {
          pt: siteUrl + "/sobre",
          en: siteUrl + "/en/about",
        },
      },
    },
  ];
}
