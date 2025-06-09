import Image from "next/image";

import desktopBg from "@/assets/askksa-background-tiger.svg";
import mobileBg from "@/assets/askksa-background-tiger-mobile.svg";

const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-20">
      {/* Layer 1: Themed Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-gray-100 to-[#a4262c]/10 dark:bg-gradient-to-br dark:from-[#222] dark:via-[#2a2a2a] dark:to-[#a4262c]/20" />

      {/* Desktop Dark Image */}
      <Image
        priority
        src={desktopBg}
        alt="Tiger artwork for dark theme on desktop"
        fill
        sizes="100vw"
        className="object-cover hidden md:block"
      />

      {/* Mobile Dark Image */}
      <Image
        priority
        src={mobileBg}
        alt="Tiger artwork for dark theme on mobile"
        fill
        sizes="100vw"
        className="object-cover block md:hidden"
      />

      {/* Theme-aware overlay for text readability */}
      <div
        className={`absolute inset-0 dark:bg-gradient-to-b dark:from-black/40 dark:via-transparent dark:to-black/60 bg-gradient-to-b from-white/80 via-transparent to-white/40`}
      />
    </div>
  );
};

export default Background;
