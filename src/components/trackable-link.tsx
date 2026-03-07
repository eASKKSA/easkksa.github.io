"use client";
import { sendGTMEvent } from "@next/third-parties/google";
import type { AnchorHTMLAttributes } from "react";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  gtmEvent?: string;
  gtmParams?: Record<string, string>;
};

/**
 * Drop-in <a> replacement that fires a GTM dataLayer event on click.
 * Safe to use inside server components as a leaf node.
 */
export default function TrackableLink({
  gtmEvent,
  gtmParams,
  onClick,
  children,
  ...props
}: Props) {
  return (
    <a
      {...props}
      onClick={(e) => {
        if (gtmEvent) sendGTMEvent({ ...gtmParams, event: gtmEvent });
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
