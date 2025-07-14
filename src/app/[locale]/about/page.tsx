import Image, { StaticImageData } from "next/image";
import Container from "@/components/container";
import { getTranslations } from "next-intl/server";
import { jsonLd, metadata } from "./metadata";
import { MetadataLDJSON } from "@/app/metadata";
import DojoMap from "@/components/dojo-map";

import jorgeFreitas from "@/assets/senseis/jorge_freitas.webp";
import titoVelosa from "@/assets/senseis/tito_velosa.webp";
import marisaGomes from "@/assets/senseis/marisa_gomes.webp";
import rafaelJardim from "@/assets/senseis/rafael_jardim.webp";

import andrePestana from "@/assets/black-belts/andre_pestana.webp";
import beatrizMartins from "@/assets/black-belts/beatriz_martins.webp";
import bernardoLopes from "@/assets/black-belts/bernardo_lopes.webp";
import fabioReis from "@/assets/black-belts/fabio_reis.webp";
import franciscoOrnelas from "@/assets/black-belts/francisco_ornelas.webp";
import goncaloPilco from "@/assets/black-belts/goncalo_pilco.webp";
import jessicaBaptista from "@/assets/black-belts/jessica_baptista.webp";
import joaoCasimiro from "@/assets/black-belts/joao_casimiro.webp";
import joaoPrioste from "@/assets/black-belts/joao_prioste.webp";
import joaoRodrigues from "@/assets/black-belts/joao_rodrigues.webp";
import julioHenriques from "@/assets/black-belts/julio_henriques.webp";
import leonorCoelho from "@/assets/black-belts/leonor_coelho.webp";
import luisBarros from "@/assets/black-belts/luis_barros.webp";
import marcioGouveia from "@/assets/black-belts/marcio_gouveia.webp";
import marcoAnjo from "@/assets/black-belts/marco_anjo.webp";
import nadjaPilco from "@/assets/black-belts/nadja_pilco.webp";
import natachaSilva from "@/assets/black-belts/natacha_silva.webp";
import nunoFernandes from "@/assets/black-belts/nuno_fernandes.webp";
import soraiaOliveira from "@/assets/black-belts/soraia_oliveira.webp";
import tiagoFreitas from "@/assets/black-belts/tiago_freitas.webp";

