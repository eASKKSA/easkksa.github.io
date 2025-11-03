import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { MetadataLDJSON } from "@/app/metadata";
import askksaThumb from "@/assets/askksa_thumb.svg";
import Container from "@/components/container";
import { jsonLd, metadata } from "./metadata";

export const generateMetadata = metadata;

// --- MAIN PAGE COMPONENT ---
export default async function VocabularyPage() {
  const t = await getTranslations("Vocabulary");

  // Lista de termos do vocabulário
  const vocabularyTerms = [
    "age",
    "aihanmi",
    "aikido",
    "ashi",
    "ashibarai",
    "atama",
    "atemi",
    "awase",
    "ayumi",
    "barai",
    "bo",
    "bojutsu",
    "bokken",
    "bu",
    "bushi",
    "budo",
    "chi",
    "chudan",
    "dachi",
    "dai",
    "dan",
    "do",
    "dojo",
    "embusen",
    "empi",
    "fumi",
    "gasho",
    "gedan",
    "geri",
    "gi",
    "gonosen",
    "gyaku",
    "hajime",
    "hakama",
    "happo",
    "hara",
    "heiko",
    "henka",
    "hidari",
    "hiji",
    "hikite",
    "hiza",
    "ho",
    "horanokamae",
    "ippon",
    "ipponkumite",
    "irimi",
    "jitsu",
    "jiyu",
    "jiyuipponkumite",
    "jiyukumite",
    "jo",
    "jodan",
    "joseki",
    "ju",
    "judo",
    "jukumite",
    "kagi",
    "kake",
    "kaishowaza",
    "kakato",
    "kamae",
    "kamaete",
    "kamiza",
    "kara",
    "karada",
    "karatedo",
    "kata",
    "katana",
    "keage",
    "keiko",
    "kekomi",
    "ken",
    "kendo",
    "keri",
    "ki",
    "kiai",
    "kihon",
    "kime",
    "kiritsu",
    "ko",
    "kohai",
    "kokoro",
    "kokyu",
    "koshi",
    "kote",
    "kumite",
    "kuzushi",
    "kyu",
    "kyusho",
    "maai",
    "mae",
    "maki",
    "makikomi",
    "makiwara",
    "mawashi",
    "midale",
    "migi",
    "mokuso",
    "morote",
    "nagewaza",
    "neko",
    "nobashi",
    "nukite",
    "o",
    "okuri",
    "osae",
    "otagai",
    "otoshi",
    "randori",
    "rei",
    "reigi",
    "ritsurei",
    "ryo",
    "ryu",
    "sabaki",
    "sai",
    "samurai",
    "sanbonkumite",
    "sasae",
    "seiza",
    "sempai",
    "sennosen",
    "sensei",
    "senseirei",
    "senseitaishi",
    "shihan",
    "shiho",
    "shikko",
    "shimoza",
    "shimoseki",
    "shin",
    "shinai",
    "shisei",
    "shizentai",
    "sho",
    "shomen",
    "shomenrei",
    "shomentaishi",
    "shuto",
    "sokuto",
    "soto",
    "sumo",
    "sutemi",
    "tai",
    "taisabaki",
    "tanto",
    "tatami",
    "tate",
    "te",
    "tettsui",
    "to",
    "tobi",
    "tokui",
    "tokuiwaza",
    "tomarite",
    "tomoe",
    "tonfa",
    "tori",
    "tsuki",
    "tsukuri",
    "uchi",
    "ude",
    "uke",
    "ukemi",
    "ura",
    "uraken",
    "uramawashi",
    "ushiro",
    "wakizashi",
    "waza",
    "yakosoku",
    "yame",
    "yasume",
    "yoi",
    "yoko",
    "zanshin",
    "zarei",
    "zempo",
    "zen1",
    "zen2",
  ];

  return (
    <>
      <Container blur withBubbles as="article">
        <h1 className="text-center">{t("title")}</h1>
        <div className="grid md:grid-cols-2 gap-8 items-center py-6">
          <Image
            src={askksaThumb}
            alt="ASKKSA - Vocabulário Japonês do Karaté"
            height={500}
            className="object-contain rounded-xl shadow-lg mx-auto"
            priority
          />
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
            {t("numbers.title")}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              "1",
              "2",
              "3",
              "4",
              "5",
              "6",
              "7",
              "8",
              "9",
              "10",
              "20",
              "30",
              "100",
            ].map((num) => (
              <div
                key={num}
                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700"
              >
                <span className="font-bold text-blue-600 dark:text-blue-400 w-8 text-center">
                  {num}
                </span>
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  {t(`numbers.${num}`)}
                </span>
              </div>
            ))}
          </div>
        </Container>

        <Container>
          <h2 className="text-3xl font-bold text-center mb-8">
            {t("counters.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {["1", "2", "3", "4", "5"].map((num) => (
              <div
                key={num}
                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700"
              >
                <span className="font-bold text-green-600 dark:text-green-400 w-8 text-center">
                  {num}
                </span>
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  {t(`counters.${num}`)}
                </span>
              </div>
            ))}
          </div>
        </Container>

        <Container>
          <h2 className="text-3xl font-bold text-center mb-8">
            {t("otherCounters.title")}
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-center italic bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
            {t("otherCounters.subtitle")}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].map((num) => (
              <div
                key={num}
                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700"
              >
                <span className="font-bold text-orange-600 dark:text-orange-400 w-8 text-center">
                  {num}
                </span>
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  {t(`otherCounters.${num}`)}
                </span>
              </div>
            ))}
          </div>
        </Container>

        <Container>
          <h2 className="text-3xl font-bold text-center mb-8">
            {t("vocabulary.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {vocabularyTerms.map((term) => (
              <div
                key={term}
                className="flex flex-col gap-2 px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
              >
                <span className="font-bold text-primary capitalize text-lg">
                  {term}
                </span>
                <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t(`vocabulary.${term}`)}
                </span>
              </div>
            ))}
          </div>
        </Container>

        <Container>
          <div className="text-center p-8 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg">
            <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
              {t("writingSystems.title")}
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <h4 className="font-semibold text-primary mb-2">
                  {t("writingSystems.hiragana.title")}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t("writingSystems.hiragana.description")}
                </p>
              </div>
              <div className="text-center">
                <h4 className="font-semibold text-primary mb-2">
                  {t("writingSystems.katakana.title")}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t("writingSystems.katakana.description")}
                </p>
              </div>
              <div className="text-center">
                <h4 className="font-semibold text-primary mb-2">
                  {t("writingSystems.kanji.title")}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t("writingSystems.kanji.description")}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Container>
      <MetadataLDJSON jsonLd={await jsonLd()} />
    </>
  );
}
