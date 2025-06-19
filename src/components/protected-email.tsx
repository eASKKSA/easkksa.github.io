// components/protected-email.tsx
"use client";

interface ProtectedEmailProps {
  user: string;
  domain: string;
  tld: string;
  className?: string;
}

export default function ProtectedEmail({
  user,
  domain,
  tld,
  className,
}: Readonly<ProtectedEmailProps>) {
  const handleClick = () => {
    const email = `${user}@${domain}.${tld}`;
    window.location.href = `mailto:${email}`;
  };

  return (
    <span
      onClick={handleClick}
      className={`cursor-pointer ${className}`}
      style={{ userSelect: "none" }}
    >
      <span>{user}</span>
      <span style={{ display: "none" }}>nospam</span>
      <span>@</span>
      <span style={{ display: "none" }}>remove</span>
      <span>{domain}</span>
      <span>.</span>
      <span>{tld}</span>
    </span>
  );
}
