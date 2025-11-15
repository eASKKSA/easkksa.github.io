import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!siteUrl) {
    throw new Error("NEXT_PUBLIC_SITE_URL is not defined");
  }

  const isProduction = process.env.VERCEL_ENV === "production";

  return {
    rules: {
      userAgent: "*",
      allow: isProduction ? "/" : "",
      disallow: isProduction ? ["/private/", "/_next/"] : "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
