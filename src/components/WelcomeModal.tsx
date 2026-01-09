import type { ComponentType } from "react";
import ProgressCircle from "./ProgressCircle";
import ModalWrapper from "./ModalWrapper";
import IconCaret from "../icons/IconCaret";
import IconCheckmark from "../icons/IconCheckmark";

export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: ComponentType;
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
    <ModalWrapper isOpen={isOpen} onClose={onClose} className="overflow-hidden">
      {/* Header with close button and progress */}
      <div className="flex items-center justify-between p-6">
        <div className="flex-1">
          <h2 className="text-xl font-bold text-zabira text-[#1A1A1A]">
            Welcome to Zabira 👋
          </h2>
          <p className="text-base text-zabira-dark/70 mt-1 max-w-[28ch]">
            Complete your account setup in a few easy steps
          </p>
        </div>

        <ProgressCircle
          current={completedSteps}
          total={steps.length}
          size={50}
          strokeWidth={6}
        />
      </div>

      {/* Steps list */}
      <div className="px-6 py-4 space-y-3  overflow-y-auto no-scrollbar pt-3">
        {steps.map((step, index) => (
          <button
            key={step.id}
            onClick={() => onStepClick?.(index)}
            className={`w-full flex items-center gap-4 p-3 border rounded-xl transition-all ${
              step.completed
                ? "bg-[#EBF5FF] border-[#A3D4FF]"
                : "bg-[#FCFCFC] border-[#E1E1E2] hover:border-gray-200"
            }`}
            type="button"
          >
            {/* Icon container */}
            <div className={`shrink-0  flex items-center justify-center`}>
              <step.icon />
            </div>

            {/* Content */}
            <div className="flex-1 text-left">
              <h3
                className={`font-semibold text-zabira text-base text-[#1A1A1A]`}
              >
                {step.title}
              </h3>
              <p
                className={`text-sm mt-0.5 text-zabira-dark/70 -tracking-[0.01em]`}
              >
                Takes about {step.duration}
              </p>
            </div>

            {/* Checkmark for completed */}
            {step.completed ? (
              <div className="shrink-0">
                <IconCheckmark />
              </div>
            ) : (
              <div className="text-base text-[#A1A1AA] shrink-0">
                <IconCaret />
              </div>
            )}
          </button>
        ))}
      </div>
    </ModalWrapper>
  );
};

export default WelcomeModal;
