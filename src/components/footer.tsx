import { getTranslations } from "next-intl/server";
import {
  LuArrowUpRight,
  LuFacebook,
  LuInstagram,
  LuMail,
  LuMapPin,
  LuPhone,
  LuYoutube,
} from "react-icons/lu";
import TrackableLink from "@/components/trackable-link";
import { Link } from "@/i18n/navigation";

const dojos = [
  {
    key: "dojo1" as const,
    href: "https://www.google.com/maps/place/ASKKSA+-+Associa%C3%A7%C3%A3o+Shotokan+Kokusai+Karate+Santo+Ant%C3%B3nio/@32.6494094,-16.9254716,17z",
  },
  {
    key: "dojo2" as const,
    href: "https://www.google.com/maps/place/Junta+de+Freguesia+de+Santo+Ant%C3%B3nio/@32.6639189,-16.9402849,17z",
  },
  {
    key: "dojo3" as const,
    href: "https://www.google.com/maps/place/R.+Frei+Pedro+da+Guarda+36,+9300-066+C%C3%A2mara+de+Lobos/@32.6545281,-16.9726293,17z",
  },
];

const socials = [
  {
    href: "https://www.facebook.com/ASKKSA.MADEIRA",
    label: "Facebook",
    icon: LuFacebook,
  },
  {
    href: "https://www.instagram.com/askksa_madeira/",
    label: "Instagram",
    icon: LuInstagram,
  },
  {
    href: "https://www.youtube.com/@manuelrafaelpitajard",
    label: "YouTube",
    icon: LuYoutube,
  },
];

export default async function Footer() {
  const t = await getTranslations("Footer");
  const tOrg = await getTranslations("Organization");

  return (
    <footer>
      <div className="mx-auto max-w-[1450px] px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr_.65fr]">
          <div>
            <Link href="/" className="inline-block" prefetch={false}>
              <span className="font-display text-6xl font-bold leading-none tracking-[0.04em]">
                ASKKSA
              </span>
            </Link>
            <p className="mt-5 max-w-lg text-stone-400">{t("mission")}</p>
            <div className="mt-7 flex gap-2">
              {socials.map(({ href, label, icon: Icon }) => (
                <TrackableLink
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid size-11 place-items-center rounded-full border border-white/15 text-stone-300 transition-colors duration-200 hover:border-primary hover:bg-primary hover:text-white"
                  gtmEvent="social_click"
                  gtmParams={{ platform: label.toLowerCase() }}
                >
                  <Icon className="size-4" aria-hidden="true" />
                </TrackableLink>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
              {t("ourDojos")}
            </h2>
            <div className="mt-5 divide-y divide-white/10 border-y border-white/10">
              {dojos.map((dojo) => (
                <a
                  key={dojo.key}
                  href={dojo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid grid-cols-[auto_1fr_auto] items-start gap-3 py-4 text-sm transition-colors duration-200 hover:text-white"
                >
                  <LuMapPin
                    className="mt-1 size-4 text-primary"
                    aria-hidden="true"
                  />
                  <span>
                    <span className="block font-semibold text-stone-200">
                      {tOrg(`${dojo.key}.name`)}
                    </span>
                    <span className="mt-1 block text-stone-500">
                      {tOrg(`${dojo.key}.address.addressLocality`)},{" "}
                      {tOrg(`${dojo.key}.address.addressRegion`)}
                    </span>
                  </span>
                  <LuArrowUpRight
                    className="mt-1 size-4 text-stone-600 transition-colors group-hover:text-primary"
                    aria-hidden="true"
                  />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
              {t("contact")}
            </h2>
            <div className="mt-5 space-y-4 text-sm text-stone-300">
              <TrackableLink
                href="tel:+351960384090"
                className="flex items-center gap-3 transition-colors hover:text-white"
                gtmEvent="contact_click"
                gtmParams={{ contact_method: "phone" }}
              >
                <LuPhone className="size-4 text-primary" aria-hidden="true" />
                +351 960 384 090
              </TrackableLink>
              <TrackableLink
                href="mailto:direcao@askksa.pt"
                className="flex items-center gap-3 transition-colors hover:text-white"
                gtmEvent="contact_click"
                gtmParams={{ contact_method: "email" }}
              >
                <LuMail className="size-4 text-primary" aria-hidden="true" />
                direcao@askksa.pt
              </TrackableLink>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-5 border-t border-white/10 pt-7 text-sm text-stone-500 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-6">
            <Link href="/faq" className="transition-colors hover:text-white">
              {t("faq")}
            </Link>
            <Link
              href="/privacy-policy"
              className="transition-colors hover:text-white"
            >
              {t("privacy")}
            </Link>
          </div>
          <small className="text-sm">
            © {new Date().getFullYear()} ASKKSA. {t("copyright")}.
          </small>
        </div>
      </div>
    </footer>
  );
}
