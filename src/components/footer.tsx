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
    <footer className="bg-gray-50/90 dark:bg-black/20 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Brand & Mission */}
          <div className="space-y-4 col-span-2">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                {tOrg("name")}
              </span>
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
                  <p className="font-semibold text-gray-800 dark:text-gray-200">
                    {tOrg("dojo1.name")}
                  </p>
                  <p>{tOrg("dojo1.address.name")}</p>
                  <p>{`${tOrg("dojo1.address.addressLocality")}, ${tOrg("dojo1.address.addressRegion")}`}</p>
                </div>
              </div>
              <div className="flex items-start">
                <FaMapMarkerAlt className="h-5 w-5 text-primary flex-shrink-0 mr-3 mt-1" />{" "}
                {/* CHANGED */}
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">
                    {tOrg("dojo2.name")}
                  </p>
                  <p>{tOrg("dojo2.address.name")}</p>
                  <p>{`${tOrg("dojo2.address.addressLocality")}, ${tOrg("dojo2.address.addressRegion")}`}</p>
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
                  href={`mailto:direcao@askksa.pt}`}
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
        <div className="mt-8 border-t border-gray-200 dark:border-gray-800 pt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} {tOrg("name")}. {t("copyright")}.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
