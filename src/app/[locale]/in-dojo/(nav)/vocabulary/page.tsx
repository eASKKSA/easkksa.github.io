import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Container from "@/components/container";

// --- METADATA ---
export const metadata: Metadata = {
  title: "Vocabulário Japonês | Termos Karaté | ASKKSA Shotokan Madeira",
  description:
    "Aprenda o vocabulário japonês essencial do Karaté Shotokan. Números, contadores e termos mais utilizados no dojo. ASKKSA Funchal, Madeira.",
  keywords: [
    "Vocabulário Japonês",
    "Termos Karaté",
    "Japonês Karaté",
    "Dojo",
    "Números Japonês",
    "ASKKSA",
    "Shotokan",
    "Funchal",
    "Madeira",
    "Hiragana",
    "Katakana",
    "Kanji",
  ],
};

// --- MAIN PAGE COMPONENT ---
export default async function VocabularyPage() {
  const t = await getTranslations("Vocabulary");

  return (
    <Container blur withBubbles as="article">
      <h1 className="text-center">{t("title")}</h1>
      <div className="grid md:grid-cols-2 gap-8 items-center py-6">
        <div className="relative h-64 md:h-88 rounded-lg overflow-hidden">
          <Image
            src="/askksa_logo.svg"
            alt="Vocabulário Japonês"
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
              className="flex items-center gap-3 px-3 py-2 rounded-lg dark:bg-primary/20"
            >
              <span className="font-bold text-primary w-8">{num}</span>
              <span className="text-gray-700 dark:text-gray-300">
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
              className="flex items-center gap-3 px-3 py-2 rounded-lg dark:bg-primary/20"
            >
              <span className="font-bold text-primary w-8">{num}</span>
              <span className="text-gray-700 dark:text-gray-300">
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
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-center italic">
          {t("otherCounters.subtitle")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].map((num) => (
            <div
              key={num}
              className="flex items-center gap-3 px-3 py-2 rounded-lg dark:bg-primary/20"
            >
              <span className="font-bold text-primary w-8">{num}</span>
              <span className="text-gray-700 dark:text-gray-300">
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
          {Object.entries({
            age: t("vocabulary.age"),
            aihanmi: t("vocabulary.aihanmi"),
            aikido: t("vocabulary.aikido"),
            ashi: t("vocabulary.ashi"),
            ashibarai: t("vocabulary.ashibarai"),
            atama: t("vocabulary.atama"),
            atemi: t("vocabulary.atemi"),
            awase: t("vocabulary.awase"),
            ayumi: t("vocabulary.ayumi"),
            barai: t("vocabulary.barai"),
            bo: t("vocabulary.bo"),
            bojutsu: t("vocabulary.bojutsu"),
            bokken: t("vocabulary.bokken"),
            bu: t("vocabulary.bu"),
            bushi: t("vocabulary.bushi"),
            budo: t("vocabulary.budo"),
            chi: t("vocabulary.chi"),
            chudan: t("vocabulary.chudan"),
            dachi: t("vocabulary.dachi"),
            dai: t("vocabulary.dai"),
            dan: t("vocabulary.dan"),
            do: t("vocabulary.do"),
            dojo: t("vocabulary.dojo"),
            embusen: t("vocabulary.embusen"),
            empi: t("vocabulary.empi"),
            fumi: t("vocabulary.fumi"),
            gasho: t("vocabulary.gasho"),
            gedan: t("vocabulary.gedan"),
            geri: t("vocabulary.geri"),
            gi: t("vocabulary.gi"),
            gonosen: t("vocabulary.gonosen"),
            gyaku: t("vocabulary.gyaku"),
            hajime: t("vocabulary.hajime"),
            hakama: t("vocabulary.hakama"),
            happo: t("vocabulary.happo"),
            hara: t("vocabulary.hara"),
            heiko: t("vocabulary.heiko"),
            henka: t("vocabulary.henka"),
            hidari: t("vocabulary.hidari"),
            hiji: t("vocabulary.hiji"),
            hikite: t("vocabulary.hikite"),
            hiza: t("vocabulary.hiza"),
            ho: t("vocabulary.ho"),
            horanokamae: t("vocabulary.horanokamae"),
            ippon: t("vocabulary.ippon"),
            ipponkumite: t("vocabulary.ipponkumite"),
            irimi: t("vocabulary.irimi"),
            jitsu: t("vocabulary.jitsu"),
            jiyu: t("vocabulary.jiyu"),
            jiyuipponkumite: t("vocabulary.jiyuipponkumite"),
            jiyukumite: t("vocabulary.jiyukumite"),
            jo: t("vocabulary.jo"),
            jodan: t("vocabulary.jodan"),
            joseki: t("vocabulary.joseki"),
            ju: t("vocabulary.ju"),
            judo: t("vocabulary.judo"),
            jukumite: t("vocabulary.jukumite"),
            kagi: t("vocabulary.kagi"),
            kake: t("vocabulary.kake"),
            kaishowaza: t("vocabulary.kaishowaza"),
            kakato: t("vocabulary.kakato"),
            kamae: t("vocabulary.kamae"),
            kamaete: t("vocabulary.kamaete"),
            kamiza: t("vocabulary.kamiza"),
            kara: t("vocabulary.kara"),
            karada: t("vocabulary.karada"),
            karatedo: t("vocabulary.karatedo"),
            kata: t("vocabulary.kata"),
            katana: t("vocabulary.katana"),
            keage: t("vocabulary.keage"),
            keiko: t("vocabulary.keiko"),
            kekomi: t("vocabulary.kekomi"),
            ken: t("vocabulary.ken"),
            kendo: t("vocabulary.kendo"),
            keri: t("vocabulary.keri"),
            ki: t("vocabulary.ki"),
            kiai: t("vocabulary.kiai"),
            kihon: t("vocabulary.kihon"),
            kime: t("vocabulary.kime"),
            kiritsu: t("vocabulary.kiritsu"),
            ko: t("vocabulary.ko"),
            kohai: t("vocabulary.kohai"),
            kokoro: t("vocabulary.kokoro"),
            kokyu: t("vocabulary.kokyu"),
            koshi: t("vocabulary.koshi"),
            kote: t("vocabulary.kote"),
            kumite: t("vocabulary.kumite"),
            kuzushi: t("vocabulary.kuzushi"),
            kyu: t("vocabulary.kyu"),
            kyusho: t("vocabulary.kyusho"),
            maai: t("vocabulary.maai"),
            mae: t("vocabulary.mae"),
            maki: t("vocabulary.maki"),
            makikomi: t("vocabulary.makikomi"),
            makiwara: t("vocabulary.makiwara"),
            mawashi: t("vocabulary.mawashi"),
            midale: t("vocabulary.midale"),
            migi: t("vocabulary.migi"),
            mokuso: t("vocabulary.mokuso"),
            morote: t("vocabulary.morote"),
            nagewaza: t("vocabulary.nagewaza"),
            neko: t("vocabulary.neko"),
            nobashi: t("vocabulary.nobashi"),
            nukite: t("vocabulary.nukite"),
            o: t("vocabulary.o"),
            okuri: t("vocabulary.okuri"),
            osae: t("vocabulary.osae"),
            otagai: t("vocabulary.otagai"),
            otoshi: t("vocabulary.otoshi"),
            randori: t("vocabulary.randori"),
            rei: t("vocabulary.rei"),
            reigi: t("vocabulary.reigi"),
            ritsurei: t("vocabulary.ritsurei"),
            ryo: t("vocabulary.ryo"),
            ryu: t("vocabulary.ryu"),
            sabaki: t("vocabulary.sabaki"),
            sai: t("vocabulary.sai"),
            samurai: t("vocabulary.samurai"),
            sanbonkumite: t("vocabulary.sanbonkumite"),
            sasae: t("vocabulary.sasae"),
            seiza: t("vocabulary.seiza"),
            sempai: t("vocabulary.sempai"),
            sennosen: t("vocabulary.sennosen"),
            sensei: t("vocabulary.sensei"),
            senseirei: t("vocabulary.senseirei"),
            senseitaishi: t("vocabulary.senseitaishi"),
            shihan: t("vocabulary.shihan"),
            shiho: t("vocabulary.shiho"),
            shikko: t("vocabulary.shikko"),
            shimoza: t("vocabulary.shimoza"),
            shimoseki: t("vocabulary.shimoseki"),
            shin: t("vocabulary.shin"),
            shinai: t("vocabulary.shinai"),
            shisei: t("vocabulary.shisei"),
            shizentai: t("vocabulary.shizentai"),
            sho: t("vocabulary.sho"),
            shomen: t("vocabulary.shomen"),
            shomenrei: t("vocabulary.shomenrei"),
            shomentaishi: t("vocabulary.shomentaishi"),
            shuto: t("vocabulary.shuto"),
            sokuto: t("vocabulary.sokuto"),
            soto: t("vocabulary.soto"),
            sumo: t("vocabulary.sumo"),
            sutemi: t("vocabulary.sutemi"),
            tai: t("vocabulary.tai"),
            taisabaki: t("vocabulary.taisabaki"),
            tanto: t("vocabulary.tanto"),
            tatami: t("vocabulary.tatami"),
            tate: t("vocabulary.tate"),
            te: t("vocabulary.te"),
            tettsui: t("vocabulary.tettsui"),
            to: t("vocabulary.to"),
            tobi: t("vocabulary.tobi"),
            tokui: t("vocabulary.tokui"),
            tokuiwaza: t("vocabulary.tokuiwaza"),
            tomarite: t("vocabulary.tomarite"),
            tomoe: t("vocabulary.tomoe"),
            tonfa: t("vocabulary.tonfa"),
            tori: t("vocabulary.tori"),
            tsuki: t("vocabulary.tsuki"),
            tsukuri: t("vocabulary.tsukuri"),
            uchi: t("vocabulary.uchi"),
            ude: t("vocabulary.ude"),
            uke: t("vocabulary.uke"),
            ukemi: t("vocabulary.ukemi"),
            ura: t("vocabulary.ura"),
            uraken: t("vocabulary.uraken"),
            uramawashi: t("vocabulary.uramawashi"),
            ushiro: t("vocabulary.ushiro"),
            wakizashi: t("vocabulary.wakizashi"),
            waza: t("vocabulary.waza"),
            yakosoku: t("vocabulary.yakosoku"),
            yame: t("vocabulary.yame"),
            yasume: t("vocabulary.yasume"),
            yoi: t("vocabulary.yoi"),
            yoko: t("vocabulary.yoko"),
            zanshin: t("vocabulary.zanshin"),
            zarei: t("vocabulary.zarei"),
            zempo: t("vocabulary.zempo"),
            zen1: t("vocabulary.zen1"),
            zen2: t("vocabulary.zen2"),
          }).map(([term, definition]) => (
            <div
              key={term}
              className="flex flex-col gap-1 px-3 py-2 rounded-lg dark:bg-primary/20"
            >
              <span className="font-bold text-primary capitalize">{term}</span>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {definition}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </Container>
  );
}
