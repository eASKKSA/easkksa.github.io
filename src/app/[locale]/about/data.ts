// --- Image Imports ---

import askksaThumbSquare from "@/assets/askksa_thumb_square.jpeg";
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
import juanCamara from "@/assets/black-belts/juan_camara.webp";
import julioHenriques from "@/assets/black-belts/julio_henriques.webp";
import leonorCoelho from "@/assets/black-belts/leonor_coelho.webp";
import luisBarros from "@/assets/black-belts/luis_barros.webp";
import marcioGouveia from "@/assets/black-belts/marcio_gouveia.webp";
import marcoAnjo from "@/assets/black-belts/marco_anjo.webp";
import nadjaPilco from "@/assets/black-belts/nadja_pilco.webp";
import natachaSilva from "@/assets/black-belts/natacha_silva.webp";
import nunoFernandes from "@/assets/black-belts/nuno_fernandes.webp";
import pedroRoxo from "@/assets/black-belts/pedro_roxo.webp";
import soraiaOliveira from "@/assets/black-belts/soraia_oliveira.webp";
import tiagoFreitas from "@/assets/black-belts/tiago_freitas.webp";
import jorgeFreitas from "@/assets/senseis/jorge_freitas.webp";
import marisaGomes from "@/assets/senseis/marisa_gomes.webp";
import rafaelJardim from "@/assets/senseis/rafael_jardim.webp";
import titoVelosa from "@/assets/senseis/tito_velosa.webp";

// --- Data Functions ---
export const getInstructors = (t: TFunction): Instructor[] => [
  {
    id: "jorgeFreitas",
    name: t("instructors.jorgeFreitas.name"),
    image: jorgeFreitas,
    graduation: t("instructors.jorgeFreitas.graduation"),
    credentials: [
      t("instructors.jorgeFreitas.credential1", { startYear: 1987, years: 38 }),
      t("instructors.jorgeFreitas.credential2"),
      t("instructors.jorgeFreitas.credential3"),
      t("instructors.jorgeFreitas.credential4"),
    ],
    certifiedBy: ["skifCanada", "skif", "askkm"],
  },
  {
    id: "rafaelJardim",
    name: t("instructors.rafaelJardim.name"),
    image: rafaelJardim,
    graduation: t("instructors.rafaelJardim.graduation"),
    credentials: [
      t("instructors.rafaelJardim.credential1", { startYear: 1992, years: 33 }),
      t("instructors.rafaelJardim.credential2"),
      t("instructors.rafaelJardim.credential3"),
      t("instructors.rafaelJardim.credential4"),
    ],
    certifiedBy: ["skifCanada", "skif", "askkm"],
  },
  {
    id: "marisaGomes",
    name: t("instructors.marisaGomes.name"),
    image: marisaGomes,
    graduation: t("instructors.marisaGomes.graduation"),
    credentials: [
      t("instructors.marisaGomes.credential1", { startYear: 2000, years: 25 }),
      t("instructors.marisaGomes.credential2"),
      t("instructors.marisaGomes.credential3"),
      t("instructors.marisaGomes.credential4"),
    ],
    certifiedBy: ["skifCanada", "skif", "askkm"],
  },
  {
    id: "titoVelosa",
    name: t("instructors.titoVelosa.name"),
    image: titoVelosa,
    graduation: t("instructors.titoVelosa.graduation"),
    credentials: [
      t("instructors.titoVelosa.credential1", { startYear: 1995, years: 30 }),
      t("instructors.titoVelosa.credential2"),
      t("instructors.titoVelosa.credential3"),
      t("instructors.titoVelosa.credential4"),
    ],
    certifiedBy: ["skifCanada", "skif", "askkm"],
  },
];

export const getAuxiliaryInstructors = (): BlackBelt[] => [
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

export const getDojos = (t: TFunction): Dojo[] => [
  {
    id: "dojo1",
    name: t("dojos.dojo1.name"),
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1679.6881340004275!2d-16.9258261!3d32.6494299!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xc605fd22ec4ffb7%3A0x85b9d195f67c98c6!2sASKKSA%20-%20Associa%C3%A7%C3%A3o%20Shotokan%20Kokusai%20Karate%20Santo%20Ant%C3%B3nio!5e0!3m2!1sen!2spt!4v1749741610154!5m2!1sen!2spt",
    responsible: "Rafael Jardim",
    phone: "+351 960 384 090",
  },
  {
    id: "dojo2",
    name: t("dojos.dojo2.name"),
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d839.7119896617946!2d-16.9409179!3d32.6634899!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xc605f234ec15fc9%3A0x7c97dfaa734fe732!2sJunta%20de%20Freguesia%20de%20Santo%20Ant%C3%B3nio!5e0!3m2!1spt-PT!2spt!4v1749741985599!5m2!1spt-PT!2spt",
    responsible: "Marisa Gomes",
    phone: "+351 965 713 358",
  },
  {
    id: "dojo3",
    name: t("dojos.dojo3.name"),
    mapUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3359.1844573620524!2d-16.9752042228837!3d32.65453259023289!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xc605f121f097781%3A0x7b5a00bb7ea01d2a!2sR.%20Frei%20Pedro%20da%20Guarda%2036%2C%209300-066%20C%C3%A2mara%20de%20Lobos!5e0!3m2!1spt-PT!2spt!4v1752768422262!5m2!1spt-PT!2spt",
    responsible: "Jorge Freitas",
    phone: "+351 965 012 299",
  },
];

export const getBlackBelts = (): BlackBelt[] => [
  {
    id: "jorgeFreitas",
    name: "Jorge Freitas",
    image: jorgeFreitas,
    graduation: "6º Dan",
  },
  {
    id: "rafaelJardim",
    name: "Rafael Jardim",
    image: rafaelJardim,
    graduation: "5º Dan",
  },
  {
    id: "marisaGomes",
    name: "Marisa Gomes",
    image: marisaGomes,
    graduation: "5º Dan",
  },
  {
    id: "titoVelosa",
    name: "Tito Velosa",
    image: titoVelosa,
    graduation: "4º Dan",
  },
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
    image: askksaThumbSquare,
    graduation: "1º Dan",
    certifiedBy: "askkm",
  },
  {
    id: "fabioReis",
    name: "Fábio Reis",
    image: fabioReis,
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
    id: "joaoPrioste",
    name: "João Prioste",
    image: joaoPrioste,
    graduation: "1º Dan",
  },
  {
    id: "joaoRodrigues",
    name: "João Rodrigues",
    image: joaoRodrigues,
    graduation: "1º Dan",
  },
  {
    id: "juanCamara",
    name: "Juan Camara",
    image: juanCamara,
    graduation: "1º Dan",
    certifiedBy: "venezuela",
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
    image: pedroRoxo,
    graduation: "1º Dan",
  },
  {
    id: "tiagoFreitas",
    name: "Tiago Freitas",
    image: tiagoFreitas,
    graduation: "1º Dan",
  },
];
