import { Metadata } from "next";
import Image from "next/image";
import { PageAnimationWrapper } from "@/components/page-animation-wrapper";
import Section from "@/components/section";

import jorgeFreitas from "@/assets/senseis/jorge_freitas.png";
import titoVelosa from "@/assets/senseis/tito_velosa.png";
import marisaGomes from "@/assets/senseis/marisa_gomes.png";
import rafaelJardim from "@/assets/senseis/rafael_jardim.png";

// --- METADATA ---
// Generates SEO-friendly metadata for the page.
export const metadata: Metadata = {
  title: "Quem Somos | ASKKSA",
  description:
    "Conheça a história da ASKKSA, os nossos instrutores qualificados e os dojos onde praticamos Karate Shotokan no Funchal, Madeira.",
  keywords: [
    "Quem Somos",
    "História ASKKSA",
    "Instrutores Karate",
    "Dojos Funchal",
    "ASKKSA",
    "Karate",
    "Shotokan",
    "Artes Marciais",
    "Madeira",
  ],
};

// --- DATA ---
// Data extracted from your original website content.
const instructors = [
  {
    name: "Sensei Jorge Freitas",
    image: jorgeFreitas,
    credentials: [
      "Graduação de 6º DAN",
      "Iniciou a prática em 1987",
      "Graduado pela SKIF Canada & SKIF",
      "Treinador de Karate Grau III (FNK-P)",
      "Árbitro B (FNK-P)",
    ],
  },
  {
    name: "Sensei Tito Velosa",
    image: titoVelosa,
    credentials: [
      "Graduação de 4º DAN",
      "Iniciou a prática em 1995",
      "Graduado pela SKIF Canada & SKIF",
      "Treinador de Karate Grau II (FNK-P)",
      "Árbitro B (FNK-P)",
    ],
  },
  {
    name: "Sensei Marisa Gomes",
    image: marisaGomes,
    credentials: [
      "Graduação de 5º DAN",
      "15 anos de prática",
      "Graduado pela SKIF Canada & SKIF",
      "Treinador de Karate Grau II (FNK-P)",
      "Juiz de Karate (FNK-P)",
    ],
  },
  {
    name: "Sensei Rafael Jardim",
    image: rafaelJardim,
    credentials: [
      "Graduação de 5º DAN",
      "Iniciou a prática em 1992",
      "Graduado pela SKIF Canada & ASKKM",
      "Treinador de Karate Grau I (FNK-P)",
      "Árbitro B (FNK-P)",
    ],
  },
];

const dojos = [
  {
    name: "Dojo ASKKSA - Escola Horácio Bento Gouveia",
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1679.6881340004275!2d-16.9258261!3d32.6494299!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xc605fd22ec4ffb7%3A0x85b9d195f67c98c6!2sASKKSA%20-%20Associa%C3%A7%C3%A3o%20Shotokan%20Kokusai%20Karate%20Santo%20Ant%C3%B3nio!5e0!3m2!1sen!2spt!4v1749741610154!5m2!1sen!2spt",
  },
  {
    name: "Dojo ASKKSA - Junta de Freguesia de Santo António",
    image: "/images/dojo-santo-antonio.png", // Recommended: store images locally
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d839.7119896617946!2d-16.9409179!3d32.6634899!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xc605f234ec15fc9%3A0x7c97dfaa734fe732!2sJunta%20de%20Freguesia%20de%20Santo%20Ant%C3%B3nio!5e0!3m2!1spt-PT!2spt!4v1749741985599!5m2!1spt-PT!2spt",
  },
];

