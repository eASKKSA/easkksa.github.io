import Image from "next/image";
import CertifiedLogoCard from "@/components/certified-logo-card";

const BBCard = ({ blackBelt }: { blackBelt: BlackBelt }) => {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-2xl border transition-all duration-300 dark:border-gray-700/50 dark:bg-[#2a2a2a]/60 hover:dark:border-primary hover:dark:bg-[#222]/80 border-gray-200/50 bg-white/60 hover:border-primary hover:bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transform hover:-translate-y-2">
      <Image
        src={blackBelt.image}
        alt={`Foto de ${blackBelt.name}`}
        width={96}
        height={96}
        className="rounded-full object-cover border-4 dark:border-primary/50 border-gray-300 mb-4"
        sizes="(max-width: 768px) 100vw, 128px"
      />
      <h3 className="text-xl font-bold mb-2 dark:text-white text-gray-900">
        {blackBelt.name}
      </h3>
      <p className="text-sm text-primary font-extrabold mb-2">
        {blackBelt.graduation}
      </p>
      <div className="absolute right-0 top-0 m-2">
        <CertifiedLogoCard certifiedBy={blackBelt.certifiedBy} />
      </div>
    </div>
  );
};

export default BBCard;
