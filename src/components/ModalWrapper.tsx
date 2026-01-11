import type { ReactNode } from "react";
import IconRemove from "../icons/IconRemove";

interface ModalWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

const ModalWrapper = ({
  isOpen,
  onClose,
  children,
  className = "",
}: ModalWrapperProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-y-auto py-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-overlay backdrop-blur-[10px]"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal content */}
      <div className="relative max-w-md w-full mx-4 my-auto">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="text-overlay-dark text-2xl z-50 w-8 mb-2.5 aspect-square flex items-center justify-center rounded-full bg-neutral-150 transition-colors hover:bg-neutral-300"
          >
            <span className="sr-only">Close modal</span>
            <IconRemove />
          </button>
        </div>
        <div
          className={`bg-bg-card rounded-2xl shadow-2xl ${className}`}
          role="dialog"
          aria-modal="true"
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalWrapper;
