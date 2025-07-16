import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Container from "@/components/container";
import { jsonLd, metadata } from "./metadata";
import { MetadataLDJSON } from "@/app/metadata";
import { Link } from "@/i18n/navigation";
import { getInDojoSections } from "./data";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: Readonly<{
  params: Promise<{ locale: Locale }>;
}>): Promise<Metadata> {
  const { locale } = await params;
  return await metadata(locale);
}

export default async function InDojoPage({
  params,
}: Readonly<{
  params: Promise<{ locale: Locale }>;
}>) {
  const { locale } = await params;
  const t = await getTranslations("InDojo");
  const inDojoSections = getInDojoSections(t);

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
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mx-auto">
          {inDojoSections.map((section) => (
            <Link key={section.id} href={section.href} className="group">
              <Container
                as="article"
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full border border-gray-200 dark:border-gray-700"
              >
                <div className="relative h-48">
                  <Image
                    src={section.image}
                    alt={section.title}
                    fill
                    priority
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
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
            {t("philosophy.title")}
          </h2>
          <p className="text-gray-300 leading-relaxed">
            {t("philosophy.description")}
          </p>
        </div>
      </Container>
      <MetadataLDJSON jsonLd={await jsonLd(t, locale)} />
    </>
  );
}
