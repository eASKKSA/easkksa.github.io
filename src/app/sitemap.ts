import type { MetadataRoute } from "next";
import type { Locale } from "next-intl";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const host = process.env.NEXT_PUBLIC_SITE_URL;
if (!host) throw new Error("NEXT_PUBLIC_SITE_URL is not defined");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...getEntries("/"),
    ...getEntries("/about"),
    ...getEntries("/news"),
    ...getEntries("/faq"),
    ...getEntries("/in-dojo"),
    ...getEntries("/in-dojo/salutation"),
    ...getEntries("/in-dojo/rules"),
    ...getEntries("/in-dojo/vocabulary"),
    ...getEntries("/in-dojo/grades"),
    ...getEntries("/history"),
    ...getEntries("/philosophy"),
    ...getEntries("/philosophy/bushido"),
    ...getEntries("/philosophy/dojo-kun"),
    ...getEntries("/philosophy/niju-kun"),
    ...getEntries("/style-ski"),
    ...getEntries("/privacy-policy"),
  ];
}

type Href = Extract<Parameters<typeof getPathname>[0]["href"], string>;

function getEntries(href: Href) {
  const metadata = routeMeta[href] ?? {
    changeFrequency: "monthly",
    priority: 0.5,
    lastModified: now,
  };

  return routing.locales.map((locale) => ({
    url: getUrl(href, locale),
    ...metadata,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((cur) => [cur, getUrl(href, cur)]),
      ),
    },
  }));
}

function getUrl(href: Href, locale: Locale) {
  const pathname = getPathname({ locale, href });
  return host + pathname;
}

const now = new Date();

const routeMeta: Partial<
  Record<Href, Omit<MetadataRoute.Sitemap[0], "url" | "alternates">>
> = {
  "/": {
    priority: 1.0,
    changeFrequency: "weekly",
    lastModified: now,
  },
  "/about": {
    priority: 0.9,
    changeFrequency: "monthly",
    lastModified: now,
  },
  "/news": {
    priority: 0.8,
    changeFrequency: "weekly",
    lastModified: now,
  },
  "/history": {
    priority: 0.7,
    changeFrequency: "yearly",
    lastModified: now,
  },
  "/style-ski": {
    priority: 0.7,
    changeFrequency: "monthly",
    lastModified: now,
  },
  "/philosophy": {
    priority: 0.8,
    changeFrequency: "monthly",
    lastModified: now,
  },
  "/philosophy/bushido": {
    priority: 0.7,
    changeFrequency: "monthly",
    lastModified: now,
  },
  "/philosophy/dojo-kun": {
    priority: 0.7,
    changeFrequency: "monthly",
    lastModified: now,
  },
  "/philosophy/niju-kun": {
    priority: 0.7,
    changeFrequency: "monthly",
    lastModified: now,
  },
  "/in-dojo": {
    priority: 0.8,
    changeFrequency: "monthly",
    lastModified: now,
  },
  "/in-dojo/salutation": {
    priority: 0.6,
    changeFrequency: "monthly",
    lastModified: now,
  },
  "/in-dojo/rules": {
    priority: 0.6,
    changeFrequency: "monthly",
    lastModified: now,
  },
  "/in-dojo/vocabulary": {
    priority: 0.6,
    changeFrequency: "monthly",
    lastModified: now,
  },
  "/in-dojo/grades": {
    priority: 0.6,
    changeFrequency: "monthly",
    lastModified: now,
  },
  "/privacy-policy": {
    priority: 0.3,
    changeFrequency: "yearly",
    lastModified: now,
  },
  "/faq": {
    priority: 0.4,
    changeFrequency: "monthly",
    lastModified: now,
  },
};
