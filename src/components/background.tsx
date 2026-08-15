import Image from "next/image";

const Background: React.FC = () => {
  return (
    <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden bg-paper dark:bg-[#101010]">
      <div className="absolute left-1/2 top-1/2 aspect-[612/369] w-dvw -translate-x-1/2 -translate-y-1/2 opacity-80 [mask-image:radial-gradient(ellipse_at_center,black_52%,transparent_92%)] md:opacity-100">
        <Image
          src="/askksa-background-tiger.svg"
          fill
          sizes="100vw"
          alt=""
          aria-hidden="true"
          unoptimized
          className="object-contain opacity-[0.045] mix-blend-multiply dark:invert dark:mix-blend-screen dark:opacity-[0.035]"
        />
        <Image
          src="/askksa-background-tiger-eyes.svg"
          fill
          sizes="100vw"
          alt=""
          aria-hidden="true"
          unoptimized
          className="object-contain opacity-30 md:opacity-65 dark:opacity-45 md:dark:opacity-80"
        />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_12%,rgba(181,34,43,0.06),transparent_30%),radial-gradient(circle_at_88%_82%,rgba(225,173,67,0.04),transparent_28%)]" />
    </div>
  );
};

export default Background;
