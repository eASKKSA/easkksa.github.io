"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import type { TrialFormLabels } from "@/components/trial-form-modal";

const TrialFormModal = dynamic(() => import("@/components/trial-form-modal"), {
  ssr: false,
});

export default function FormTrial({
  trial,
  labels,
}: Readonly<{ trial: string; labels: TrialFormLabels }>) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="bg-primary hover:bg-[#8b1e23] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 focus:ring-4 focus:ring-primary/50 shadow-lg cursor-pointer"
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
