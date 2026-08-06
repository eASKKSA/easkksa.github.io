"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

const selector = "[data-viewport-reveal]";

export default function ViewportRevealObserver() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    // Re-register elements after a client-side route change.
    void pathname;
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(selector),
    );
    const thresholds = Array.from(
      new Set(
        elements.map((element) =>
          Number(element.dataset.revealThreshold ?? "0"),
        ),
      ),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const element = entry.target as HTMLElement;
          const threshold = Number(element.dataset.revealThreshold ?? "0");
          const reachedThreshold =
            entry.isIntersecting &&
            (threshold === 0 || entry.intersectionRatio >= threshold);

          if (!reachedThreshold) continue;
          element.dataset.revealState = "visible";
          observer.unobserve(element);
        }
      },
      { threshold: thresholds },
    );

    for (const element of elements) {
      const rect = element.getBoundingClientRect();
      const isAlreadyVisible = rect.top < window.innerHeight && rect.bottom > 0;

      // Keep server-rendered above-the-fold content visible for an early LCP.
      if (isAlreadyVisible) continue;

      element.dataset.revealState = "hidden";
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
