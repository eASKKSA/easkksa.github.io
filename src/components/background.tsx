import Image from "next/image";

const Background: React.FC = () => {
  return (
    <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      {/* Mobile background, composed independently for portrait proportions. */}
      <div className="absolute inset-0 bg-[linear-gradient(155deg,#f8f5ef_0%,#f3eee5_52%,#eee7dc_100%)] md:hidden dark:bg-gradient-to-br dark:from-[#222] dark:via-[#2a2a2a] dark:to-primary" />

      {/* Mobile artwork: both layers share one frame, so the eyes stay aligned. */}
      <div className="absolute left-1/2 top-1/2 hidden aspect-[612/369] w-[170vw] -translate-x-1/2 -translate-y-1/2 [mask-image:radial-gradient(ellipse_50%_50%_at_center,black_42%,transparent_100%)] max-md:block">
        <Image
          src="/askksa-background-tiger.svg"
          fill
          sizes="170vw"
          alt=""
          aria-hidden="true"
          unoptimized
          className="object-contain opacity-[0.065] mix-blend-multiply dark:opacity-100 dark:mix-blend-normal"
        />
        <Image
          src="/askksa-background-tiger-eyes.svg"
          fill
          sizes="170vw"
          alt=""
          aria-hidden="true"
          unoptimized
          className="object-contain opacity-40 dark:opacity-100"
        />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_16%,rgba(181,34,43,0.08),transparent_32%),radial-gradient(circle_at_88%_82%,rgba(225,173,67,0.08),transparent_30%),linear-gradient(to_bottom,rgba(255,253,248,0.72)_0%,rgba(255,253,248,0.14)_44%,rgba(244,240,232,0.62)_100%)] md:hidden dark:hidden" />

      {/* Theme-aware mobile readability treatment. */}
      <div className="absolute inset-0 hidden bg-gradient-to-b from-black/40 via-transparent to-black/60 max-md:dark:block" />

      {/* Desktop base. Dark values preserve the current dark composition. */}
      <div className="absolute inset-0 hidden bg-[linear-gradient(135deg,#f8f5ef_0%,#f3eee5_48%,#eee7dc_100%)] md:block dark:bg-gradient-to-br dark:from-[#222] dark:via-[#2a2a2a] dark:to-primary" />

      {/* In light mode the tiger becomes a quiet ink watermark. */}
      <Image
        src="/askksa-background-tiger.svg"
        fill
        sizes="100vw"
        alt=""
        aria-hidden="true"
        unoptimized
        className="hidden object-cover opacity-[0.055] mix-blend-multiply md:block dark:opacity-100 dark:mix-blend-normal"
      />
      <Image
        src="/askksa-background-tiger-eyes.svg"
        fill
        sizes="100vw"
        alt=""
        aria-hidden="true"
        unoptimized
        className="hidden object-cover opacity-35 md:block dark:opacity-100"
      />

      {/* Warm paper depth and restrained brand-colour accents for light mode. */}
      <div className="absolute inset-0 hidden bg-[radial-gradient(circle_at_8%_18%,rgba(181,34,43,0.09),transparent_26%),radial-gradient(circle_at_88%_76%,rgba(225,173,67,0.09),transparent_28%),linear-gradient(to_bottom,rgba(255,253,248,0.72)_0%,rgba(255,253,248,0.16)_38%,rgba(244,240,232,0.66)_100%)] md:block dark:hidden" />

      {/* Current dark-mode readability treatment. */}
      <div className="absolute inset-0 hidden bg-gradient-to-b from-black/40 via-transparent to-black/60 md:dark:block" />
    </div>
  );
};

export default Background;
