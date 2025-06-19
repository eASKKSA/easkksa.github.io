"use client";

interface ProtectedEmailProps {
  encoded: string;
  className?: string;
}

export default function ProtectedEmail({
  encoded,
  className,
}: Readonly<ProtectedEmailProps>) {
  const decodeEmail = (encoded: string): string => {
    return atob(encoded); // Base64 decode
  };

  const email = decodeEmail(encoded);

  return (
    <a href={`mailto:${email}`} className={className}>
      {email}
    </a>
  );
}
