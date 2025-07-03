import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Section from "@/components/container";
import { jsonLd, metadata } from "./metadata";
import { MetadataLDJSON } from "@/app/metadata";
import { Link } from "@/i18n/navigation";

// --- ASSETS ---
import senseiSeizaImage from "@/assets/in-dojo/Sensei_by_VCRC.jpg";
import gradesImage from "@/assets/in-dojo/graduacoes.jpg";

export const generateMetadata = metadata;

// --- MAIN PAGE COMPONENT ---
export default async function InDojoPage() {
  const t = await getTranslations("InDojo");

  // Data usando traduções
  const inDojoSections = [
    {
      id: "salutation",
      title: t("sections.salutation.title"),
      description: t("sections.salutation.description"),
      image: senseiSeizaImage,
      href: "/in-dojo/salutation" as const,
    },
    {
      id: "rules",
      title: t("sections.rules.title"),
      description: t("sections.rules.description"),
      image: "/askksa_logo.svg",
      href: "/in-dojo/rules" as const,
    },
    {
      id: "vocabulary",
      title: t("sections.vocabulary.title"),
      description: t("sections.vocabulary.description"),
      image: "/askksa_logo.svg",
      href: "/in-dojo/vocabulary" as const,
    },
    {
      id: "grades",
      title: t("sections.grades.title"),
      description: t("sections.grades.description"),
      image: gradesImage,
      href: "/in-dojo/grades" as const,
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <Section blur withBubbles>
        <h1 className="text-5xl font-bold mb-8 text-gray-900 dark:text-white text-center">
          {t("title")}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed text-center">
          {t("introduction")}
        </p>
      </Section>

      <Section>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mx-auto">
          {inDojoSections.map((section) => (
            <Link key={section.id} href={section.href} className="group">
              <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full border border-gray-200 dark:border-gray-700">
                <div className="relative h-48">
                  <Image
                    src={section.image}
                    alt={section.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors text-gray-900 dark:text-white">
                    {section.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 leading-relaxed">
                    {section.description}
                  </p>
                  <span className="text-primary font-medium text-sm group-hover:underline">
                    {t("explore")}
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Additional Context */}
        <div className="mt-16 max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            {t("philosophy.title")}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {t("philosophy.description")}
          </p>
        </div>
      </Section>
      <MetadataLDJSON jsonLd={await jsonLd()} />
    </>
  );
}
