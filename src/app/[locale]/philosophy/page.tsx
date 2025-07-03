import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import Section from "@/components/container";
import { jsonLd, metadata } from "./metadata";
import { MetadataLDJSON } from "@/app/metadata";

// --- ASSETS ---
import ethicalCodeImage from "@/assets/philosofy/codigo-etica-karate.jpg";
import principlesImage from "@/assets/philosofy/principios.gif";
import dojoKunImage from "@/assets/philosofy/dojo-kun.jpg";

export const generateMetadata = metadata;

// --- MAIN PAGE COMPONENT ---
export default async function PhilosophyPage() {
  const t = await getTranslations("Philosophy");

  // Data usando traduções
  const philosophySections = [
    {
      id: "bushido",
      title: t("sections.bushido.title"),
      description: t("sections.bushido.description"),
      image: ethicalCodeImage,
      href: "/philosophy/bushido" as const,
      principlesCount: t("sections.bushido.principlesCount"),
    },
    {
      id: "nijuKun",
      title: t("sections.nijuKun.title"),
      description: t("sections.nijuKun.description"),
      image: principlesImage,
      href: "/philosophy/niju-kun" as const,
      principlesCount: t("sections.nijuKun.principlesCount"),
    },
    {
      id: "dojoKun",
      title: t("sections.dojoKun.title"),
      description: t("sections.dojoKun.description"),
      image: dojoKunImage,
      href: "/philosophy/dojo-kun" as const,
      principlesCount: t("sections.dojoKun.principlesCount"),
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
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {philosophySections.map((section) => (
            <Link key={section.id} href={section.href} className="group">
              <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full border border-gray-200 dark:border-gray-700">
                <div className="relative h-48">
                  <Image
                    src={section.image}
                    alt={section.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                    {section.principlesCount}
                  </div>
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
          <h2 className="text-2xl font-bold mb-6 text-white">
            {t("importance.title")}
          </h2>
          <p className="text-gray-300 leading-relaxed">
            {t("importance.description")}
          </p>
        </div>
      </Section>
      <MetadataLDJSON jsonLd={await jsonLd()} />
    </>
  );
}
