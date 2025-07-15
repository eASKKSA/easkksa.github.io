import senseiSeizaImage from "@/assets/in-dojo/Sensei_Seiza.jpeg";
import gradesImage from "@/assets/in-dojo/graduacoes.jpg";
import askksaThumb from "@/assets/askksa_thumb.svg";

export const getInDojoSections = (t: TFunction): InDojoSection[] => [
  {
    id: "salutation",
    title: t("sections.salutation.title"),
    description: t("sections.salutation.description"),
    image: senseiSeizaImage,
    href: "/in-dojo/salutation",
  },
  {
    id: "rules",
    title: t("sections.rules.title"),
    description: t("sections.rules.description"),
    image: askksaThumb,
    href: "/in-dojo/rules",
  },
  {
    id: "vocabulary",
    title: t("sections.vocabulary.title"),
    description: t("sections.vocabulary.description"),
    image: askksaThumb,
    href: "/in-dojo/vocabulary",
  },
  {
    id: "grades",
    title: t("sections.grades.title"),
    description: t("sections.grades.description"),
    image: gradesImage,
    href: "/in-dojo/grades",
  },
];
