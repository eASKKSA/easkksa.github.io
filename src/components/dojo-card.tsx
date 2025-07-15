import DojoMap from "@/components/dojo-map";

const DojoCard = ({
  dojo,
}: {
  dojo: {
    id: string;
    name: string;
    mapUrl: string;
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
    "text-xl font-bold text-center text-[#222] dark:text-white p-6";

  return (
    <div className={cardClasses}>
      <DojoMap
        mapUrl={dojo.mapUrl}
        className={iframeClasses}
        name={dojo.name}
      />
      <h3 className={titleClasses}>{dojo.name}</h3>
    </div>
  );
};

export default DojoCard;
