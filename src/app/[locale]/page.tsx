import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import {
  LuArrowDownRight,
  LuArrowUpRight,
  LuClock3,
  LuMail,
  LuMapPin,
  LuPhone,
  LuShieldCheck,
  LuSparkles,
  LuUsers,
} from "react-icons/lu";
import { MetadataLDJSON } from "@/app/metadata";
import heroImage from "@/assets/in-dojo/Sensei_Seiza.jpeg";
import DojoMap from "@/components/dojo-map";
import FormTrial from "@/components/form-trial";
import TrackableLink from "@/components/trackable-link";
import { localizedText } from "@/lib/seo";
import { getFeatures, getSchedules } from "./data";
import { jsonLd, metadata, websiteSchema } from "./metadata";

export async function generateMetadata({
  params,
}: Readonly<{ params: Promise<{ locale: Locale }> }>): Promise<Metadata> {
  const { locale } = await params;
  return await metadata(locale);
}

export default async function Page({
  params,
}: Readonly<{ params: Promise<{ locale: Locale }> }>) {
  const { locale } = await params;
  const t = await getTranslations("Home");
  const orgT = await getTranslations("Organization");
  const trialT = await getTranslations("TrialForm");
  const ui = localizedText(locale, {
    "pt-PT": {
      eyebrow: "Karaté Shotokan · Funchal, Madeira",
      headline: "Respeito e Disciplina.",
      scheduleLink: "Ver horários",
      since: "Desde 2000",
      sinceDetail: "25+ anos de prática",
      dojos: "3 dojos",
      dojosDetail: "Funchal e Câmara de Lobos",
      ages: "Todas as idades",
      agesDetail: "Crianças, jovens e adultos",
      certified: "Ensino certificado",
      certifiedDetail: "FNK-P · SKIF Canada",
      methodKicker: "O método ASKKSA",
      methodTitle: "O treino começa no respeito.",
      methodIntro:
        "Ensinamos com rigor, preservamos a tradição e acompanhamos cada aluno ao seu ritmo.",
      scheduleKicker: "Treinar esta semana",
      scheduleNote: "Segunda a sexta · Dojo principal",
      scheduleCta: "Escolher estas aulas",
      visitKicker: "O primeiro passo",
      mapLabel: "Abrir no mapa",
      finalTitle: "Venha conhecer o nosso dojo.",
      finalText:
        "Participe em três aulas gratuitas, conheça os instrutores e descubra como treinamos.",
      reviewLabel: "Já treinou connosco? Deixe a sua avaliação",
    },
    en: {
      eyebrow: "Shotokan Karate · Funchal, Madeira",
      headline: "Respect and Discipline.",
      scheduleLink: "View schedule",
      since: "Since 2000",
      sinceDetail: "25+ years of practice",
      dojos: "3 dojos",
      dojosDetail: "Funchal and Câmara de Lobos",
      ages: "All ages",
      agesDetail: "Children, teens and adults",
      certified: "Certified teaching",
      certifiedDetail: "FNK-P · SKIF Canada",
      methodKicker: "The ASKKSA method",
      methodTitle: "Training begins with respect.",
      methodIntro:
        "We teach with rigour, preserve tradition and support every student at their own pace.",
      scheduleKicker: "Train this week",
      scheduleNote: "Monday to Friday · Main dojo",
      scheduleCta: "Choose these classes",
      visitKicker: "The first step",
      mapLabel: "Open in maps",
      finalTitle: "Come and visit our dojo.",
      finalText:
        "Join three free classes, meet the instructors and discover how we train.",
      reviewLabel: "Already trained with us? Leave a review",
    },
    es: {
      eyebrow: "Kárate Shotokan · Funchal, Madeira",
      headline: "Respeto y Disciplina.",
      scheduleLink: "Ver horarios",
      since: "Desde 2000",
      sinceDetail: "Más de 25 años de práctica",
      dojos: "3 dojos",
      dojosDetail: "Funchal y Câmara de Lobos",
      ages: "Todas las edades",
      agesDetail: "Niños, jóvenes y adultos",
      certified: "Enseñanza certificada",
      certifiedDetail: "FNK-P · SKIF Canada",
      methodKicker: "El método ASKKSA",
      methodTitle: "El entrenamiento empieza por el respeto.",
      methodIntro:
        "Enseñamos con rigor, conservamos la tradición y acompañamos a cada alumno a su ritmo.",
      scheduleKicker: "Entrenar esta semana",
      scheduleNote: "De lunes a viernes · Dojo principal",
      scheduleCta: "Elegir estas clases",
      visitKicker: "El primer paso",
      mapLabel: "Abrir en el mapa",
      finalTitle: "Ven a conocer nuestro dojo.",
      finalText:
        "Participa en tres clases gratuitas, conoce a los instructores y descubre cómo entrenamos.",
      reviewLabel: "¿Ya has entrenado con nosotros? Déjanos tu reseña",
    },
    fr: {
      eyebrow: "Karaté Shotokan · Funchal, Madère",
      headline: "Respect et Discipline.",
      scheduleLink: "Voir les horaires",
      since: "Depuis 2000",
      sinceDetail: "Plus de 25 ans de pratique",
      dojos: "3 dojos",
      dojosDetail: "Funchal et Câmara de Lobos",
      ages: "Tous les âges",
      agesDetail: "Enfants, adolescents et adultes",
      certified: "Enseignement certifié",
      certifiedDetail: "FNK-P · SKIF Canada",
      methodKicker: "La méthode ASKKSA",
      methodTitle: "L’entraînement commence par le respect.",
      methodIntro:
        "Nous enseignons avec rigueur, préservons la tradition et accompagnons chaque élève à son rythme.",
      scheduleKicker: "S’entraîner cette semaine",
      scheduleNote: "Du lundi au vendredi · Dojo principal",
      scheduleCta: "Choisir ces cours",
      visitKicker: "Le premier pas",
      mapLabel: "Ouvrir dans Maps",
      finalTitle: "Venez découvrir notre dojo.",
      finalText:
        "Participez à trois cours gratuits, rencontrez les instructeurs et découvrez notre façon de nous entraîner.",
      reviewLabel: "Vous vous êtes déjà entraîné avec nous ? Donnez votre avis",
    },
    ja: {
      eyebrow: "ショットカン空手 · フンシャル、マデイラ",
      headline: "礼節と規律。",
      scheduleLink: "稽古時間を見る",
      since: "2000年創立",
      sinceDetail: "25年以上の活動",
      dojos: "3つの道場",
      dojosDetail: "フンシャルとカマラ・デ・ロボス",
      ages: "幅広い年齢に対応",
      agesDetail: "子ども・青少年・成人",
      certified: "公認指導員による指導",
      certifiedDetail: "FNK-P · SKIF Canada",
      methodKicker: "ASKKSAの指導方針",
      methodTitle: "稽古は礼節から始まります。",
      methodIntro:
        "伝統を守りながら、一人ひとりの段階に合わせて丁寧に指導します。",
      scheduleKicker: "今週の稽古",
      scheduleNote: "月曜から金曜 · 本部道場",
      scheduleCta: "このクラスを選ぶ",
      visitKicker: "最初の一歩",
      mapLabel: "地図で開く",
      finalTitle: "道場を見学しませんか。",
      finalText:
        "3回の無料体験で、指導員や道場の雰囲気、稽古の進め方をご確認いただけます。",
      reviewLabel: "稽古に参加したことがありますか？ご感想をお寄せください",
    },
  });

  const trialLabels = {
    heading: trialT("heading"),
    description: trialT("description"),
    fullName: trialT("fullName"),
    age: trialT("age"),
    email: trialT("email"),
    phone: trialT("phone"),
    previousExperience: trialT("previousExperience"),
    yes: trialT("yes"),
    no: trialT("no"),
    submit: {
      submitting: trialT("submit.submitting"),
      button: trialT("submit.button"),
    },
  };
  const features = getFeatures(t, {
    tradition: <LuShieldCheck aria-hidden="true" />,
    instructors: <LuSparkles aria-hidden="true" />,
    community: <LuUsers aria-hidden="true" />,
  });
  const schedules = getSchedules(t);
  const currentYear = new Date().getFullYear();
  const organizationSchema = await jsonLd(orgT, locale);
  const siteSchema = await websiteSchema(locale);

  return (
    <>
      <section className="relative grid min-h-[calc(100svh-10rem)] items-center gap-10 overflow-hidden rounded-[2rem] bg-[#111] p-6 text-white shadow-2xl sm:p-10 lg:grid-cols-[1.05fr_.95fr] lg:p-14 xl:p-20">
        <div className="relative z-10 max-w-3xl animate-content-enter">
          <p className="mb-7 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-stone-300">
            <span className="h-px w-10 bg-primary" />
            {ui.eyebrow}
          </p>
          <h1 className="max-w-4xl text-white">{ui.headline}</h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-stone-300 sm:text-xl">
            {t("hero.title")}
          </p>
          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <FormTrial trial={t("buttons.trialClass")} labels={trialLabels} />
            <a
              href="#horarios"
              className="inline-flex min-h-12 items-center gap-2 rounded-full px-5 font-semibold text-white transition-colors duration-200 hover:bg-white/10"
            >
              {ui.scheduleLink}
              <LuArrowDownRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="relative min-h-[420px] overflow-hidden rounded-[1.6rem] border border-white/10 sm:min-h-[520px] lg:min-h-[650px]">
          <Image
            src={heroImage}
            alt={localizedText(locale, {
              "pt-PT": "Karateka em seiza",
              en: "Karateka in seiza",
              es: "Karateka en seiza",
              fr: "Karatékas en seiza",
              ja: "正座する空手家",
            })}
            fill
            priority
            fetchPriority="high"
            sizes="(max-width: 1024px) 100vw, 48vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/15" />
          <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between border-t border-white/25 pt-4 text-xs font-bold uppercase tracking-[0.18em] text-stone-200 sm:bottom-7 sm:left-7 sm:right-7">
            <span>ASKKSA</span>
            <span>空手道</span>
          </div>
        </div>
        <div className="pointer-events-none absolute -bottom-24 -left-24 size-72 rounded-full border-[62px] border-primary/15" />
      </section>

      <section
        aria-label={localizedText(locale, {
          "pt-PT": "Informação essencial sobre a ASKKSA",
          en: "Key facts about ASKKSA",
          es: "Información esencial sobre la ASKKSA",
          fr: "Informations essentielles sur l’ASKKSA",
          ja: "ASKKSAの基本情報",
        })}
        className="grid border-y border-black/10 sm:grid-cols-2 lg:grid-cols-4 dark:border-white/10"
      >
        {[
          [ui.since, ui.sinceDetail],
          [ui.dojos, ui.dojosDetail],
          [ui.ages, ui.agesDetail],
          [ui.certified, ui.certifiedDetail],
        ].map(([title, detail], index) => (
          <div
            key={title}
            className="border-black/10 px-5 py-8 sm:px-7 lg:border-r lg:last:border-r-0 dark:border-white/10"
          >
            <p className="font-display text-3xl font-bold uppercase tracking-tight">
              {title}
            </p>
            <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
              <span className="mr-2 font-display text-xs text-primary">
                {String(index + 1).padStart(2, "0")}
              </span>
              {detail}
            </p>
          </div>
        ))}
      </section>

      <section className="grid gap-12 lg:grid-cols-[.82fr_1.18fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="section-kicker">{ui.methodKicker}</p>
          <h2 className="text-balance font-display text-5xl font-bold leading-[.98] tracking-tight sm:text-6xl lg:text-7xl">
            {ui.methodTitle}
          </h2>
          <p className="mt-6 max-w-xl text-lg text-stone-600 dark:text-stone-300">
            {ui.methodIntro}
          </p>
        </div>
        <div className="divide-y divide-black/10 border-y border-black/10 dark:divide-white/10 dark:border-white/10">
          {features.map((feature, index) => (
            <article
              key={feature.id}
              className="viewport-reveal group grid gap-5 py-9 md:grid-cols-[4rem_1fr_auto] md:items-start md:py-12"
              data-viewport-reveal=""
              data-reveal-state="idle"
            >
              <span className="font-display text-sm font-bold text-primary">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  {feature.title}
                </h3>
                <p className="mt-3 max-w-2xl text-stone-600 dark:text-stone-300">
                  {feature.description}
                </p>
              </div>
              <div className="grid size-12 place-items-center rounded-full border border-black/10 text-xl text-primary transition-colors duration-200 group-hover:border-primary dark:border-white/15">
                {feature.icon}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        id="horarios"
        className="overflow-hidden rounded-[2rem] bg-primary text-white shadow-[0_30px_100px_rgba(132,24,32,0.25)]"
      >
        <div className="grid lg:grid-cols-[.7fr_1.3fr]">
          <div className="flex flex-col justify-between border-b border-white/15 p-7 sm:p-10 lg:border-r lg:border-b-0 lg:p-14">
            <div>
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-white/70">
                {ui.scheduleKicker}
              </p>
              <h2 className="text-balance font-display text-5xl font-bold leading-none sm:text-6xl">
                {t("sections.schedule")}
              </h2>
            </div>
            <p className="mt-12 flex items-center gap-2 text-sm font-semibold text-white/75">
              <LuClock3 className="size-4" aria-hidden="true" />
              {ui.scheduleNote}
            </p>
          </div>
          <div className="divide-y divide-white/15">
            {schedules.map((schedule, index) => (
              <div
                key={schedule.level}
                className="grid gap-6 p-7 transition-colors duration-200 hover:bg-white/5 sm:grid-cols-[1fr_auto] sm:items-end sm:p-10"
              >
                <div>
                  <p className="mb-4 font-display text-sm text-gold">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="text-3xl font-bold sm:text-4xl">
                    {schedule.level}
                  </h3>
                  <p className="mt-2 text-white/70">{schedule.day}</p>
                </div>
                <p className="font-display text-4xl font-bold text-gold sm:text-5xl">
                  {schedule.time}
                </p>
              </div>
            ))}
            <div className="p-7 sm:p-10">
              <FormTrial
                trial={ui.scheduleCta}
                labels={trialLabels}
                variant="inverse"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="grid overflow-hidden rounded-[2rem] border border-black/10 bg-white/75 shadow-[0_24px_80px_rgba(28,20,16,0.08)] backdrop-blur-md lg:grid-cols-2 dark:border-white/10 dark:bg-[#1b1b1b]/88">
        <div className="p-7 sm:p-10 lg:p-14">
          <p className="section-kicker">{ui.visitKicker}</p>
          <h2 className="font-display text-5xl font-bold leading-none sm:text-6xl">
            {t("sections.visitDojo")}
          </h2>
          <p className="mt-6 max-w-lg text-lg text-stone-600 dark:text-stone-300">
            {t("hero.cta.text")} {t("hero.cta.trial")}
            <strong>{t("hero.cta.free")}</strong>
          </p>
          <div className="mt-9 divide-y divide-black/10 border-y border-black/10 dark:divide-white/10 dark:border-white/10">
            <ContactItem
              icon={<LuMapPin />}
              title={t("contact.location")}
              content={t("contact.address")}
              href="https://www.google.com/maps/place/ASKKSA+-+Associa%C3%A7%C3%A3o+Shotokan+Kokusai+Karate+Santo+Ant%C3%B3nio/@32.6494094,-16.9254716,17z"
            />
            <ContactItem
              icon={<LuPhone />}
              title={t("contact.phone")}
              content={t("contact.phoneNumber")}
              href={`tel:${t("contact.phoneNumber").replace(/[^+\d]/g, "")}`}
            />
            <ContactItem
              icon={<LuMail />}
              title={t("contact.email")}
              content="direcao@askksa.pt"
              href="mailto:direcao@askksa.pt"
            />
          </div>
        </div>
        <div className="relative min-h-[420px] border-t border-black/10 lg:border-l lg:border-t-0 dark:border-white/10">
          <DojoMap
            name="Localização da ASKKSA - Escola Horácio Bento Gouveia"
            loadingLabel={t("contact.loadMap")}
            mapUrl="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1679.6881340004275!2d-16.9258261!3d32.6494299!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xc605fd22ec4ffb7%3A0x85b9d195f67c98c6!2sASKKSA%20-%20Associa%C3%A7%C3%A3o%20Shotokan%20Kokusai%20Karate%20Santo%20Ant%C3%B3nio!5e0!3m2!1sen!2spt!4v1749741610154!5m2!1spt-PT!2spt"
            className="absolute inset-0 h-full w-full border-0 grayscale-[20%]"
          />
          <a
            href="https://www.google.com/maps/place/ASKKSA+-+Associa%C3%A7%C3%A3o+Shotokan+Kokusai+Karate+Santo+Ant%C3%B3nio/@32.6494094,-16.9254716,17z"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-5 right-5 inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white shadow-xl transition-colors hover:bg-primary"
          >
            {ui.mapLabel} <LuArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </section>

      <section className="relative overflow-hidden rounded-[2rem] bg-[#111] px-7 py-14 text-center text-white sm:px-10 sm:py-20">
        <p className="mx-auto mb-5 w-fit text-xs font-bold uppercase tracking-[0.22em] text-gold">
          ASKKSA · 2000—{currentYear}
        </p>
        <h2 className="text-balance mx-auto max-w-4xl font-display text-5xl font-bold leading-none sm:text-7xl">
          {ui.finalTitle}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-stone-300">
          {ui.finalText}
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <FormTrial trial={t("buttons.trialClass")} labels={trialLabels} />
          <TrackableLink
            href="https://search.google.com/local/writereview?placeid=ChIJt__ELtJfYAwRxph89pXRuYU"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center gap-2 rounded-full px-5 font-semibold text-stone-300 transition-colors duration-200 hover:bg-white/10 hover:text-white"
            gtmEvent="review_click"
          >
            {ui.reviewLabel}
            <LuArrowUpRight className="size-4" aria-hidden="true" />
          </TrackableLink>
        </div>
      </section>

      <MetadataLDJSON jsonLd={organizationSchema} />
      <MetadataLDJSON jsonLd={siteSchema} />
    </>
  );
}

function ContactItem({
  icon,
  title,
  content,
  href,
}: Readonly<{
  icon: ReactNode;
  title: string;
  content: string;
  href: string;
}>) {
  return (
    <TrackableLink
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 py-5"
      gtmEvent="contact_click"
      gtmParams={{ contact_method: title.toLowerCase() }}
    >
      <span className="grid size-11 place-items-center rounded-full bg-primary/10 text-xl text-primary">
        {icon}
      </span>
      <span>
        <span className="block text-xs font-bold uppercase tracking-[0.16em] text-stone-500">
          {title}
        </span>
        <span className="mt-1 block font-semibold">{content}</span>
      </span>
      <LuArrowUpRight
        className="size-4 text-stone-400 transition-colors duration-200 group-hover:text-primary"
        aria-hidden="true"
      />
    </TrackableLink>
  );
}