import askksaThumb from "@/assets/askksa_thumb.svg";

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
        t("instructors.jorgeFreitas.credential1", {
          startYear: 1987,
          years: 38,
        }),
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
        t("instructors.rafaelJardim.credential1", {
          startYear: 1992,
          years: 33,
        }),
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
        t("instructors.marisaGomes.credential1", {
          startYear: 2000,
          years: 25,
        }),
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
        t("instructors.titoVelosa.credential1", {
          startYear: 1995,
          years: 30,
        }),
        t("instructors.titoVelosa.credential2"),
        t("instructors.titoVelosa.credential3"),
        t("instructors.titoVelosa.credential4"),
      ],
    },
  ];

  const auxiliaryInstructors = [
    {
      id: "luisBarros",
      name: "Luís Barros",
      image: luisBarros,
      graduation: "3º Dan",
    },
    {
      id: "jessicaBaptista",
      name: "Jéssica Baptista",
      image: jessicaBaptista,
      graduation: "2º Dan",
    },
    {
      id: "marcioGouveia",
      name: "Márcio Gouveia",
      image: marcioGouveia,
      graduation: "2º Dan",
    },
    {
      id: "marcoAnjo",
      name: "Marco Anjo",
      image: marcoAnjo,
      graduation: "2º Dan",
    },
    {
      id: "fabioReis",
      name: "Fábio Reis",
      image: fabioReis,
      graduation: "1º Dan",
    },
  ];

  const dojos = [
    {
      id: "dojo1",
      name: t("dojos.dojo1.name"),
      mapUrl:
        "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1679.6881340004275!2d-16.9258261!3d32.6494299!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xc605fd22ec4ffb7%3A0x85b9d195f67c98c6!2sASKKSA%20-%20Associa%C3%A7%C3%A3o%20Shotokan%20Kokusai%20Karate%20Santo%20Ant%C3%B3nio!5e0!3m2!1sen!2spt!4v1749741610154!5m2!1sen!2spt",
    },
    {
      id: "dojo2",
      name: t("dojos.dojo2.name"),
      mapUrl:
        "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d839.7119896617946!2d-16.9409179!3d32.6634899!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xc605f234ec15fc9%3A0x7c97dfaa734fe732!2sJunta%20de%20Freguesia%20de%20Santo%20Ant%C3%B3nio!5e0!3m2!1spt-PT!2spt!4v1749741985599!5m2!1spt-PT!2spt",
    },
  ];

  const blackBelts = [
    {
      id: "soraiaOliveira",
      name: "Soraia Oliveira",
      image: soraiaOliveira,
      graduation: "2º Dan",
    },
    {
      id: "andrePestana",
      name: "André Pestana",
      image: andrePestana,
      graduation: "1º Dan",
    },
    {
      id: "beatrizMartins",
      name: "Beatriz Martins",
      image: beatrizMartins,
      graduation: "1º Dan",
    },
    {
      id: "bernardoLopes",
      name: "Bernardo Lopes",
      image: bernardoLopes,
      graduation: "1º Dan",
    },
    {
      id: "eltonCamacho",
      name: "Elton Camacho",
      image: askksaThumb,
      graduation: "1º Dan",
    },
    {
      id: "franciscoOrnelas",
      name: "Francisco Ornelas",
      image: franciscoOrnelas,
      graduation: "1º Dan",
    },
    {
      id: "goncaloPilco",
      name: "Gonçalo Pilco",
      image: goncaloPilco,
      graduation: "1º Dan",
    },
    {
      id: "joaoCasimiro",
      name: "João Casimiro",
      image: joaoCasimiro,
      graduation: "1º Dan",
    },
    {
      id: "joaoRodrigues",
      name: "João Rodrigues",
      image: joaoRodrigues,
      graduation: "1º Dan",
    },
    {
      id: "joaoPrioste",
      name: "João Prioste",
      image: joaoPrioste,
      graduation: "1º Dan",
    },
    {
      id: "julioHenriques",
      name: "Júlio Henriques",
      image: julioHenriques,
      graduation: "1º Dan",
    },
    {
      id: "leonorCoelho",
      name: "Leonor Coelho",
      image: leonorCoelho,
      graduation: "1º Dan",
    },
    {
      id: "nadjaPilco",
      name: "Nadja Pilco",
      image: nadjaPilco,
      graduation: "1º Dan",
    },
    {
      id: "natachaSilva",
      name: "Natacha Silva",
      image: natachaSilva,
      graduation: "1º Dan",
    },
    {
      id: "nunoFernandes",
      name: "Nuno Fernandes",
      image: nunoFernandes,
      graduation: "1º Dan",
    },
    {
      id: "pedroRoxo",
      name: "Pedro Roxo",
      image: askksaThumb,
      graduation: "1º Dan",
    },
    {
      id: "tiagoFreitas",
      name: "Tiago Freitas",
      image: tiagoFreitas,
      graduation: "1º Dan",
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
          {blackBelts.map((instructor) => (
            <BBCard key={instructor.name} blackBelt={instructor} />
          ))}
        </div>
      </Container>
      <MetadataLDJSON jsonLd={await jsonLd(t)} />
      <link
        rel="preconnect"
        href="https://maps.googleapis.com"
        crossOrigin="anonymous"
      />
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
    <div className="flex flex-col items-center text-center p-6 rounded-2xl border transition-all duration-300 dark:border-gray-700/50 dark:bg-[#2a2a2a]/60 hover:dark:border-primary hover:dark:bg-[#222]/80 border-gray-200/50 bg-white/60 hover:border-[#a4262c] hover:bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transform hover:-translate-y-2">
      <Image
        src={instructor.image}
        alt={`Foto de ${instructor.name}`}
        width={128}
        height={128}
        className="rounded-full object-cover border-4 dark:border-primary/50 border-gray-300 mb-4"
        sizes="(max-width: 768px) 100vw, 128px"
      />
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
      <DojoMap
        mapUrl={dojo.mapUrl}
        className={iframeClasses}
        name={dojo.name}
      />
      <h3 className={titleClasses}>{dojo.name}</h3>
    </div>
  );
};

const BBCard = ({
  blackBelt,
}: {
  blackBelt: {
    id: string;
    name: string;
    image: StaticImageData;
    graduation: string;
  };
}) => {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-2xl border transition-all duration-300 dark:border-gray-700/50 dark:bg-[#2a2a2a]/60 hover:dark:border-primary hover:dark:bg-[#222]/80 border-gray-200/50 bg-white/60 hover:border-primary hover:bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transform hover:-translate-y-2">
      <Image
        src={blackBelt.image}
        alt={`Foto de ${blackBelt.name}`}
        width={96}
        height={96}
        className="rounded-full object-cover border-4 dark:border-primary/50 border-gray-300 mb-4"
        sizes="(max-width: 768px) 100vw, 128px"
      />
      <h3 className="text-xl font-bold mb-2 dark:text-white text-[#222]">
        {blackBelt.name}
      </h3>
      <p className="text-sm text-primary font-extrabold mb-2">
        {blackBelt.graduation}
      </p>
    </div>
  );
};
