"use client";

import { useTranslations } from "next-intl";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { Link } from "@/i18n/navigation";

// Social links now use react-icons
const socialLinks = [
  {
    href: "https://www.facebook.com/ASKKSA.MADEIRA",
    label: "Facebook",
    icon: <FaFacebookF size={20} />, // CHANGED
  },
  {
    href: "https://www.instagram.com/askksa_madeira/",
    label: "Instagram",
    icon: <FaInstagram size={20} />, // CHANGED
  },
  {
    href: "https://www.youtube.com/@manuelrafaelpitajard",
    label: "YouTube",
    icon: <FaYoutube size={20} />, // CHANGED
  },
];

const Footer = () => {
  const t = useTranslations("Footer");
  const tOrg = useTranslations("Organization");

  return (
    <footer>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Brand & Mission */}
          <div className="space-y-4 col-span-2">
            <Link href="/" className="inline-block">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {tOrg("name")}
              </h2>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {t("mission")}
            </p>
          </div>

          {/* Column 3: Locations */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">
              {t("ourDojos")}
            </h3>
            <div className="mt-4 space-y-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-start">
                <FaMapMarkerAlt className="h-5 w-5 text-primary flex-shrink-0 mr-3 mt-1" />{" "}
                <div>
                  <a
                    className="font-semibold text-gray-800 dark:text-gray-200 hover:text-primary transition-colors"
                    target="_blank"
                    href="https://www.google.com/maps/place/ASKKSA+-+Associa%C3%A7%C3%A3o+Shotokan+Kokusai+Karate+Santo+Ant%C3%B3nio/@32.6497497,-16.9281768,17z/data=!4m14!1m7!3m6!1s0xc605fef4dcb28af:0xde88828dff1a2efd!2sEscola+Dr.+Hor%C3%A1cio+Bento+de+Gouveia!8m2!3d32.6497497!4d-16.9256019!16s%2Fg%2F12jblrwj6!3m5!1s0xc605fd22ec4ffb7:0x85b9d195f67c98c6!8m2!3d32.6494094!4d-16.9254716!16s%2Fg%2F11qn08q2zw?entry=ttu&g_ep=EgoyMDI1MDYxNy4wIKXMDSoASAFQAw%3D%3D"
                  >
                    {tOrg("dojo1.name")}
                  </a>
                  <address>
                    <p>{tOrg("dojo1.address.name")}</p>
                    <p>{`${tOrg("dojo1.address.addressLocality")}, ${tOrg("dojo1.address.addressRegion")}`}</p>
                  </address>
                  <div className="flex items-center justify-between mt-2 text-xs">
                    <span className="text-gray-800 dark:text-gray-200">
                      Rafael Jardim
                    </span>
                    <div className="flex items-center gap-1">
                      <FaPhone className="text-primary flex-shrink-0" />
                      <a
                        href="tel:+351960384090"
                        className="text-gray-800 dark:text-gray-200 hover:text-red-700 transition-colors font-medium"
                      >
                        +351 960 384 090
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-start">
                <FaMapMarkerAlt className="h-5 w-5 text-primary flex-shrink-0 mr-3 mt-1" />{" "}
                <div className="w-full">
                  <a
                    className="font-semibold text-gray-800 dark:text-gray-200 hover:text-primary transition-colors"
                    target="_blank"
                    href="https://www.google.com/maps/place/Junta+de+Freguesia+de+Santo+António/@32.6639233,-16.9451558,17z/data=!3m1!4b1!4m6!3m5!1s0xc605f234ec15fc9:0x7c97dfaa734fe732!8m2!3d32.6639189!4d-16.9402849!16s%2Fg%2F11h4s4ccfx?entry=ttu&g_ep=EgoyMDI1MDcxMy4wIKXMDSoASAFQAw%3D%3D"
                  >
                    {tOrg("dojo2.name")}
                  </a>
                  <address>
                    <p>{tOrg("dojo2.address.name")}</p>
                    <p>{`${tOrg("dojo2.address.addressLocality")}, ${tOrg("dojo2.address.addressRegion")}`}</p>
                  </address>
                  <div className="flex items-center justify-between mt-2 text-xs">
                    <span className="text-gray-800 dark:text-gray-200">
                      Marisa Gomes
                    </span>
                    <div className="flex items-center gap-1">
                      <FaPhone className="text-primary flex-shrink-0" />
                      <a
                        href="tel:+351965713358"
                        className="text-gray-800 dark:text-gray-200 hover:text-red-700 transition-colors font-medium"
                      >
                        +351 965 713 358
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-start">
                <FaMapMarkerAlt className="h-5 w-5 text-primary flex-shrink-0 mr-3 mt-1" />{" "}
                <div>
                  <a
                    className="font-semibold text-gray-800 dark:text-gray-200 hover:text-primary transition-colors"
                    target="_blank"
                    href="https://www.google.com/maps/place/R.+Frei+Pedro+da+Guarda+36,+9300-066+Câmara+de+Lobos/@32.6545326,-16.9752042,17z/data=!3m1!4b1!4m6!3m5!1s0xc605f121f097781:0x7b5a00bb7ea01d2a!8m2!3d32.6545281!4d-16.9726293!16s%2Fg%2F11mcxk01nt?entry=ttu&g_ep=EgoyMDI1MDcxMy4wIKXMDSoASAFQAw%3D%3D"
                  >
                    {tOrg("dojo3.name")}
                  </a>
                  <address>
                    <p>{tOrg("dojo3.address.name")}</p>
                    <p>{`${tOrg("dojo3.address.addressLocality")}, ${tOrg("dojo3.address.addressRegion")}`}</p>
                  </address>
                  <div className="flex items-center justify-between mt-2 text-xs">
                    <span className="text-gray-800 dark:text-gray-200">
                      Jorge Freitas
                    </span>
                    <div className="flex items-center gap-1">
                      <FaPhone className="text-primary flex-shrink-0" />
                      <a
                        href="tel:+351965012299"
                        className="text-gray-800 dark:text-gray-200 hover:text-red-700 transition-colors font-medium"
                      >
                        +351 965 012 299
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Contact & Social */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">
              {t("contact")}
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="flex items-center">
                <FaPhone className="h-4 w-4 text-primary mr-3" />{" "}
                <a
                  href={`tel:+351960384090`}
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                >
                  +351 960 384 090
                </a>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="h-4 w-4 text-primary mr-3" />{" "}
                <a
                  href="mailto:direcao@askksa.pt"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                >
                  direcao@askksa.pt
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">
                {t("followUs")}
              </h3>
              <div className="flex space-x-4 mt-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <small className="mt-8 border-t border-gray-200 dark:border-gray-800 pt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} {tOrg("name")}. {t("copyright")}.
        </small>
      </div>
    </footer>
  );
};

export default Footer;
