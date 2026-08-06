"use client";

import { IoLocationSharp } from "react-icons/io5";
import { useDeferredEmbed } from "@/lib/use-deferred-embed";

const DojoMap = ({
  name,
  mapUrl,
  loadingLabel,
  className,
}: {
  name: string;
  mapUrl: string;
  loadingLabel: string;
  className?: string;
}) => {
  const { isLoaded, targetRef } = useDeferredEmbed<HTMLDivElement>();

  if (!isLoaded) {
    return (
      <div
        ref={targetRef}
        className={`${className ?? ""} flex flex-col items-center justify-center gap-4 bg-gray-100 px-6 text-center dark:bg-gray-800`}
      >
        <IoLocationSharp aria-hidden="true" className="text-5xl text-primary" />
        <p className="text-center! font-semibold text-gray-800 dark:text-gray-100">
          {name}
        </p>
        <p
          className="text-center! text-sm text-gray-600 dark:text-gray-300"
          role="status"
        >
          {loadingLabel}
        </p>
      </div>
    );
  }

  return (
    <iframe
      src={mapUrl}
      className={className}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title={name}
    />
  );
};

export default DojoMap;
