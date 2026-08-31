"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

const selector = "[data-viewport-reveal]";

export default function ViewportRevealObserver() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    // Content is always readable. The reveal state is progressive enhancement
    // rather than a visibility gate, avoiding blank sections in snapshots,
    // back/forward navigation and constrained browsers.
    void pathname;
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(selector),
    );
    for (const element of elements) {
      element.dataset.revealState = "visible";
    }
  }, [pathname]);

  return null;
}
