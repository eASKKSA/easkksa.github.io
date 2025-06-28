"use client";

import { useState, useEffect } from "react";
import clsx from "clsx";

export default function PageAnimationWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className={clsx(!isMounted && "opacity-0 translate-y-8")}>
      {children}
    </main>
  );
}
