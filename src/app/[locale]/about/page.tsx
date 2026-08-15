import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { MetadataLDJSON } from "@/app/metadata";
import BBCard from "@/components/bb-card";
import Container from "@/components/container";
import DojoCard from "@/components/dojo-card";
import InstructorCard from "@/components/instructor-card";
import {
  getAuxiliaryInstructors,
  getBlackBelts,
  getDojos,
  getInstructors,
} from "./data";
import { jsonLd, metadata } from "./metadata";

export async function generateMetadata({
  params,
}: Readonly<{
  params: Promise<{ locale: Locale }>;
}>): Promise<Metadata> {
  const { locale } = await params;
  return await metadata(locale);
}

export default async function QuemSomosPage({
  params,
}: Readonly<{
  params: Promise<{ locale: Locale }>;
}>) {
  const { locale } = await params;
  const t = await getTranslations("About");
  const instructors = getInstructors(t);
  const auxiliaryInstructors = getAuxiliaryInstructors();
  const dojos = getDojos(t);
  const blackBelts = getBlackBelts();

  return (
    <>
      {/* Hero Section */}
      <Container blur withBubbles className="text-center" initialAnimation>
        <h1>{t("title")}</h1>
        <p className="page-intro-gap mx-auto max-w-4xl text-left md:text-center text-lg leading-relaxed text-gray-700 md:text-xl dark:text-gray-200">
          {t("description")}
        </p>
      </Container>

      {/* Instructors Section */}
      <Container className="text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-ink dark:text-white">
          {t("instructors.title")}
        </h2>
        <p className="text-xl max-w-3xl mx-auto text-stone-600 dark:text-stone-300 mb-12 md:mb-16">
          {t("instructors.subtitle")}
        </p>
        <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {instructors.map((instructor) => (
            <InstructorCard key={instructor.name} instructor={instructor} />
          ))}
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-ink dark:text-white">
          {t("auxiliaryInstructors")}
        </h3>
        <div className="mt-4 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {auxiliaryInstructors.map((instructor) => (
            <BBCard key={instructor.name} blackBelt={instructor} />
          ))}
        </div>
      </Container>

      {/* Dojos Section */}
      <Container blur className="text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black dark:text-white">
          {t("dojos.title")}
        </h2>
        <p className="text-xl max-w-3xl mx-auto text-gray-700 dark:text-gray-200">
          {t("dojos.subtitle")}
        </p>
        <div className="mt-12 grid grid-cols-1 gap-6 md:mt-16 lg:grid-cols-3">
          {dojos.map((dojo) => (
            <DojoCard
              key={dojo.name}
              dojo={dojo}
              loadingMapLabel={t("dojos.loadMap")}
            />
          ))}
        </div>
      </Container>
      <Container className="text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-ink dark:text-white">
          {t("hallBlackBelts.title")}
        </h2>
        <p className="text-xl max-w-3xl mx-auto text-stone-600 dark:text-stone-300 mb-12 md:mb-16">
          {t("hallBlackBelts.subtitle")}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {blackBelts.map((blackBelt) => (
            <BBCard key={blackBelt.name} blackBelt={blackBelt} />
          ))}
        </div>
      </Container>
      <MetadataLDJSON jsonLd={await jsonLd(t, locale)} />
    </>
  );
}
