"use client";

import { useState, useEffect } from "react";

export function PageAnimationWrapper({
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
    <main
      className={`container mx-auto px-4 pt-44 pb-12 space-y-24 transition-all duration-1000 ease-out
        ${
          // Apply classes based on the mounted state
          isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }
        dark:text-white text-slate-900`}
    >
      {children}
    </main>
  );
}
