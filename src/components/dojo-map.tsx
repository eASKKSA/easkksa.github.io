"use client";

import dynamic from "next/dynamic";

const DojoMapImp = ({
  name,
  mapUrl,
  className,
}: {
  name: string;
  mapUrl: string;
  className?: string;
}) => {
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
const DojoMap = dynamic(() => Promise.resolve(DojoMapImp), {
  ssr: false,
  loading: () => <div>Loading map…</div>,
});

export default DojoMap;
