import { ReactNode } from "react";
import ProgressCircle from "./ProgressCircle";

export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  duration: string;
  completed?: boolean;
}

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  steps: OnboardingStep[];
  currentStep: number;
  onStepClick?: (stepIndex: number) => void;
}

const WelcomeModal = ({
  isOpen,
  onClose,
  steps,
  currentStep,
  onStepClick,
}: WelcomeModalProps) => {
  if (!isOpen) return null;

  const completedSteps = steps.filter((step) => step.completed).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30"
        onClick={onClose}
        aria-label="Close modal"
      />

      {/* Modal content */}
      <div
        className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full mx-4 overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Header with close button and progress */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex-1">
            <h2 className="text-xl font-bold text-[#1A1A1A]">
              Welcome to Zabira 👋
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Complete your account setup in a few easy steps
            </p>
          </div>

          <button
            onClick={onClose}
            className="ml-2 text-gray-400 hover:text-gray-600 text-2xl leading-none"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center justify-between px-6 pt-4 pb-2">
          <span className="text-sm font-semibold text-[#1A1A1A]">Progress</span>
          <span className="text-sm text-gray-500">
            {currentStep + 1}/{steps.length}
          </span>
        </div>

        {/* Steps list */}
        <div className="px-6 py-4 space-y-3 max-h-96 overflow-y-auto">
          {steps.map((step, index) => (
            <button
              key={step.id}
              onClick={() => onStepClick?.(index)}
              className={`w-full flex items-start gap-4 p-4 rounded-lg transition-all ${
                index === currentStep
                  ? "bg-blue-50 border-2 border-[#299BFF]"
                  : step.completed
                  ? "bg-green-50 border-2 border-green-200 opacity-75"
                  : "bg-gray-50 border-2 border-gray-100 hover:border-gray-200"
              }`}
              type="button"
            >
              {/* Icon container */}
              <div
                className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center text-lg ${
                  index === currentStep
                    ? "bg-blue-100 text-[#299BFF]"
                    : step.completed
                    ? "bg-green-100 text-green-600"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {step.icon}
              </div>

              {/* Content */}
              <div className="flex-1 text-left">
                <h3
                  className={`font-semibold text-sm ${
                    index === currentStep
                      ? "text-[#299BFF]"
                      : step.completed
                      ? "text-green-600"
                      : "text-[#1A1A1A]"
                  }`}
                >
                  {step.title}
                </h3>
                <p
                  className={`text-xs mt-1 ${
                    step.completed ? "text-gray-500" : "text-gray-600"
                  }`}
                >
                  Takes about {step.duration}
                </p>
              </div>

              {/* Checkmark for completed */}
              {step.completed && (
                <div className="flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Footer with progress circle and action button */}
        <div className="flex items-center justify-between p-6 border-t border-gray-100 bg-gray-50">
          <ProgressCircle
            current={completedSteps}
            total={steps.length}
            size={50}
            strokeWidth={6}
          />

          <button
            onClick={onClose}
            className="ml-4 px-6 py-2.5 bg-[#299BFF] text-white rounded-lg font-medium text-sm hover:bg-blue-600 transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;
