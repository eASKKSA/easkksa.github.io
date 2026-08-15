"use client";

import clsx from "clsx";
import dynamic from "next/dynamic";
import { useState } from "react";
import type { TrialFormLabels } from "@/components/trial-form-modal";

const TrialFormModal = dynamic(() => import("@/components/trial-form-modal"), {
  ssr: false,
});

export default function FormTrial({
  trial,
  labels,
  variant = "primary",
}: Readonly<{
  trial: string;
  labels: TrialFormLabels;
  variant?: "primary" | "inverse";
}>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={clsx(
          "min-h-14 rounded-xl px-7 py-3 font-bold transition-colors duration-200 focus:ring-4",
          variant === "primary" &&
            "bg-primary text-white shadow-[0_12px_32px_rgba(181,34,43,0.28)] hover:bg-primary-dark focus:ring-primary/30",
          variant === "inverse" &&
            "bg-white text-primary shadow-none hover:bg-gold hover:text-ink focus:ring-white/40",
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        {trial}
      </button>
      <TrialFormModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        labels={labels}
      />
    </>
  );
}
