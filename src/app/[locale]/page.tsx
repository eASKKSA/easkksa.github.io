import Section from "@/components/section";
import FeatureCard from "@/components/feature-card";
import { PageAnimationWrapper } from "@/components/page-animation-wrapper";
import { Metadata } from "next";

const features = [
  {
    id: "tradition",
    title: "Tradição Milenar",
    description:
      "Karate Shotokan autêntico com linhagem direta do Japão e técnicas tradicionais preservadas.",
    icon: "🥋",
  },
  {
    id: "instructors",
    title: "Mestres Qualificados",
    description:
      "Instrutores com certificação internacional SKI e décadas de experiência.",
    icon: "👨‍🏫",
  },
  {
    id: "community",
    title: "Todas as Idades",
    description:
      "Turmas especializadas para crianças, jovens e adultos com metodologia adaptada.",
    icon: "👥",
  },
];

const schedules = [
  {
    day: "Segunda a Sexta",
    time: "19h30 - 20h30",
    level: "Crianças (-12 anos)",
  },
  {
    day: "Segunda a Sexta",
    time: "20h30 - 21h30",
    level: "Adultos (+12 anos)",
  },
];

export async function generateMetadata(): Promise<Metadata> {
  return {
    // --- Basic Metadata ---
    keywords: [
      "Karate",
      "Shotokan",
      "ASKKSA",
      "Artes Marciais",
      "Dojo",
      "Funchal",
      "Madeira",
      "Karate para Crianças",
      "Karate para Adultos",
    ],
  };
}

export default async function Page() {
  return (
    <PageAnimationWrapper>
      <Section className="relative text-center rounded-3xl p-12 md:p-16 overflow-hidden backdrop-blur-sm border dark:bg-gradient-to-r dark:from-[#222]/90 dark:via-[#2a2a2a]/80 dark:to-[#222]/90 dark:border-gray-700/50 bg-gradient-to-r from-white/90 via-gray-50/80 to-white/90 border-gray-200/50">
        <h1>
          ASKKSA{" "}
          <span className="block text-primary text-2xl md:text-3xl lg:text-5xl mt-2">
            Associação Shotokan Kokusai Karaté Santo António
          </span>
        </h1>

        <p
          className={`text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed dark:text-gray-200 text-gray-700`}
        >
          Tradição, disciplina e excelência no Karate Shotokan. Descubra a força
          interior através da arte marcial milenar.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="bg-[#a4262c] hover:bg-[#8b1e23] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 focus:ring-4 focus:ring-[#a4262c]/50 shadow-lg">
            Aula Experimental Gratuita
          </button>
          <button
            className={`border-2 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 focus:ring-4 shadow-lg dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-[#222] dark:focus:ring-white/50 border-[#222] text-[#222] hover:bg-[#222] hover:text-white focus:ring-[#222]/50`}
          >
            Saiba Mais
          </button>
        </div>

        {/* Decorative elements with your colors */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-[#a4262c]/20 rounded-full -translate-x-16 -translate-y-16" />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#a4262c]/10 rounded-full translate-x-24 translate-y-24" />
      </Section>

      <Section>
        <div className="text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl font-bold mb-6 font-display text-white drop-shadow-[0_1.5px_1.5px_rgba(164,38,44,0.8)]`}
          >
            Por que escolher a ASKKSA?
          </h2>
          <p
            className={`text-xl max-w-3xl mx-auto text-gray-100 drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.8)]`}
          >
            Mais de 30 anos formando karatekas com os mais altos padrões de
            qualidade
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={feature.id} feature={feature} index={index} />
          ))}
        </div>
      </Section>
      <Section>
        <div className="bg-gradient-to-br from-[#a4262c] to-[#741b1f] rounded-3xl p-8 md:p-12 text-white shadow-2xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">
              Horários de Treino
            </h2>
            <p className="text-xl opacity-90">
              Encontre o horário perfeito para sua jornada no Karate
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {schedules.map((schedule, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300 border border-white/10"
              >
                <h3 className="text-xl font-bold mb-2">{schedule.level}</h3>
                <p className="text-lg mb-1">{schedule.day}</p>
                <p className="text-2xl font-bold text-yellow-300">
                  {schedule.time}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>
      <Section>
        <div
          className={`rounded-3xl p-8 md:p-12 backdrop-blur-sm border shadow-xl dark:bg-[#2a2a2a]/60 dark:border-gray-700/50 bg-white/60 border-gray-200/50`}
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2
                className={`text-3xl md:text-4xl font-bold mb-6 font-display dark:text-white text-[#222]`}
              >
                Visite nosso Dojo
              </h2>
              <p className={`text-xl mb-8 dark:text-gray-300 text-gray-600`}>
                Venha conhecer nossa estrutura e metodologia.
                <br />A primeira aula é sempre <b>gratuita</b>!
              </p>

              <div className="space-y-6">
                <ContactItem
                  icon="📍"
                  title="Localização"
                  content="Escola Horácio Bento Gouveia, 9004-524 Funchal"
                />
                <ContactItem
                  icon="📞"
                  title="Telefone"
                  content="(+351) 960 384 090"
                />
                <ContactItem
                  icon="✉️"
                  title="Email"
                  content="direcao@askksa.pt"
                />
              </div>
            </div>

            <div className="relative">
              {/* ✅ Google Maps Embed */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1764.4362909833633!2d-16.926502062456784!3d32.64929211268456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xc605fd22ec4ffb7%3A0x85b9d195f67c98c6!2sASKKSA%20-%20Associa%C3%A7%C3%A3o%20Shotokan%20Kokusai%20Karate%20Santo%20Ant%C3%B3nio!5e0!3m2!1spt-PT!2spt!4v1749303665510!5m2!1spt-PT!2spt"
                className="rounded-xl h-80 w-full shadow-lg border-0 dark:invert-75"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização da ASKKSA - Escola Horácio Bento Gouveia"
              />
            </div>
          </div>
        </div>
      </Section>
    </PageAnimationWrapper>
  );
}

const ContactItem: React.FC<{
  icon: string;
  title: string;
  content: string;
}> = ({ icon, title, content }) => {
  return (
    <div className="flex items-center gap-4">
      <span className="text-3xl">{icon}</span>
      <div>
        <h3 className={`font-bold text-lg dark:text-white text-[#222]`}>
          {title}
        </h3>
        <p className={`dark:text-gray-300 text-gray-600`}>{content}</p>
      </div>
    </div>
  );
};
