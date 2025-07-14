import Container from "@/components/container";
import FeatureCard from "@/components/feature-card";
import { GiKimono } from "react-icons/gi";
import { IoPeople, IoLocationSharp, IoMail } from "react-icons/io5";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import ProtectedEmail from "@/components/protected-email";
import { jsonLd, metadata } from "./metadata";
import { MetadataLDJSON } from "@/app/metadata";
import clsx from "clsx";
import FormTrial from "@/components/form-trial";

export const generateMetadata = metadata;

export default async function Page() {
  const t = await getTranslations("Home");
  const features = [
    {
      id: "tradition",
      title: t("features.tradition.title"),
      description: t("features.tradition.description"),
      icon: <GiKimono className="w-12 h-12" />,
    },
    {
      id: "instructors",
      title: t("features.instructors.title"),
      description: t("features.instructors.description"),
      icon: <FaPeopleGroup className="w-12 h-12" />,
    },
    {
      id: "community",
      title: t("features.community.title"),
      description: t("features.community.description"),
      icon: <IoPeople className="w-12 h-12" />,
    },
  ];

  const schedules = [
    {
      day: t("schedule.weekdays"),
      time: t("schedule.time1"),
      level: t("schedule.children"),
    },
    {
      day: t("schedule.weekdays"),
      time: t("schedule.time2"),
      level: t("schedule.adults"),
    },
  ];
  return (
    <>
      <Container blur withBubbles className="text-center">
        <h1>
          ASKKSA{" "}
          <span className="block text-primary text-2xl md:text-3xl lg:text-5xl mt-2">
            {t("title")}
          </span>
        </h1>

        <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed dark:text-gray-200 text-gray-700">
          {t("hero.title")}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <FormTrial trial={t("buttons.trialClass")} />
          <a
            href="https://search.google.com/local/writereview?placeid=ChIJt__ELtJfYAwRxph89pXRuYU"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-lg bg-white text-primary font-semibold shadow-md hover:bg-gray-100 transition"
          >
            {t("buttons.reviewUs", {
              defaultValue: "Already tried? Review us!",
            })}
          </a>
        </div>
      </Container>

      <Container className="text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
          {t("sections.whyChoose")}
        </h2>
        <p className="text-xl max-w-3xl mx-auto text-gray-100">
          {t("hero.experience")}
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {features.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </Container>

      <Container className="bg-gradient-to-br from-primary to-[#741b1f] rounded-3xl p-8 md:p-12 text-white shadow-2xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {t("sections.schedule")}
        </h2>
        <p className="text-xl opacity-90">{t("hero.schedule.title")}</p>

        <div className="grid md:grid-cols-2 gap-6 mt-12">
          {schedules.map((schedule) => (
            <div
              key={schedule.level}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300 border border-white/10"
            >
              <h3 className="text-xl font-bold mb-2">{schedule.level}</h3>
              <p className="text-lg text-center! mb-1">{schedule.day}</p>
              <p className="text-2xl text-center! font-bold text-yellow-400">
                {schedule.time}
              </p>
            </div>
          ))}
        </div>
      </Container>
      <Container blur className="grid lg:grid-cols-2 gap-12 items-center ">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 dark:text-white text-[#222]">
            {t("sections.visitDojo")}
          </h2>
          <p className="text-xl mb-8 dark:text-gray-300 text-gray-600">
            {t("hero.cta.text")}
            <br />
            {t("hero.cta.trial")} <b>{t("hero.cta.free")}</b>
          </p>

          <div className="space-y-6">
            <ContactItem
              icon={<IoLocationSharp className="text-primary text-3xl" />}
              title={t("contact.location")}
              content={t("contact.address")}
              href="https://www.google.com/maps/place/ASKKSA+-+Associa%C3%A7%C3%A3o+Shotokan+Kokusai+Karate+Santo+Ant%C3%B3nio/@32.6497497,-16.9281768,17z/data=!4m14!1m7!3m6!1s0xc605fef4dcb28af:0xde88828dff1a2efd!2sEscola+Dr.+Hor%C3%A1cio+Bento+de+Gouveia!8m2!3d32.6497497!4d-16.9256019!16s%2Fg%2F12jblrwj6!3m5!1s0xc605fd22ec4ffb7:0x85b9d195f67c98c6!8m2!3d32.6494094!4d-16.9254716!16s%2Fg%2F11qn08q2zw?entry=ttu&g_ep=EgoyMDI1MDYxNy4wIKXMDSoASAFQAw%3D%3D"
            />
            <ContactItem
              icon={<FaPhoneAlt className="text-primary text-3xl" />}
              title={t("contact.phone")}
              content={t("contact.phoneNumber")}
              href={`tel:${t("contact.phoneNumber").replace(/[^+\d]/g, "")}`}
            />
            <ContactItem
              icon={<IoMail className="text-primary text-3xl" />}
              title={t("contact.email")}
              content={
                <ProtectedEmail
                  user={t("contact.emailParts.user")}
                  domain={t("contact.emailParts.domain")}
                  tld={t("contact.emailParts.tld")}
                  className="text-gray-600 dark:text-gray-200 hover:text-primary transition-colors"
                />
              }
            />
          </div>
        </div>

        <div className="relative">
          <iframe
            src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=place_id:ChIJt__ELtJfYAwRxph89pXRuYU`}
            className="rounded-xl h-80 w-full shadow-lg border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Localização da ASKKSA - Escola Horácio Bento Gouveia"
          />
        </div>
      </Container>
      <MetadataLDJSON jsonLd={await jsonLd()} />
    </>
  );
}

type ContactItemProps = {
  icon: ReactNode;
  title: string;
  content: string | ReactNode;
  href?: string;
};

const ContactItem: React.FC<ContactItemProps> = ({
  icon,
  title,
  content,
  href,
}) => {
  const isStringContent = typeof content === "string";
  const isLink = isStringContent && !!href;
  const ContentWrapper = isLink ? "a" : "div";

  const contentClass = clsx(
    "text-gray-600 dark:text-gray-200",
    href && "hover:text-primary transition-colors",
  );

  const contentProps = isLink ? { href } : {};

  return (
    <div className="flex items-start space-x-3 p-4 transition-shadow">
      {icon}
      <div className="flex-1">
        <h3 className="font-bold text-lg text-[#222] dark:text-white">
          {title}
        </h3>
        {isStringContent ? (
          <ContentWrapper {...contentProps} className={contentClass}>
            {content}
          </ContentWrapper>
        ) : (
          content
        )}
      </div>
    </div>
  );
};
