import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Container from "@/components/container";

// --- ASSETS ---
import graduationsImage from "@/assets/in-dojo/graduacoes.jpg";

// --- METADATA ---
export const metadata: Metadata = {
  title: "Graduações Karaté | Sistema Kyu e Dan | ASKKSA Shotokan Madeira",
  description:
    "Conheça o sistema de graduações do Karaté Shotokan. Kyu, Dan, cores dos cintos e simbolismo. Sistema fundado por Jigoro Kano. ASKKSA Funchal, Madeira.",
  keywords: [
    "Graduações Karaté",
    "Sistema Kyu Dan",
    "Cintos Karaté",
    "Jigoro Kano",
    "Cores Cintos",
    "ASKKSA",
    "Shotokan",
    "Funchal",
    "Madeira",
    "Cinto Negro",
    "Graduação Karaté",
  ],
};

// --- MAIN PAGE COMPONENT ---
export default async function GraduationsPage() {
  const t = await getTranslations("Graduations");

  return (
    <Container blur withBubbles as="article">
      <h1 className="text-center">{t("title")}</h1>
      <div className="grid md:grid-cols-2 gap-8 items-center py-6">
        <div className="relative h-64 md:h-88 rounded-lg overflow-hidden">
          <Image
            src={graduationsImage}
            alt="Graduações Karaté"
            fill
            sizes="20-vw"
            className="object-contain"
            priority
          />
        </div>
        <div className="space-y-4">
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            {t("introduction")}
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            {t("description")}
          </p>
        </div>
      </div>

      <Container>
        <h2 className="text-3xl font-bold text-center mb-8">
          {t("system.title")}
        </h2>
        <div className="space-y-4">
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            • {t("system.founder")}
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            • {t("system.purpose")}
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            • {t("system.motivation")}
          </p>
        </div>
      </Container>

      <Container>
        <h2 className="text-3xl font-bold text-center mb-8">
          {t("symbolism.title")}
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
          {t("symbolism.description")}
        </p>
        <div className="space-y-4">
          <div className="flex items-center gap-4 px-4 py-3 rounded-lg dark:bg-primary/20">
            <div className="w-12 h-8 bg-white border-2 border-gray-300 rounded"></div>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {t("symbolism.white")}
            </p>
          </div>
          <div className="flex items-center gap-4 px-4 py-3 rounded-lg dark:bg-primary/20">
            <div className="w-12 h-8 bg-black rounded"></div>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {t("symbolism.black")}
            </p>
          </div>
        </div>
      </Container>

      <Container>
        <h2 className="text-3xl font-bold text-center mb-8">
          {t("colors.title")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-4 px-4 py-3 rounded-lg dark:bg-primary/20">
            <div className="w-12 h-8 bg-white border-2 border-gray-300 rounded"></div>
            <span className="text-gray-700 dark:text-gray-300">
              {t("colors.white")}
            </span>
          </div>
          <div className="flex items-center gap-4 px-4 py-3 rounded-lg dark:bg-primary/20">
            <div className="w-12 h-8 bg-yellow-400 rounded"></div>
            <span className="text-gray-700 dark:text-gray-300">
              {t("colors.yellow")}
            </span>
          </div>
          <div className="flex items-center gap-4 px-4 py-3 rounded-lg dark:bg-primary/20">
            <div className="w-12 h-8 bg-orange-500 rounded"></div>
            <span className="text-gray-700 dark:text-gray-300">
              {t("colors.orange")}
            </span>
          </div>
          <div className="flex items-center gap-4 px-4 py-3 rounded-lg dark:bg-primary/20">
            <div className="w-12 h-8 bg-green-500 rounded"></div>
            <span className="text-gray-700 dark:text-gray-300">
              {t("colors.green")}
            </span>
          </div>
          <div className="flex items-center gap-4 px-4 py-3 rounded-lg dark:bg-primary/20">
            <div className="w-12 h-8 bg-blue-500 rounded"></div>
            <span className="text-gray-700 dark:text-gray-300">
              {t("colors.blue")}
            </span>
          </div>
          <div className="flex items-center gap-4 px-4 py-3 rounded-lg dark:bg-primary/20">
            <div className="w-12 h-8 bg-amber-800 rounded"></div>
            <span className="text-gray-700 dark:text-gray-300">
              {t("colors.brown")}
            </span>
          </div>
          <div className="flex items-center gap-4 px-4 py-3 rounded-lg dark:bg-primary/20 md:col-span-2">
            <div className="w-12 h-8 bg-black rounded"></div>
            <span className="text-gray-700 dark:text-gray-300">
              {t("colors.black")}
            </span>
          </div>
        </div>
      </Container>

      <Container>
        <h2 className="text-3xl font-bold text-center mb-8">
          {t("kyu.title")}
        </h2>
        <div className="space-y-4">
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            • {t("kyu.description")}
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            • {t("kyu.order")}
          </p>
        </div>
      </Container>

      <Container>
        <h2 className="text-3xl font-bold text-center mb-8">
          {t("dan.title")}
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
          {t("dan.description")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 10 }, (_, i) => i + 1).map((dan) => (
            <div
              key={dan}
              className="flex items-center gap-3 px-4 py-3 rounded-lg dark:bg-primary/20"
            >
              <div className="w-12 h-8 bg-black rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">{dan}º</span>
              </div>
              <span className="text-gray-700 dark:text-gray-300">
                {t(`dan.${dan}`)}
              </span>
            </div>
          ))}
        </div>
      </Container>

      <Container>
        <h2 className="text-3xl font-bold text-center mb-8">
          {t("timeline.title")}
        </h2>
        <div className="space-y-4">
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            • {t("timeline.description")}
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            • {t("timeline.journey")}
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            • {t("timeline.mastery")}
          </p>
        </div>
      </Container>
    </Container>
  );
}
