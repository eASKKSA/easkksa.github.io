import type { MetadataRoute } from "next";
import type { Locale } from "next-intl";
import askksaThumb from "@/assets/askksa_thumb.svg";
import graduationsImage from "@/assets/in-dojo/graduacoes.jpg";
import heroImage from "@/assets/in-dojo/Sensei_Seiza.jpeg";
import historyImage from "@/assets/masters-of-karate.jpg";
import ethicalCodeImage from "@/assets/philosofy/codigo-etica-karate.jpg";
import dojoKunImage from "@/assets/philosofy/dojo-kun.jpg";
import principlesImage from "@/assets/philosofy/principios.gif";
import jorgeFreitas from "@/assets/senseis/jorge_freitas.webp";
import styleImage from "@/assets/style-ski/top.jpg";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getAbsoluteUrl, getSiteUrl } from "@/lib/seo";

type Href = Extract<Parameters<typeof getPathname>[0]["href"], string>;

type PageConfig = {
  href: Href;
  changeFrequency: NonNullable<
    MetadataRoute.Sitemap[number]["changeFrequency"]
  >;
  priority: number;
  image?: string;
};

// Update this only when the site's substantive content changes.
const LAST_CONTENT_UPDATE = new Date("2026-08-26T00:00:00.000Z");

const pages: PageConfig[] = [
  { href: "/", changeFrequency: "weekly", priority: 1, image: heroImage.src },
  {
    href: "/about",
    changeFrequency: "monthly",
    priority: 0.9,
    image: jorgeFreitas.src,
  },
  { href: "/news", changeFrequency: "daily", priority: 0.9 },
  { href: "/faq", changeFrequency: "monthly", priority: 0.8 },
  {
    href: "/in-dojo",
    changeFrequency: "monthly",
    priority: 0.8,
    image: askksaThumb.src,
  },
  {
    href: "/in-dojo/salutation",
    changeFrequency: "yearly",
    priority: 0.7,
    image: heroImage.src,
  },
  { href: "/in-dojo/rules", changeFrequency: "yearly", priority: 0.7 },
  {
    href: "/in-dojo/vocabulary",
    changeFrequency: "yearly",
    priority: 0.7,
  },
  {
    href: "/in-dojo/grades",
    changeFrequency: "yearly",
    priority: 0.7,
    image: graduationsImage.src,
  },
  {
    href: "/history",
    changeFrequency: "yearly",
    priority: 0.8,
    image: historyImage.src,
  },
  {
    href: "/philosophy",
    changeFrequency: "yearly",
    priority: 0.8,
    image: principlesImage.src,
  },
  {
    href: "/philosophy/bushido",
    changeFrequency: "yearly",
    priority: 0.7,
    image: ethicalCodeImage.src,
  },
  {
    href: "/philosophy/dojo-kun",
    changeFrequency: "yearly",
    priority: 0.7,
    image: dojoKunImage.src,
  },
  {
    href: "/philosophy/niju-kun",
    changeFrequency: "yearly",
    priority: 0.7,
    image: principlesImage.src,
  },
  {
    href: "/style-ski",
    changeFrequency: "yearly",
    priority: 0.8,
    image: styleImage.src,
  },
  {
    href: "/privacy-policy",
    changeFrequency: "yearly",
    priority: 0.3,
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap((page) => getEntries(page));
}

function getEntries(page: PageConfig): MetadataRoute.Sitemap {
  return routing.locales.map((locale) => ({
    url: getUrl(page.href, locale),
    lastModified: LAST_CONTENT_UPDATE,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
    ...(page.image ? { images: [getAbsoluteUrl(page.image)] } : {}),
    alternates: {
      languages: {
        ...Object.fromEntries(
          routing.locales.map((current) => [
            current,
            getUrl(page.href, current),
          ]),
        ),
        "x-default": getUrl(page.href, routing.defaultLocale),
      },
    },
  }));
}

function getUrl(href: Href, locale: Locale) {
  const pathname = getPathname({ locale, href });
  return pathname === "/" ? getSiteUrl() : getAbsoluteUrl(pathname);
}
