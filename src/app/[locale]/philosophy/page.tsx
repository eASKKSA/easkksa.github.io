import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import Container from "@/components/container";
import { jsonLd, metadata } from "./metadata";
import { MetadataLDJSON } from "@/app/metadata";
import { Metadata } from "next";
import { getPhilosophySections } from "@/app/[locale]/philosophy/data";

export async function generateMetadata({
  params,
}: Readonly<{
  params: Promise<{ locale: Locale }>;
}>): Promise<Metadata> {
  const { locale } = await params;
  return await metadata(locale);
}

export default async function PhilosophyPage({
  params,
}: Readonly<{
  params: Promise<{ locale: Locale }>;
}>) {
  const { locale } = await params;
  const t = await getTranslations("Philosophy");
  const philosophySections = getPhilosophySections(t);

  return (
    <>
      {/* Hero Section */}
      <Container blur withBubbles>
        <h1 className="text-5xl font-bold mb-8 text-gray-900 dark:text-white text-center">
          {t("title")}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed text-center">
          {t("introduction")}
        </p>
      </Container>

      <Container>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {philosophySections.map((section) => (
            <Link key={section.id} href={section.href} className="group">
              <Container
                as="article"
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl h-full border border-gray-200 dark:border-gray-700"
              >
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
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-4 leading-relaxed">
                    {section.description}
                  </p>
                  <span className="text-primary font-medium text-sm group-hover:underline">
                    {t("explore")}
                  </span>
                </div>
              </Container>
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
      </Container>
      <MetadataLDJSON jsonLd={await jsonLd(t, locale)} />
    </>
  );
}
