// components/footer.tsx
"use client";

import { useTranslations } from "next-intl";
// CHANGED: Import icons from 'react-icons/fa' instead of 'lucide-react'
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import Link from "next/link";
import ProtectedEmail from "@/components/protected-email";

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
      <div className="footer-container">
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
                {/* CHANGED */}
                <div>
                  <a
                    className="font-semibold text-gray-800 dark:text-gray-200 hover:text-primary transition-colors"
                    href="https://www.google.com/maps/place/ASKKSA+-+Associa%C3%A7%C3%A3o+Shotokan+Kokusai+Karate+Santo+Ant%C3%B3nio/@32.6497497,-16.9281768,17z/data=!4m14!1m7!3m6!1s0xc605fef4dcb28af:0xde88828dff1a2efd!2sEscola+Dr.+Hor%C3%A1cio+Bento+de+Gouveia!8m2!3d32.6497497!4d-16.9256019!16s%2Fg%2F12jblrwj6!3m5!1s0xc605fd22ec4ffb7:0x85b9d195f67c98c6!8m2!3d32.6494094!4d-16.9254716!16s%2Fg%2F11qn08q2zw?entry=ttu&g_ep=EgoyMDI1MDYxNy4wIKXMDSoASAFQAw%3D%3D"
                  >
                    {tOrg("dojo1.name")}
                  </a>
                  <address>
                    <p>{tOrg("dojo1.address.name")}</p>
                    <p>{`${tOrg("dojo1.address.addressLocality")}, ${tOrg("dojo1.address.addressRegion")}`}</p>
                  </address>
                </div>
              </div>
              <div className="flex items-start">
                <FaMapMarkerAlt className="h-5 w-5 text-primary flex-shrink-0 mr-3 mt-1" />{" "}
                {/* CHANGED */}
                <div>
                  <a
                    className="font-semibold text-gray-800 dark:text-gray-200 hover:text-primary transition-colors"
                    href="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d839.7119896617946!2d-16.9409179!3d32.6634899!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xc605f234ec15fc9%3A0x7c97dfaa734fe732!2sJunta%20de%20Freguesia%20de%20Santo%20Ant%C3%B3nio!5e0!3m2!1spt-PT!2spt!4v1749741985599!5m2!1spt-PT!2spt"
                  >
                    {tOrg("dojo2.name")}
                  </a>
                  <address>
                    <p>{tOrg("dojo2.address.name")}</p>
                    <p>{`${tOrg("dojo2.address.addressLocality")}, ${tOrg("dojo2.address.addressRegion")}`}</p>
                  </address>
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
                {/* CHANGED */}
                <a
                  href={`tel:+351960384090`}
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                >
                  +351 960 384 090
                </a>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="h-4 w-4 text-primary mr-3" />{" "}
                {/* CHANGED */}
                <a
                  href="mailto:direcao@askksa.pt"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                >
                  <ProtectedEmail user="direcao" domain="askksa" tld="pt" />
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