// --- MAIN PAGE COMPONENT ---
export default async function QuemSomosPage() {
  return (
    <PageAnimationWrapper>
      {/* Hero Section */}
      <Section>
        <div className="relative text-center rounded-3xl p-12 md:p-16 overflow-hidden backdrop-blur-sm border dark:bg-gradient-to-r dark:from-[#222]/90 dark:via-[#2a2a2a]/80 dark:to-[#222]/90 dark:border-gray-700/50 bg-gradient-to-r from-white/90 via-gray-50/80 to-white/90 border-gray-200/50">
          <div className="relative z-10">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 font-display dark:text-white text-[#222]">
              Sobre a ASKKSA
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed dark:text-gray-200 text-gray-700">
              Conheça a nossa história, a equipa que nos move e os valores que
              defendemos na arte do Karate Shotokan.
            </p>
          </div>
          <div className="absolute top-0 left-0 w-32 h-32 bg-[#a4262c]/20 rounded-full -translate-x-16 -translate-y-16" />
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#a4262c]/10 rounded-full translate-x-24 translate-y-24" />
        </div>
      </Section>

      {/* Introduction Section */}
      <Section>
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-display dark:text-white text-[#222]">
            A Nossa História
          </h2>
          <p className="text-lg md:text-xl leading-relaxed dark:text-gray-300 text-gray-700">
            Foi em Abril do ano 2000 que se constituiu no Funchal a ASKKSA,
            Associação Shotokan Kokusai Karate de Santo António. O objectivo
            desta constituição era, além de relançar a modalidade a novos
            níveis, enquadrá-la no panorama legal e desportivo da Região
            Autónoma da Madeira. A Associação ASKKSA está filiada na FNK-P
            (Federação Nacional de Karate – Portugal) e na AKRAM (Associação de
            Karate da Região Autónoma da Madeira) e é reconhecida pela DRJD (
            Direcção Regional da Juventude e Desporto ).
          </p>
        </div>
      </Section>

      {/* Instructors Section */}
      <Section>
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-display text-white drop-shadow-[0_1.5px_1.5px_rgba(164,38,44,0.8)]">
            Uma Equipa de Elite
          </h2>
          <p className="text-xl max-w-3xl mx-auto text-gray-100 drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.8)]">
            A ASKKSA orgulha-se de ter uma equipa de instrutores altamente
            qualificada, com provas dadas e inúmeras formações nacionais e
            internacionais.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {instructors.map((instructor) => (
            <InstructorCard key={instructor.name} instructor={instructor} />
          ))}
        </div>
      </Section>

      {/* Dojos Section */}
      <Section>
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-display text-white drop-shadow-[0_1.5px_1.5px_rgba(164,38,44,0.8)]">
            Os Nossos Dojos
          </h2>
          <p className="text-xl max-w-3xl mx-auto text-gray-100 drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.8)]">
            Atualmente contamos com dois espaços de treino no Funchal e damos
            apoio técnico ao Clube Horários do Funchal.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {dojos.map((dojo) => (
            <DojoCard key={dojo.name} dojo={dojo} />
          ))}
        </div>
      </Section>
    </PageAnimationWrapper>
  );
}

// --- CHILD COMPONENTS ---
// These components help structure the page and can be moved to their own files.

const InstructorCard = ({
  instructor,
}: {
  instructor: (typeof instructors)[0];
}) => {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-2xl border transition-all duration-300 dark:border-gray-700/50 dark:bg-[#2a2a2a]/60 hover:dark:border-[#a4262c] hover:dark:bg-[#222]/80 border-gray-200/50 bg-white/60 hover:border-[#a4262c] hover:bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transform hover:-translate-y-2">
      <div className="relative w-32 h-32 mb-4">
        <Image
          src={instructor.image}
          alt={`Foto de ${instructor.name}`}
          fill
          className="rounded-full object-cover border-4 dark:border-gray-600 border-gray-300"
          sizes="(max-width: 768px) 100vw, 128px"
        />
      </div>
      <h3 className="text-xl font-bold mb-2 dark:text-white text-[#222]">
        {instructor.name}
      </h3>
      <ul className="space-y-1 text-sm dark:text-gray-300 text-gray-600">
        {instructor.credentials.map((cred) => (
          <li key={cred}>✓ {cred}</li>
        ))}
      </ul>
    </div>
  );
};

const DojoCard = ({ dojo }: { dojo: (typeof dojos)[0] }) => {
  return (
    <a
      href={dojo.mapUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block group"
    >
      <div className="flex flex-col overflow-hidden rounded-2xl border transition-all duration-300 dark:border-gray-700/50 dark:bg-[#2a2a2a]/60 hover:dark:border-[#a4262c] border-gray-200/50 bg-white/60 hover:border-[#a4262c] backdrop-blur-sm shadow-lg hover:shadow-xl transform hover:-translate-y-2">
        <div className="relative w-full h-56">
          <iframe
            src={dojo.mapUrl}
            className="rounded-xl h-80 w-full shadow-lg border-0 dark:invert-75"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={dojo.name}
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-center dark:text-white text-[#222]">
            {dojo.name}
          </h3>
        </div>
      </div>
    </a>
  );
};
