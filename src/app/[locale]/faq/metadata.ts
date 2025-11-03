import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { FAQPage, WithContext } from "schema-dts";
import { getPathname } from "@/i18n/navigation";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const jsonLd = async (
  t: TFunction,
  locale: Locale,
): Promise<WithContext<FAQPage>> => {
  const pathname = getPathname({ href: "/faq", locale: locale });

  // Build FAQ schema from questions
  const questions = [
    {
      id: "q1",
      question: t("questions.q1.question"),
      answer: t("questions.q1.answer"),
    },
    {
      id: "q2",
      question: t("questions.q2.question"),
      answer: t("questions.q2.answer"),
    },
    {
      id: "q3",
      question: t("questions.q3.question"),
      answer: t("questions.q3.answer"),
    },
    {
      id: "q4",
      question: t("questions.q4.question"),
      answer: t("questions.q4.answer"),
    },
    {
      id: "q5",
      question: t("questions.q5.question"),
      answer: t("questions.q5.answer"),
    },
    {
      id: "q6",
      question: t("questions.q6.question"),
      answer: t("questions.q6.answer"),
    },
    {
      id: "q7",
      question: t("questions.q7.question"),
      answer: t("questions.q7.answer"),
    },
    {
      id: "q8",
      question: t("questions.q8.question"),
      answer: t("questions.q8.answer"),
    },
    {
      id: "q9",
      question: t("questions.q9.question"),
      answer: t("questions.q9.answer"),
    },
    {
      id: "q10",
      question: t("questions.q10.question"),
      answer: t("questions.q10.answer"),
    },
    {
      id: "q11",
      question: t("questions.q11.question"),
      answer: t("questions.q11.answer"),
    },
    {
      id: "q12",
      question: t("questions.q12.question"),
      answer: t("questions.q12.answer"),
    },
  ];

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    name: t("title"),
    description: t("subtitle"),
    url: siteUrl + pathname,
    inLanguage: locale,
    dateModified: new Date().toISOString(),
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: locale === "pt-PT" ? "Início" : "Home",
          item: siteUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: locale === "pt-PT" ? "Perguntas Frequentes" : "FAQ",
          item: siteUrl + pathname,
        },
      ],
    },
    mainEntity: questions.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
    about: {
      "@type": "SportsOrganization",
      name: "ASKKSA - Associação Shotokan Kokusai Karate Santo António",
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "ASKKSA",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/icons/icon-512x512.png`,
      },
    },
  };
};

export async function metadata(locale: Locale): Promise<Metadata> {
  const t = await getTranslations("FAQ");
  const pathname = getPathname({ href: "/faq", locale: locale });
  const otherLocale = locale === "pt-PT" ? "en" : "pt-PT";
  const otherPathname = getPathname({ href: "/faq", locale: otherLocale });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    keywords: t("meta.keywords"),
    alternates: {
      canonical: pathname,
      languages: {
        [otherLocale]: otherPathname,
        "x-default": getPathname({ href: "/faq", locale: "en" }),
      },
    },
    openGraph: {
      title: t("meta.title"),
      siteName: "ASKKSA: Associação Shotokan Kokusai Karate Santo António",
      locale: locale,
      description: t("meta.description"),
      url: siteUrl + pathname,
      type: "website",
      images: [
        {
          url: "/icons/icon-512x512.png",
          width: 512,
          height: 512,
          alt: t("meta.title"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("meta.title"),
      description: t("meta.description"),
      images: [`${siteUrl}/icons/icon-512x512.png`],
    },
  };
}
