import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { IoClose } from "react-icons/io5";
import { submitTrialForm, TrialFormState } from "@/app/actions";
import clsx from "clsx";

function SubmitButton() {
  const { pending } = useFormStatus();
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
      {pending ? "Submitting..." : "Request My Free Trial"}
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
}: TrialFormModalProps) {
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
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
      <div className="relative w-full h-full max-h-screen sm:h-auto sm:max-w-md mx-auto sm:rounded-2xl bg-white dark:bg-gray-900 shadow-2xl overflow-y-auto">
        {/* Content wrapper for scroll on small screens */}
        <div className="relative p-6 sm:p-8">
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition"
          >
            <IoClose size={24} />
          </button>

          {/* Heading */}
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Request a Free Trial
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm sm:text-base">
            Let us know who&#39;s joining for a trial class.
          </p>

          {/* Form */}
          <form ref={formRef} action={formAction} className="space-y-5 pb-4">
            {/* Full Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Full Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {state.errors?.name && (
                <p className="text-sm text-red-500 mt-1">
                  {state.errors.name[0]}
                </p>
              )}
            </div>

            {/* Age */}
            <div>
              <label
                htmlFor="age"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Age
              </label>
              <input
                type="number"
                name="age"
                id="age"
                required
                className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {state.errors?.age && (
                <p className="text-sm text-red-500 mt-1">
                  {state.errors.age[0]}
                </p>
              )}
            </div>

            {/* Experience */}
            <div>
              <p className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Previous Karate Experience?
              </p>
              <div className="mt-2 flex flex-col sm:flex-row sm:gap-6 gap-2">
                {["yes", "no"].map((option) => (
                  <label
                    key={option}
                    className="flex items-center text-sm text-gray-700 dark:text-gray-300 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="experience"
                      value={option}
                      required
                      className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                    />
                    <span className="ml-2 capitalize">{option}</span>
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
