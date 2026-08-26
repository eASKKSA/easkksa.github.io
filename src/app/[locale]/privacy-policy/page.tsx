import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LuArrowUpRight, LuMail, LuShieldCheck } from "react-icons/lu";
import Container from "@/components/container";
import { getPathname } from "@/i18n/navigation";
import {
  getLocalizedAlternates,
  getOpenGraphAlternateLocales,
  getOpenGraphLocale,
} from "@/lib/seo";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export async function generateMetadata({
  params,
}: Readonly<{ params: Promise<{ locale: Locale }> }>): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Privacy" });
  const pathname = getPathname({ href: "/privacy-policy", locale });

  return {
    title: `${t("title")} | ASKKSA`,
    description: t("intro"),
    alternates: getLocalizedAlternates("/privacy-policy", locale),
    openGraph: {
      title: `${t("title")} | ASKKSA`,
      description: t("intro"),
      siteName: "ASKKSA",
      locale: getOpenGraphLocale(locale),
      alternateLocale: getOpenGraphAlternateLocales(locale),
      type: "website",
      url: siteUrl + pathname,
    },
    twitter: {
      card: "summary",
      title: `${t("title")} | ASKKSA`,
      description: t("intro"),
    },
  };
}

const sections = [
  "controller",
  "data",
  "purpose",
  "cookies",
  "sharing",
  "rights",
] as const;

export default async function Page({
  params,
}: Readonly<{ params: Promise<{ locale: Locale }> }>) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Privacy" });

  return (
    <Container blur withBubbles skipAnimation>
      <div className="relative text-center">
        <span className="section-kicker">{t("eyebrow")}</span>
        <h1>{t("title")}</h1>
        <p className="mx-auto mt-6 max-w-3xl text-center! text-lg text-stone-600 dark:text-stone-300">
          {t("intro")}
        </p>
        <p className="mt-4 text-center! text-sm font-medium text-stone-500 dark:text-stone-400">
          {t("updated")}
        </p>
      </div>

      <div className="page-intro-gap relative rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:p-8 dark:border-primary/30 dark:bg-primary/10">
        <LuShieldCheck
          className="mb-4 size-7 text-primary"
          aria-hidden="true"
        />
        <h2 className="text-2xl font-bold">{t("summaryTitle")}</h2>
        <p className="mt-3 max-w-4xl text-stone-700 dark:text-stone-300">
          {t("summary")}
        </p>
      </div>

      <div className="relative mt-12 grid gap-6 md:grid-cols-2">
        {sections.map((section) => (
          <article
            key={section}
            className="rounded-2xl border border-black/10 bg-white/65 p-6 sm:p-8 dark:border-white/10 dark:bg-white/5"
          >
            <h2 className="text-2xl font-bold">{t(`${section}Title`)}</h2>
            <p className="mt-4 text-stone-700 dark:text-stone-300">
              {t(section)}
            </p>
          </article>
        ))}
      </div>

      <section className="relative mb-0! mt-12 rounded-2xl bg-ink p-6 text-white sm:p-8">
        <h2 className="text-2xl font-bold text-white">{t("linksTitle")}</h2>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            href="https://www.cnpd.pt/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-sm font-semibold transition-colors hover:border-primary hover:bg-primary"
          >
            {t("cnpd")} <LuArrowUpRight aria-hidden="true" />
          </a>
          <a
            href="https://vercel.com/docs/analytics/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-sm font-semibold transition-colors hover:border-primary hover:bg-primary"
          >
            {t("vercel")} <LuArrowUpRight aria-hidden="true" />
          </a>
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2.5 text-sm font-semibold transition-colors hover:border-primary hover:bg-primary"
          >
            {t("google")} <LuArrowUpRight aria-hidden="true" />
          </a>
          <a
            href="mailto:direcao@askksa.pt"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-primary-dark"
          >
            <LuMail aria-hidden="true" /> {t("contact")}
          </a>
        </div>
      </section>
    </Container>
  );
}
