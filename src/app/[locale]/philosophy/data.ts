import ethicalCodeImage from "@/assets/philosofy/codigo-etica-karate.jpg";
import principlesImage from "@/assets/philosofy/principios.gif";
import dojoKunImage from "@/assets/philosofy/dojo-kun.jpg";

export const getPhilosophySections = (t: TFunction): PhilosophySection[] => [
  {
    id: "bushido",
    title: t("sections.bushido.title"),
    description: t("sections.bushido.description"),
    image: ethicalCodeImage,
    href: "/philosophy/bushido",
    principlesCount: t("sections.bushido.principlesCount"),
  },
  {
    id: "nijuKun",
    title: t("sections.nijuKun.title"),
    description: t("sections.nijuKun.description"),
    image: principlesImage,
    href: "/philosophy/niju-kun",
    principlesCount: t("sections.nijuKun.principlesCount"),
  },
  {
    id: "dojoKun",
    title: t("sections.dojoKun.title"),
    description: t("sections.dojoKun.description"),
    image: dojoKunImage,
    href: "/philosophy/dojo-kun",
    principlesCount: t("sections.dojoKun.principlesCount"),
  },
];
