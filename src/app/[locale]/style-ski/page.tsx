import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Container from "@/components/container";
import FeatureCard from "@/components/feature-card";

// --- ASSETS ---
import shotokanTopImage from "@/assets/style-ski/top.jpg";
import dachisImage from "@/assets/style-ski/dachis.gif";
import tecnicasPernasImage from "@/assets/style-ski/TecnicasPernas2.jpg";
import maosPesImage from "@/assets/style-ski/maospes.gif";

// --- METADATA ---
export const metadata: Metadata = {
  title:
    "Shotokan Katas - 26 Katas | Gichin Funakoshi | ASKKSA Shotokan Madeira",
  description:
    "Conheça os 26 katas do estilo Shotokan desenvolvidos pelo Sensei Gichin Funakoshi. Estudo e prática ao longo de uma vida de treino. ASKKSA Funchal, Madeira.",
  keywords: [
    "Shotokan Katas",
    "26 Katas",
    "Gichin Funakoshi",
    "Karaté Shotokan",
    "ASKKSA",
    "Heian",
    "Tekki",
    "Bassai",
    "Kanku",
    "Kata Tradicional",
    "Funchal",
    "Madeira",
  ],
};

// --- DATA ---
const shotokanKatas = [
  {
    key: "heian_shodan",
    name: "HEIAN SHODAN (平安初段)",
    meaning: "PAZ(hei) e TRANQUILIDADE(an) - Primeiro",
  },
  {
    key: "heian_nidan",
    name: "HEIAN NIDAN (平安二段)",
    meaning: "PAZ e TRANQUILIDADE - Segundo",
  },
  {
    key: "heian_sandan",
    name: "HEIAN SANDAN (平安三段)",
    meaning: "PAZ e TRANQUILIDADE - Terceiro",
  },
  {
    key: "heian_yondan",
    name: "HEIAN YONDAN (平安四段)",
    meaning: "PAZ e TRANQUILIDADE - Quarto",
  },
  {
    key: "heian_godan",
    name: "HEIAN GODAN (平安五段)",
    meaning: "PAZ e TRANQUILIDADE - Quinto",
  },
  {
    key: "tekki_shodan",
    name: "TEKKI SHODAN (鉄騎初段)",
    meaning: "CAVALEIRO de FERRO (tetsu=ferro, Ki=cavaleiro) - Primeiro",
  },
  {
    key: "tekki_nidan",
    name: "TEKKI NIDAN (鉄騎二段)",
    meaning: "CAVALEIRO de FERRO - Segundo",
  },
  {
    key: "tekki_sandan",
    name: "TEKKI SANDAN (鉄騎三段)",
    meaning: "CAVALEIRO de FERRO - Terceiro",
  },
  {
    key: "bassai_dai",
    name: "BASSAI DAÌ (披塞大)",
    meaning: "ROMPER a FORTALEZA - Longo",
  },
  {
    key: "kanku_dai",
    name: "KANKU DAÍ (観空大)",
    meaning: "CONTEMPLAR o CÉU (kan=olhar,ku=nada,vazio, céu) - Longo",
  },
  {
    key: "jitte",
    name: "jutte/JITTE (十手)",
    meaning: "DEZ MÃOS (ju-dez,te=mão)",
  },
  {
    key: "hangetsu",
    name: "HANGETSU (半月)",
    meaning: "MEIA LUA (han=metade, meio, guetsu=lua)",
  },
  {
    key: "enpi",
    name: "ENPI (燕飛)",
    meaning: "VÔO da ANDORINHA (en=pássaro, pi=vôo)",
  },
  {
    key: "gankaku",
    name: "GANKAKU (岩鶴)",
    meaning: "GROU SOBRE a ROCHA (gan=rocha, kaku=a garça sobre)",
  },
  {
    key: "jion",
    name: "JION (慈恩)",
    meaning:
      "AMOR e GRATIDÃO (ji=amor universal, delicado, gentil; on=amor, benevolência, bondade)",
  },
  {
    key: "bassai_sho",
    name: "BASSAI SHO (披塞小)",
    meaning: "ROMPER A FORTALEZA - Curto",
  },
  {
    key: "kanku_sho",
    name: "KANKU SHO (観空小)",
    meaning: "CONTEMPLAR o CÉU - Curto",
  },
  {
    key: "chinte",
    name: "CHINTE (珍手)",
    meaning: "MÃOS ESTRANHAS (chin=estranho, esquisito, te=mão)",
  },
  {
    key: "unsu",
    name: "UNSU (雲手)",
    meaning: "MÃOS DE NUVENS (un=nuvem, su=mão)",
  },
  {
    key: "sochin",
    name: "SOCHIN (壯鎭)",
    meaning:
      "PAZ INABALÁVEL (so=robusto, vigor, enérgico, chin=suprimir, ficar calmo)",
  },
  {
    key: "nijushiho",
    name: "NIJUSHIHO (二十四步)",
    meaning: "24 PASSOS/MOVIMENTOS",
  },
  {
    key: "gojushiho_dai",
    name: "GOJUSHIHO DAÍ (五十四歩大)",
    meaning: "54 PASSOS - Longo",
  },
  {
    key: "gojushiho_sho",
    name: "GOJUSHIHO SHO (五十四歩小)",
    meaning: "54 PASSOS - Curto",
  },
  {
    key: "meikyo",
    name: "MEIKYO (明鏡)",
    meaning: "ESPELHO LIMPO (mei=claro,kyo=espelho)",
  },
  {
    key: "jiin",
    name: "JIIN (慈陰)",
    meaning: "AMOR PROTECÇÃO (ji=amor universal, delicado, gentil, in=sombra)",
  },
  {
    key: "wankan",
    name: "WANKAN (王冠)",
    meaning: "COROAÇÃO DO REI (wan=rei, Kan=corvo)",
  },
];

