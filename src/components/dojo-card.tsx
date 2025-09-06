import DojoMap from "@/components/dojo-map";
import { FaPhone, FaUser } from "react-icons/fa";

const DojoCard = ({
  dojo,
}: {
  dojo: {
    id: string;
    name: string;
    mapUrl: string;
    responsible?: string;
    phone?: string;
  };
}) => {
  const cardClasses = [
    "flex flex-col overflow-hidden rounded-2xl border backdrop-blur-sm shadow-lg",
    "transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl",
    "border-gray-200/50 bg-white/60 hover:border-primary",
    "dark:border-gray-700/50 dark:bg-[#2a2a2a]/60 hover:dark:border-primary",
  ].join(" ");

  const iframeClasses = "rounded-xl h-80 w-full shadow-lg border-0";

  const titleClasses =
    "text-xl font-bold text-center text-[#222] dark:text-white px-6 pt-6";

  const contactClasses =
    "text-sm text-gray-600 dark:text-gray-300 px-6 py-4 space-y-2";

  return (
    <div className={cardClasses}>
      <DojoMap
        mapUrl={dojo.mapUrl}
        className={iframeClasses}
        name={dojo.name}
      />
      <h3 className={titleClasses}>{dojo.name}</h3>

      {(dojo.responsible || dojo.phone) && (
        <div className={contactClasses}>
          {dojo.responsible && dojo.phone ? (
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <FaUser className="text-primary flex-shrink-0" />
                <span>{dojo.responsible}</span>
              </div>
              <a
                href={`tel:${dojo.phone}`}
                className="text-primary hover:text-red-700 transition-colors font-medium"
              >
                {dojo.phone}
              </a>
            </div>
          ) : (
            <>
              {dojo.responsible && (
                <div className="flex items-center gap-2">
                  <FaUser className="text-primary flex-shrink-0" />
                  <span>{dojo.responsible}</span>
                </div>
              )}
              {dojo.phone && (
                <div className="flex items-center gap-2">
                  <FaPhone className="text-primary flex-shrink-0" />
                  <a
                    href={`tel:${dojo.phone}`}
                    className="hover:text-primary transition-colors"
                  >
                    {dojo.phone}
                  </a>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default DojoCard;
