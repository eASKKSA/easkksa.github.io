import clsx from "clsx";
import { useTranslations } from "next-intl";
import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { IoClose } from "react-icons/io5";
import { submitTrialForm, type TrialFormState } from "@/app/actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  const t = useTranslations("TrialForm");
  return (
    <button
      type="submit"
      disabled={pending}
      className={clsx(
        "w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors",
        "bg-primary hover:bg-primary-dark",
        "disabled:bg-gray-400 disabled:cursor-not-allowed",
      )}
    >
      {pending ? t("submit.submitting") : t("submit.button")}
    </button>
  );
}

type TrialFormModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const initialState: TrialFormState = {
  message: "",
  success: false,
};

export default function TrialFormModal({
  isOpen,
  onClose,
}: Readonly<TrialFormModalProps>) {
  const t = useTranslations("TrialForm");
  const [state, formAction] = useActionState(submitTrialForm, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      const timer = setTimeout(() => {
        formRef.current?.reset();
        onClose();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [state.success, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60">
      <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 overflow-y-auto p-2 sm:p-2">
        {/* Content wrapper for scroll on small screens */}
        <div className="relative p-6 sm:p-8">
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition"
          >
            <IoClose size={24} />
          </button>

          {/* Heading */}
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {t("heading")}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-center! mb-6 text-sm sm:text-base">
            {t("description")}
          </p>

          {/* Form */}
          <form
            ref={formRef}
            action={formAction}
            className="space-y-5 pb-4 max-w-2xl mx-auto"
          >
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              {t("fullName")}
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              className="w-full px-4 py-2 rounded-md border mb-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {state.errors?.name && (
              <p className="text-sm text-red-500 my-1">
                {state.errors.name[0]}
              </p>
            )}
            <label
              htmlFor="age"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              {t("age")}
            </label>
            <input
              type="number"
              name="age"
              id="age"
              required
              className="w-full px-4 py-2 rounded-md border mb-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {state.errors?.age && (
              <p className="text-sm text-red-500 mt-1">{state.errors.age[0]}</p>
            )}
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              {t("email")}
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="w-full px-4 py-2 rounded-md border mb-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {state.errors?.email && (
              <p className="text-sm text-red-500 mt-1">
                {state.errors.email[0]}
              </p>
            )}
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              {t("phone")}
            </label>
            <input
              type="number"
              name="phone"
              id="phone"
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {state.errors?.phone && (
              <p className="text-sm text-red-500 mt-1">
                {state.errors.phone[0]}
              </p>
            )}

            {/* Experience */}
            <div>
              <p className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t("previousExperience")}
              </p>
              <div className="mt-2 flex flex-col sm:flex-row sm:gap-6 gap-2">
                {["yes", "no"].map((value) => (
                  <label
                    key={value}
                    className="flex items-center text-sm text-gray-700 dark:text-gray-300 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="experience"
                      value={value}
                      required
                      className="h-4 w-auto text-primary border-gray-300 focus:ring-primary"
                    />
                    <span className="ml-2 capitalize">{t(value)}</span>
                  </label>
                ))}
              </div>
              {state.errors?.experience && (
                <p className="text-sm text-red-500 mt-1">
                  {state.errors.experience[0]}
                </p>
              )}
            </div>

            {/* Submit */}
            <div className="pt-2">
              <SubmitButton />
            </div>

            {/* Feedback */}
            {state.message && (
              <p
                className={clsx("text-center text-sm mt-3", {
                  "text-green-600 dark:text-green-400": state.success,
                  "text-red-500 dark:text-red-400": !state.success,
                })}
              >
                {state.message}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
