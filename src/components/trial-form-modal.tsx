"use client";

import { sendGTMEvent } from "@next/third-parties/google";
import clsx from "clsx";
import { type Locale, useLocale } from "next-intl";
import { useActionState, useEffect, useId, useRef } from "react";
import { createPortal, useFormStatus } from "react-dom";
import { LuArrowRight, LuX } from "react-icons/lu";
import { submitTrialForm, type TrialFormState } from "@/app/actions";

export type TrialFormLabels = {
  heading: string;
  description: string;
  fullName: string;
  age: string;
  email: string;
  phone: string;
  previousExperience: string;
  yes: string;
  no: string;
  submit: { submitting: string; button: string };
};

function SubmitButton({ labels }: Readonly<{ labels: TrialFormLabels }>) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="flex min-h-14 w-full items-center justify-between rounded-xl bg-primary px-5 font-bold text-white transition-colors duration-200 hover:bg-primary-dark disabled:cursor-not-allowed disabled:bg-stone-400"
    >
      <span>{pending ? labels.submit.submitting : labels.submit.button}</span>
      <LuArrowRight className="size-5" aria-hidden="true" />
    </button>
  );
}

const initialState: TrialFormState = { message: "", success: false };

const modalUi: Record<Locale, { close: string; eyebrow: string }> = {
  "pt-PT": { close: "Fechar formulário", eyebrow: "ASKKSA · Experiência" },
  en: { close: "Close form", eyebrow: "ASKKSA · Trial" },
  fr: { close: "Fermer le formulaire", eyebrow: "ASKKSA · Essai" },
  ja: { close: "フォームを閉じる", eyebrow: "ASKKSA · 体験" },
};

export default function TrialFormModal({
  isOpen,
  onClose,
  labels,
}: Readonly<{
  isOpen: boolean;
  onClose: () => void;
  labels: TrialFormLabels;
}>) {
  const [state, formAction] = useActionState(submitTrialForm, initialState);
  const locale = useLocale();
  const ui = modalUi[locale];
  const formRef = useRef<HTMLFormElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const headingId = useId();
  const descriptionId = useId();

  useEffect(() => {
    if (!isOpen) return;
    restoreFocusRef.current = document.activeElement as HTMLElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    sendGTMEvent({ event: "trial_form_open" });
    requestAnimationFrame(() => {
      dialogRef.current?.querySelector<HTMLInputElement>("input")?.focus();
    });
    return () => {
      document.body.style.overflow = previousOverflow;
      restoreFocusRef.current?.focus();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!state.message) return;
    if (state.success) {
      sendGTMEvent({ event: "trial_form_submit_success" });
      const timer = setTimeout(() => {
        formRef.current?.reset();
        onClose();
      }, 2500);
      return () => clearTimeout(timer);
    }
    sendGTMEvent({
      event: "trial_form_submit_error",
      error_message: state.message,
    });
  }, [state, onClose]);

  if (!isOpen) return null;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
      return;
    }
    if (event.key !== "Tab") return;
    const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
      'button:not([disabled]), input:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
    );
    if (!focusable?.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const fieldClass =
    "mt-2 min-h-12 w-full rounded-xl border border-black/15 bg-white px-4 text-base text-ink transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-white/15 dark:bg-[#202020] dark:text-white";

  return createPortal(
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-black/72 p-0 backdrop-blur-sm sm:items-center sm:p-5">
      <button
        type="button"
        aria-label={ui.close}
        className="absolute inset-0 cursor-default"
        onClick={onClose}
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
        aria-describedby={descriptionId}
        onKeyDown={handleKeyDown}
        className="relative z-10 max-h-[94dvh] w-full max-w-2xl overflow-y-auto rounded-t-[2rem] bg-[#fffdf8] shadow-2xl sm:max-h-[90dvh] sm:rounded-[2rem] dark:bg-[#171717]"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-black/10 bg-[#fffdf8]/95 px-6 py-4 backdrop-blur-xl sm:px-8 dark:border-white/10 dark:bg-[#171717]/95">
          <span className="font-display text-sm font-bold uppercase tracking-[0.18em] text-primary">
            {ui.eyebrow}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label={ui.close}
            className="grid size-11 place-items-center rounded-full bg-black/5 transition-colors duration-200 hover:bg-primary hover:text-white dark:bg-white/10"
          >
            <LuX className="size-5" aria-hidden="true" />
          </button>
        </div>

        <div className="p-6 sm:p-8 md:p-10">
          <h2
            id={headingId}
            className="max-w-xl font-display text-4xl font-bold leading-none sm:text-5xl"
          >
            {labels.heading}
          </h2>
          <p
            id={descriptionId}
            className="mt-4 max-w-xl text-stone-600 dark:text-stone-300"
          >
            {labels.description}
          </p>

          <form ref={formRef} action={formAction} className="mt-8 space-y-5">
            <div>
              <label htmlFor="name" className="text-sm font-semibold">
                {labels.fullName}
              </label>
              <input
                type="text"
                name="name"
                id="name"
                autoComplete="name"
                required
                className={fieldClass}
              />
              {state.errors?.name && (
                <p className="mt-1 text-sm text-red-600">
                  {state.errors.name[0]}
                </p>
              )}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="age" className="text-sm font-semibold">
                  {labels.age}
                </label>
                <input
                  type="number"
                  name="age"
                  id="age"
                  min="4"
                  max="100"
                  inputMode="numeric"
                  required
                  className={fieldClass}
                />
                {state.errors?.age && (
                  <p className="mt-1 text-sm text-red-600">
                    {state.errors.age[0]}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="phone" className="text-sm font-semibold">
                  {labels.phone}
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  autoComplete="tel"
                  inputMode="tel"
                  className={fieldClass}
                />
                {state.errors?.phone && (
                  <p className="mt-1 text-sm text-red-600">
                    {state.errors.phone[0]}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="text-sm font-semibold">
                {labels.email}
              </label>
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                required
                className={fieldClass}
              />
              {state.errors?.email && (
                <p className="mt-1 text-sm text-red-600">
                  {state.errors.email[0]}
                </p>
              )}
            </div>

            <fieldset>
              <legend className="text-sm font-semibold">
                {labels.previousExperience}
              </legend>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {(["yes", "no"] as const).map((value) => (
                  <label
                    key={value}
                    className="flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border border-black/15 px-4 transition-colors has-checked:border-primary has-checked:bg-primary/8 dark:border-white/15"
                  >
                    <input
                      type="radio"
                      name="experience"
                      value={value}
                      required
                      className="size-4 accent-primary"
                    />
                    <span className="font-medium">{labels[value]}</span>
                  </label>
                ))}
              </div>
              {state.errors?.experience && (
                <p className="mt-1 text-sm text-red-600">
                  {state.errors.experience[0]}
                </p>
              )}
            </fieldset>

            <SubmitButton labels={labels} />
            <div aria-live="polite" aria-atomic="true">
              {state.message && (
                <p
                  className={clsx("text-center text-sm", {
                    "text-green-700 dark:text-green-400": state.success,
                    "text-red-600 dark:text-red-400": !state.success,
                  })}
                >
                  {state.message}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>,
    document.body,
  );
}
