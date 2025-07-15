import Container from "@/components/container";
import { getTranslations } from "next-intl/server";
import { jsonLd, metadata } from "./metadata";
import { MetadataLDJSON } from "@/app/metadata";
import {
  getInstructors,
  getAuxiliaryInstructors,
  getBlackBelts,
  getDojos,
} from "./data";
import InstructorCard from "@/components/instructor-card";
import BBCard from "@/components/bb-card";
import DojoCard from "@/components/dojo-card";
import { Metadata } from "next";

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
      <Container blur withBubbles className="text-center">
        <h1>{t("title")}</h1>
        <p className="text-lg md:text-xl max-w-4xl mx-auto leading-relaxed dark:text-gray-200 text-gray-700">
          {t("description")}
        </p>
      </Container>

      {/* Instructors Section */}
      <Container className="text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
          {t("instructors.title")}
        </h2>
        <p className="text-xl max-w-3xl mx-auto text-gray-100 drop-shadow-md mb-12 md:mb-16">
          {t("instructors.subtitle")}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 mb-8 lg:grid-cols-4 gap-8">
          {instructors.map((instructor) => (
            <InstructorCard key={instructor.name} instructor={instructor} />
          ))}
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-white">
          {t("auxiliaryInstructors")}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mt-4">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 md:mt-16">
          {dojos.map((dojo) => (
            <DojoCard key={dojo.name} dojo={dojo} />
          ))}
        </div>
      </Container>
      <Container className="text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
          {t("hallBlackBelts.title")}
        </h2>
        <p className="text-xl max-w-3xl mx-auto text-gray-100 drop-shadow-md mb-12 md:mb-16">
          {t("hallBlackBelts.subtitle")}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {blackBelts.map((blackBelt) => (
            <BBCard key={blackBelt.name} blackBelt={blackBelt} />
          ))}
        </div>
      </Container>
      <MetadataLDJSON jsonLd={await jsonLd(t, locale)} />
      <link
        rel="preconnect"
        href="https://maps.googleapis.com"
        crossOrigin="anonymous"
      />
    </>
  );
}
