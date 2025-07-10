import Image, { StaticImageData } from "next/image";
import Container from "@/components/container";
import { getTranslations } from "next-intl/server";
import { jsonLd, metadata } from "./metadata";
import { MetadataLDJSON } from "@/app/metadata";

import jorgeFreitas from "@/assets/senseis/jorge_freitas.jpg";
import titoVelosa from "@/assets/senseis/tito_velosa.jpg";
import marisaGomes from "@/assets/senseis/marisa_gomes.jpg";
import rafaelJardim from "@/assets/senseis/rafael_jardim.jpg";

export const generateMetadata = metadata;

// --- MAIN PAGE COMPONENT ---
export default async function QuemSomosPage() {
  const t = await getTranslations("About");

  const instructors = [
    {
      id: "jorgeFreitas",
      name: t("instructors.jorgeFreitas.name"),
      image: jorgeFreitas,
      graduation: t("instructors.jorgeFreitas.graduation"),
      credentials: [
        t("instructors.jorgeFreitas.credential1"),
        t("instructors.jorgeFreitas.credential2"),
        t("instructors.jorgeFreitas.credential3"),
        t("instructors.jorgeFreitas.credential4"),
      ],
    },
    {
      id: "rafaelJardim",
      name: t("instructors.rafaelJardim.name"),
      image: rafaelJardim,
      graduation: t("instructors.rafaelJardim.graduation"),
      credentials: [
        t("instructors.rafaelJardim.credential1"),
        t("instructors.rafaelJardim.credential2"),
        t("instructors.rafaelJardim.credential3"),
        t("instructors.rafaelJardim.credential4"),
      ],
    },
    {
      id: "marisaGomes",
      name: t("instructors.marisaGomes.name"),
      image: marisaGomes,
      graduation: t("instructors.marisaGomes.graduation"),
      credentials: [
        t("instructors.marisaGomes.credential1"),
        t("instructors.marisaGomes.credential2"),
        t("instructors.marisaGomes.credential3"),
        t("instructors.marisaGomes.credential4"),
      ],
    },
    {
      id: "titoVelosa",
      name: t("instructors.titoVelosa.name"),
      image: titoVelosa,
      graduation: t("instructors.titoVelosa.graduation"),
      credentials: [
        t("instructors.titoVelosa.credential1"),
        t("instructors.titoVelosa.credential2"),
        t("instructors.titoVelosa.credential3"),
        t("instructors.titoVelosa.credential4"),
      ],
    },
  ];

  const dojos = [
    {
      id: "dojo1",
      name: t("dojos.dojo1.name"),
      mapUrl: t("dojos.dojo1.mapUrl"),
    },
    {
      id: "dojo2",
      name: t("dojos.dojo2.name"),
      mapUrl: t("dojos.dojo2.mapUrl"),
    },
  ];

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
        <h2 className="text-4xl md:text-5xl font-bold mb-6 font-display text-white drop-shadow-lg">
          {t("instructors.title")}
        </h2>
        <p className="text-xl max-w-3xl mx-auto text-gray-100 drop-shadow-md mb-12 md:mb-16">
          {t("instructors.subtitle")}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {instructors.map((instructor) => (
            <InstructorCard key={instructor.name} instructor={instructor} />
          ))}
        </div>
      </Container>

      {/* Dojos Section */}
      <Container blur className="text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 font-display text-black dark:text-white ">
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
      <MetadataLDJSON jsonLd={await jsonLd()} />
    </>
  );
}

// --- CHILD COMPONENTS ---
const InstructorCard = ({
  instructor,
}: {
  instructor: {
    id: string;
    name: string;
    image: StaticImageData;
    graduation: string;
    credentials: string[];
  };
}) => {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-2xl border transition-all duration-300 dark:border-gray-700/50 dark:bg-[#2a2a2a]/60 hover:dark:border-[#a4262c] hover:dark:bg-[#222]/80 border-gray-200/50 bg-white/60 hover:border-[#a4262c] hover:bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transform hover:-translate-y-2">
      <div className="relative w-32 h-32 mb-4">
        <Image
          src={instructor.image}
          alt={`Foto de ${instructor.name}`}
          fill
          className="rounded-full object-cover border-4 dark:border-primary/50 border-gray-300"
          sizes="(max-width: 768px) 100vw, 128px"
        />
      </div>
      <h3 className="text-xl font-bold mb-2 dark:text-white text-[#222]">
        {instructor.name}
      </h3>
      <p className="text-sm text-primary font-extrabold mb-2">
        {instructor.graduation}
      </p>
      <ul className="space-y-1 text-sm dark:text-gray-300 text-gray-600">
        {instructor.credentials.map((cred) => (
          <li key={cred}>✓ {cred}</li>
        ))}
      </ul>
    </div>
  );
};

const DojoCard = ({
  dojo,
}: {
  dojo: {
    id: string;
    name: string;
    mapUrl: string;
  };
}) => {
  const cardClasses = [
    "flex flex-col overflow-hidden rounded-2xl border backdrop-blur-sm shadow-lg",
    "transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl",
    "border-gray-200/50 bg-white/60 hover:border-primary",
    "dark:border-gray-700/50 dark:bg-[#2a2a2a]/60 hover:dark:border-primary",
  ].join(" ");

  const iframeClasses = "rounded-xl h-80 w-full shadow-lg border-0";

  const titleClasses =
    "text-xl font-bold text-center text-[#222] dark:text-white p-6";

  return (
    <div className={cardClasses}>
      <iframe
        src={dojo.mapUrl}
        className={iframeClasses}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={dojo.name}
      />
      <h3 className={titleClasses}>{dojo.name}</h3>
    </div>
  );
};
