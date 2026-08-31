import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { MetadataLDJSON } from "@/app/metadata";
import Container from "@/components/container";
import { Link } from "@/i18n/navigation";
import { getInDojoSections } from "./data";
import { jsonLd, metadata } from "./metadata";

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
      <Container blur withBubbles initialAnimation>
        <h1 className="text-center">{t("title")}</h1>
        <p className="page-intro-gap mx-auto max-w-3xl text-center text-xl leading-relaxed text-stone-600 dark:text-stone-300">
          {t("introduction")}
        </p>
      </Container>

      <Container>
        <div className="mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {inDojoSections.map((section, index) => (
            <Link
              key={section.id}
              href={section.href}
              className="group rounded-[1.5rem] focus-visible:outline-offset-4"
            >
              <Container
                as="article"
                className="h-full overflow-hidden rounded-[1.5rem] border border-black/10 bg-white/78 shadow-[0_18px_55px_rgba(28,20,16,0.08)] backdrop-blur-md transition-all duration-200 group-hover:-translate-y-1 group-hover:border-primary/35 group-hover:shadow-[0_24px_70px_rgba(28,20,16,0.14)] dark:border-white/10 dark:bg-[#1b1b1b]/88"
              >
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={section.image}
                    alt={section.title}
                    fill
                    priority={index === 0}
                    fetchPriority={index === 0 ? "high" : undefined}
                    quality={60}
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) calc(100vw - 2rem), (max-width: 1200px) 50vw, 25vw"
                  />
                </div>
                <div className="p-6">
                  <h2 className="mb-3 text-3xl font-bold transition-colors group-hover:text-primary dark:text-white">
                    {section.title}
                  </h2>
                  <p className="mb-5 line-clamp-4 leading-relaxed text-stone-600 dark:text-stone-300">
                    {section.description}
                  </p>
                  <span className="text-sm font-bold uppercase tracking-[0.12em] text-primary">
                    {t("explore")}
                  </span>
                </div>
              </Container>
            </Link>
          ))}
        </div>

        {/* Additional Context */}
        <div className="mt-16 max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6 text-ink dark:text-white">
            {t("philosophy.title")}
          </h2>
          <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
            {t("philosophy.description")}
          </p>
        </div>
      </Container>
      <MetadataLDJSON jsonLd={await jsonLd(t, locale)} />
    </>
  );
}
