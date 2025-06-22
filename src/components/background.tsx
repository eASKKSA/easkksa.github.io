import Image from "next/image";

import desktopBg from "@/assets/askksa-background-tiger.svg";
import mobileBg from "@/assets/askksa-background-tiger-mobile.png";

const Background: React.FC = () => {
  return (
    <div className="background-container">
      {/* Layer 1: Themed Gradient Overlay */}
      <div className="background-overlay" />

      {/* Desktop Dark Image */}
      <Image
        priority
        src={desktopBg}
        fill
        alt=""
        className="hidden md:block object-cover"
      />

      {/* Mobile Dark Image */}
      <Image
        priority
        src={mobileBg}
        fill
        alt=""
        className="block md:hidden object-cover"
      />

      {/* Theme-aware overlay for text readability */}
      <div className="background-overlay-text" />
    </div>
  );
};

export default Background;
