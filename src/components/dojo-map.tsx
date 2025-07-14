"use client";

const DojoMap = ({
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

export default DojoMap;
