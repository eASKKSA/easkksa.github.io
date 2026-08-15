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
  return routing.locales.map((locale) => ({
    url: getUrl(href, locale),
    alternates: {
      languages: {
        ...Object.fromEntries(
          routing.locales.map((cur) => [cur, getUrl(href, cur)]),
        ),
        "x-default": getUrl(href, "pt-PT"),
      },
    },
  }));
}

function getUrl(href: Href, locale: Locale) {
  const pathname = getPathname({ locale, href });
  return host + pathname;
}