// --- MAIN PAGE COMPONENT ---
export default async function ShotokanKatasPage() {
  const t = await getTranslations("ShotokanKatas");

  return (
    <Container withBubbles blur as="article">
      <h1 className="text-center">{t("title")}</h1>
      <div className="max-w-3xl mx-auto mb-8">
        <Image
          src={shotokanTopImage}
          alt="Shotokan Karate-Do International Federation"
          className="rounded-lg shadow-lg mx-auto mb-6"
          width={600}
          height={200}
          priority
        />
      </div>
      <p className="text-xl mb-6">{t("introduction")}</p>
      <p className="text-lg mb-6">{t("description")}</p>

      {/* Katas Grid */}
      <h2 className="text-3xl font-bold text-center mb-8">Katas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {shotokanKatas.map((kata) => (
          <FeatureCard
            key={kata.key}
            feature={{
              id: kata.key,
              title: kata.name,
              description: kata.meaning,
              icon: <span className="text-3xl"></span>,
            }}
          />
        ))}
      </div>

      {/* Technical Images Section */}
      <h2 className="text-3xl font-bold text-center mb-8">
        Técnicas Fundamentais
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="text-center">
          <Image
            src={dachisImage}
            alt="Posições (Dachi) do Karaté Shotokan"
            className="rounded-lg shadow-lg mx-auto mb-4"
            width={400}
            height={500}
            priority
          />
          <h3 className="text-xl font-semibold">Posições (Dachi)</h3>
          <p>Fundamentos das posições do Karaté Shotokan</p>
        </div>
        <div className="text-center">
          <Image
            src={tecnicasPernasImage}
            alt="Técnicas de Pernas do Karaté Shotokan"
            className="rounded-lg shadow-lg mx-auto mb-4"
            width={400}
            height={500}
            priority
          />
          <h3 className="text-xl font-semibold">Técnicas de Pernas</h3>
          <p>Chutes e técnicas de pernas fundamentais</p>
        </div>
        <div className="text-center md:col-span-2 lg:col-span-1">
          <Image
            src={maosPesImage}
            alt="Técnicas de Mãos e Pés do Karaté Shotokan"
            className="rounded-lg shadow-lg mx-auto mb-4"
            width={400}
            height={500}
            priority
          />
          <h3 className="text-xl font-semibold">Mãos e Pés</h3>
          <p>Formas de mãos e técnicas de pés</p>
        </div>
      </div>
    </Container>
  );
}
